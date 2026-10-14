import { Link } from 'react-router-dom'
import logo from '../../images/iteration-1-images/logo.svg'

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
        </form>
      </main>
    </>
  )
}
