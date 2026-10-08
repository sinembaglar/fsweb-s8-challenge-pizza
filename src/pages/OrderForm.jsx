import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Header from '../components/Header'
import SizeOptions from '../components/order/SizeOptions'
import DoughSelect from '../components/order/DoughSelect'
import ToppingOptions from '../components/order/ToppingOptions'
import QuantityCounter from '../components/order/QuantityCounter'
import OrderSummary from '../components/order/OrderSummary'
import FieldError from '../components/order/FieldError'
import { postOrder, getErrorMessage } from '../api/orderApi'
import {
  PIZZA,
  SIZES,
  DOUGHS,
  TOPPINGS,
  TOPPING_PRICE,
  MIN_TOPPINGS,
  MAX_TOPPINGS,
  MIN_NAME_LENGTH,
} from '../data/pizza'
import './OrderForm.css'

const initialForm = {
  isim: '',
  boyut: '',
  hamur: '',
  malzemeler: [],
  ozel: '',
}

const validators = {
  isim: (value) =>
    value.trim().length >= MIN_NAME_LENGTH ? '' : `İsim en az ${MIN_NAME_LENGTH} karakter olmalıdır.`,
  boyut: (value) => (value ? '' : 'Lütfen pizza boyutunu seçin.'),
  hamur: (value) => (value ? '' : 'Lütfen hamur kalınlığını seçin.'),
  malzemeler: (value) =>
    value.length >= MIN_TOPPINGS && value.length <= MAX_TOPPINGS
      ? ''
      : `En az ${MIN_TOPPINGS}, en fazla ${MAX_TOPPINGS} malzeme seçmelisiniz.`,
}

const getFormErrors = (form) =>
  Object.keys(validators).reduce((acc, field) => {
    acc[field] = validators[field](form[field])
    return acc
  }, {})

export default function OrderForm({ onOrderSuccess }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const history = useHistory()

  const isValid = Object.values(getFormErrors(form)).every((message) => message === '')
  const extrasPrice = form.malzemeler.length * TOPPING_PRICE
  const extrasTotal = extrasPrice * quantity
  const total = (PIZZA.price + extrasPrice) * quantity

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    let nextValue = value
    if (type === 'checkbox') {
      nextValue = checked
        ? [...form.malzemeler, value]
        : form.malzemeler.filter((item) => item !== value)
    }

    setForm({ ...form, [name]: nextValue })
    if (validators[name]) {
      setErrors({ ...errors, [name]: validators[name](nextValue) })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isValid || isSubmitting) {
      setErrors(getFormErrors(form))
      return
    }

    const order = {
      ...form,
      isim: form.isim.trim(),
      ozel: form.ozel.trim(),
      adet: quantity,
      urun: PIZZA.name,
      secimler: extrasTotal,
      toplam: total,
    }

    setIsSubmitting(true)
    setSubmitError('')
    postOrder(order)
      .then((response) => {
        console.log('Sipariş özeti:', response.data)
        onOrderSuccess(response.data)
        history.push('/onay')
      })
      .catch((error) => {
        console.error('Sipariş gönderilemedi:', error)
        setSubmitError(getErrorMessage(error))
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <>
      <Header>
        <nav aria-label="Sayfa konumu" className="breadcrumb">
          <ol>
            <li>
              <Link to="/">Anasayfa</Link>
            </li>
            <li>Seçenekler</li>
            <li aria-current="page">Sipariş Oluştur</li>
          </ol>
        </nav>
      </Header>

      <main className="order">
        <section className="product" aria-labelledby="product-name">
          <h1 id="product-name">{PIZZA.name}</h1>
          <div className="product__meta">
            <p className="product__price">{PIZZA.price.toFixed(2)}₺</p>
            <p className="product__rating" aria-label={`Puan ${PIZZA.rating}`}>
              {PIZZA.rating}
            </p>
            <p className="product__reviews" aria-label={`${PIZZA.reviewCount} değerlendirme`}>
              ({PIZZA.reviewCount})
            </p>
          </div>
          <p className="product__description">{PIZZA.description}</p>
        </section>

        <form className="order-form" onSubmit={handleSubmit} noValidate data-cy="order-form">
          <div className="order-form__row">
            <SizeOptions sizes={SIZES} selected={form.boyut} onChange={handleChange} error={errors.boyut} />
            <DoughSelect doughs={DOUGHS} selected={form.hamur} onChange={handleChange} error={errors.hamur} />
          </div>

          <ToppingOptions
            toppings={TOPPINGS}
            selected={form.malzemeler}
            onChange={handleChange}
            error={errors.malzemeler}
            min={MIN_TOPPINGS}
            max={MAX_TOPPINGS}
            price={TOPPING_PRICE}
          />

          <div className="form-group">
            <label htmlFor="isim" className="form-group__title">
              İsim <span className="required" aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="isim"
              name="isim"
              className="text-field"
              placeholder="Adınızı ve soyadınızı girin"
              value={form.isim}
              onChange={handleChange}
              minLength={MIN_NAME_LENGTH}
              required
              autoComplete="name"
              aria-invalid={Boolean(errors.isim)}
              aria-describedby={errors.isim ? 'isim-error' : undefined}
              data-cy="name-input"
            />
            <FieldError id="isim-error" message={errors.isim} />
          </div>

          <div className="form-group">
            <label htmlFor="ozel" className="form-group__title">
              Sipariş Notu
            </label>
            <textarea
              id="ozel"
              name="ozel"
              className="text-field"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              rows={2}
              value={form.ozel}
              onChange={handleChange}
              data-cy="note-input"
            />
          </div>

          <hr />

          <div className="order-form__footer">
            <QuantityCounter
              quantity={quantity}
              onIncrease={() => setQuantity(quantity + 1)}
              onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
            />
            <div className="order-form__submit">
              <OrderSummary
                extrasTotal={extrasTotal}
                total={total}
                isDisabled={!isValid || isSubmitting}
                isSubmitting={isSubmitting}
              />
              {submitError && (
                <p className="submit-error" role="alert" data-cy="submit-error">
                  {submitError}
                </p>
              )}
            </div>
          </div>
        </form>
      </main>
    </>
  )
}
