import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import logo from '../../images/iteration-1-images/logo.svg'
import './OrderPizza.css'

const malzemeler = [
  { id: 'pepperoni', ad: 'Pepperoni' },
  { id: 'domates', ad: 'Domates' },
  { id: 'biber', ad: 'Biber' },
  { id: 'sosis', ad: 'Sosis' },
  { id: 'misir', ad: 'Mısır' },
  { id: 'sucuk', ad: 'Sucuk' },
  { id: 'kanada-jambonu', ad: 'Kanada Jambonu' },
  { id: 'zeytin', ad: 'Zeytin' },
  { id: 'ananas', ad: 'Ananas' },
  { id: 'tavuk-izgara', ad: 'Tavuk Izgara' },
  { id: 'jalepeno', ad: 'Jalepeno' },
  { id: 'kabak', ad: 'Kabak' },
  { id: 'sogan', ad: 'Soğan' },
  { id: 'sarimsak', ad: 'Sarımsak' },
]

const PIZZA_FIYATI = 85.5
const MALZEME_FIYATI = 5

const initialForm = {
  isim: '',
  boyut: '',
  hamur: '',
  malzemeler: [],
  not: '',
}

const initialErrors = {
  isim: false,
  malzemeler: false,
}

const errorMessages = {
  isim: 'İsim en az 3 karakter olmalı.',
  malzemeler: 'En az 4, en fazla 10 malzeme seçmelisiniz.',
}

function isFieldValid(name, value) {
  switch (name) {
    case 'isim':
      return value.trim().length >= 3
    case 'boyut':
    case 'hamur':
      return value !== ''
    case 'malzemeler':
      return value.length >= 4 && value.length <= 10
    default:
      return true
  }
}

export default function OrderPizza() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [adet, setAdet] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const history = useHistory()

  const secimlerFiyati = form.malzemeler.length * MALZEME_FIYATI * adet
  const toplamFiyat = PIZZA_FIYATI * adet + secimlerFiyati

  const isFormValid = ['isim', 'boyut', 'hamur', 'malzemeler'].every((name) =>
    isFieldValid(name, form[name]),
  )

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    let newValue = value
    if (type === 'checkbox') {
      newValue = checked
        ? [...form.malzemeler, value]
        : form.malzemeler.filter((malzeme) => malzeme !== value)
    }

    setForm((prev) => ({ ...prev, [name]: newValue }))
    if (name in errorMessages) {
      setErrors((prev) => ({ ...prev, [name]: !isFieldValid(name, newValue) }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!isFormValid || isSubmitting) return

    const siparis = { ...form, adet, toplam: toplamFiyat }
    setIsSubmitting(true)

    axios
      .post('https://reqres.in/api/pizza', siparis, {
        headers: { 'x-api-key': import.meta.env.VITE_REQRES_API_KEY },
      })
      .then((response) => {
        console.log('Sipariş özeti:', response.data)
        history.push('/onay')
      })
      .catch((error) => {
        console.error('Sipariş gönderilemedi:', error)
        setIsSubmitting(false)
      })
  }

  return (
    <>
      <header className="order-header">
        <img src={logo} alt="Teknolojik Yemekler" />
        <nav className="breadcrumb" aria-label="Sayfa yolu">
          <Link to="/">Anasayfa</Link>
          <span aria-hidden="true"> - </span>
          <span>Seçenekler</span>
          <span aria-hidden="true"> - </span>
          <strong aria-current="page">Sipariş Oluştur</strong>
        </nav>
      </header>

      <main className="order-page">
        <section className="pizza-info">
          <h2>Position Absolute Acı Pizza</h2>
          <div className="pizza-meta">
            <p className="pizza-price">{PIZZA_FIYATI.toFixed(2)}₺</p>
            <p>4.9</p>
            <p>(200)</p>
          </div>
          <p className="pizza-description">
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
            yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan
            kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
          </p>
        </section>

        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <fieldset className="form-group">
              <legend className="form-title">
                Boyut Seç <span className="required" aria-hidden="true">*</span>
              </legend>
              <div className="option">
                <input
                  type="radio"
                  id="boyut-kucuk"
                  name="boyut"
                  value="Küçük"
                  checked={form.boyut === 'Küçük'}
                  onChange={handleChange}
                />
                <label htmlFor="boyut-kucuk">Küçük</label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  id="boyut-orta"
                  name="boyut"
                  value="Orta"
                  checked={form.boyut === 'Orta'}
                  onChange={handleChange}
                />
                <label htmlFor="boyut-orta">Orta</label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  id="boyut-buyuk"
                  name="boyut"
                  value="Büyük"
                  checked={form.boyut === 'Büyük'}
                  onChange={handleChange}
                />
                <label htmlFor="boyut-buyuk">Büyük</label>
              </div>
            </fieldset>

            <div className="form-group">
              <label htmlFor="hamur" className="form-title">
                Hamur Seç <span className="required" aria-hidden="true">*</span>
              </label>
              <select
                id="hamur"
                name="hamur"
                value={form.hamur}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Hamur Kalınlığı
                </option>
                <option value="İnce">İnce</option>
                <option value="Orta">Orta</option>
                <option value="Kalın">Kalın</option>
              </select>
            </div>
          </div>

          <fieldset className="form-group" aria-describedby="malzeme-aciklama">
            <legend className="form-title">Ek Malzemeler</legend>
            <p id="malzeme-aciklama" className="form-hint">
              En az 4, en fazla 10 malzeme seçebilirsiniz. 5₺
            </p>
            <div className="toppings">
              {malzemeler.map((malzeme) => (
                <div key={malzeme.id} className="option">
                  <input
                    type="checkbox"
                    id={malzeme.id}
                    name="malzemeler"
                    value={malzeme.ad}
                    checked={form.malzemeler.includes(malzeme.ad)}
                    onChange={handleChange}
                  />
                  <label htmlFor={malzeme.id}>{malzeme.ad}</label>
                </div>
              ))}
            </div>
            {errors.malzemeler && (
              <p className="error" role="alert">
                {errorMessages.malzemeler}
              </p>
            )}
          </fieldset>

          <div className="form-group">
            <label htmlFor="isim" className="form-title">
              İsim <span className="required" aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="isim"
              name="isim"
              className="text-field"
              placeholder="Adınızı girin (en az 3 karakter)"
              value={form.isim}
              onChange={handleChange}
              aria-invalid={errors.isim}
              aria-describedby={errors.isim ? 'isim-hata' : undefined}
            />
            {errors.isim && (
              <p id="isim-hata" className="error" role="alert">
                {errorMessages.isim}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="not" className="form-title">
              Sipariş Notu
            </label>
            <textarea
              id="not"
              name="not"
              className="text-field"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              value={form.not}
              onChange={handleChange}
            />
          </div>

          <hr className="divider" />

          <div className="order-footer">
            <div className="quantity">
              <button
                type="button"
                aria-label="Adedi azalt"
                onClick={() => setAdet((prev) => prev - 1)}
                disabled={adet === 1}
              >
                -
              </button>
              <span aria-live="polite">{adet}</span>
              <button
                type="button"
                aria-label="Adedi artır"
                onClick={() => setAdet((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <div className="summary">
              <section className="summary-card" aria-labelledby="toplam-baslik">
                <h3 id="toplam-baslik">Sipariş Toplamı</h3>
                <dl>
                  <div className="summary-row">
                    <dt>Seçimler</dt>
                    <dd>{secimlerFiyati.toFixed(2)}₺</dd>
                  </div>
                  <div className="summary-row summary-total">
                    <dt>Toplam</dt>
                    <dd>{toplamFiyat.toFixed(2)}₺</dd>
                  </div>
                </dl>
              </section>
              <button
                type="submit"
                className="submit-button"
                disabled={!isFormValid || isSubmitting}
              >
                SİPARİŞ VER
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}

