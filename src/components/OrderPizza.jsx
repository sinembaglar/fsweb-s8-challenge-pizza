import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import logo from '../../images/iteration-1-images/logo.svg'

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
      <header>
        <img src={logo} alt="Teknolojik Yemekler" />
        <nav>
          <Link to="/">Anasayfa</Link>
          <span> - </span>
          <strong>Sipariş Oluştur</strong>
        </nav>
      </header>

      <main>
        <section>
          <h2>Position Absolute Acı Pizza</h2>
          <div>
            <p>{PIZZA_FIYATI.toFixed(2)}₺</p>
            <p>4.9</p>
            <p>(200)</p>
          </div>
          <p>
            Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
            yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan
            kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
          </p>
        </section>

        <form onSubmit={handleSubmit}>
          <div>
            <fieldset>
              <legend>
                Boyut Seç <span aria-hidden="true">*</span>
              </legend>
              <div>
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
              <div>
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
              <div>
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

            <div>
              <label htmlFor="hamur">
                Hamur Seç <span aria-hidden="true">*</span>
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

          <fieldset aria-describedby="malzeme-aciklama">
            <legend>Ek Malzemeler</legend>
            <p id="malzeme-aciklama">
              En az 4, en fazla 10 malzeme seçebilirsiniz. 5₺
            </p>
            <div>
              {malzemeler.map((malzeme) => (
                <div key={malzeme.id}>
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
              <p role="alert">{errorMessages.malzemeler}</p>
            )}
          </fieldset>

          <div>
            <label htmlFor="isim">
              İsim <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="isim"
              name="isim"
              placeholder="Adınızı girin (en az 3 karakter)"
              value={form.isim}
              onChange={handleChange}
              aria-invalid={errors.isim}
              aria-describedby={errors.isim ? 'isim-hata' : undefined}
            />
            {errors.isim && (
              <p id="isim-hata" role="alert">
                {errorMessages.isim}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="not">Sipariş Notu</label>
            <textarea
              id="not"
              name="not"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              value={form.not}
              onChange={handleChange}
            />
          </div>

          <hr />

          <div>
            <div>
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

            <div>
              <section aria-labelledby="toplam-baslik">
                <h3 id="toplam-baslik">Sipariş Toplamı</h3>
                <dl>
                  <div>
                    <dt>Seçimler</dt>
                    <dd>{secimlerFiyati.toFixed(2)}₺</dd>
                  </div>
                  <div>
                    <dt>Toplam</dt>
                    <dd>{toplamFiyat.toFixed(2)}₺</dd>
                  </div>
                </dl>
              </section>
              <button type="submit" disabled={!isFormValid || isSubmitting}>
                SİPARİŞ VER
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}
