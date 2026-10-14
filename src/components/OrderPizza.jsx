import { Link } from 'react-router-dom'
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

export default function OrderPizza() {
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
            <p>85.50₺</p>
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

        <form>
          <div>
            <fieldset>
              <legend>
                Boyut Seç <span aria-hidden="true">*</span>
              </legend>
              <div>
                <input type="radio" id="boyut-kucuk" name="boyut" value="Küçük" />
                <label htmlFor="boyut-kucuk">Küçük</label>
              </div>
              <div>
                <input type="radio" id="boyut-orta" name="boyut" value="Orta" />
                <label htmlFor="boyut-orta">Orta</label>
              </div>
              <div>
                <input type="radio" id="boyut-buyuk" name="boyut" value="Büyük" />
                <label htmlFor="boyut-buyuk">Büyük</label>
              </div>
            </fieldset>

            <div>
              <label htmlFor="hamur">
                Hamur Seç <span aria-hidden="true">*</span>
              </label>
              <select id="hamur" name="hamur" defaultValue="">
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
                  />
                  <label htmlFor={malzeme.id}>{malzeme.ad}</label>
                </div>
              ))}
            </div>
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
            />
          </div>

          <div>
            <label htmlFor="not">Sipariş Notu</label>
            <textarea
              id="not"
              name="not"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
            />
          </div>

          <hr />

          <div>
            <div>
              <button type="button" aria-label="Adedi azalt">
                -
              </button>
              <span aria-live="polite">1</span>
              <button type="button" aria-label="Adedi artır">
                +
              </button>
            </div>

            <div>
              <section aria-labelledby="toplam-baslik">
                <h3 id="toplam-baslik">Sipariş Toplamı</h3>
                <dl>
                  <div>
                    <dt>Seçimler</dt>
                    <dd>0.00₺</dd>
                  </div>
                  <div>
                    <dt>Toplam</dt>
                    <dd>85.50₺</dd>
                  </div>
                </dl>
              </section>
              <button type="submit">SİPARİŞ VER</button>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}
