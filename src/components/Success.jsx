import { Link } from 'react-router-dom'
import logo from '../../images/iteration-1-images/logo.svg'
import './Success.css'

export default function Success({ siparis }) {
  return (
    <div className="success">
      <header>
        <Link to="/" aria-label="Anasayfaya dön">
          <img src={logo} alt="Teknolojik Yemekler" className="success-logo" />
        </Link>
      </header>

      {siparis ? (
        <main className="success-message">
          <p className="success-tagline">lezzetin yolda</p>
          <h1>SİPARİŞ ALINDI</h1>
          <hr className="success-divider" />

          <section className="order-summary" aria-labelledby="ozet-baslik">
            <h2 id="ozet-baslik">Position Absolute Acı Pizza</h2>
            <dl className="order-details">
              <div>
                <dt>Sipariş No:</dt>
                <dd>#{siparis.id}</dd>
              </div>
              <div>
                <dt>İsim:</dt>
                <dd>{siparis.isim}</dd>
              </div>
              <div>
                <dt>Boyut:</dt>
                <dd>{siparis.boyut}</dd>
              </div>
              <div>
                <dt>Hamur:</dt>
                <dd>{siparis.hamur}</dd>
              </div>
              <div>
                <dt>Ek Malzemeler:</dt>
                <dd>{siparis.malzemeler.join(', ')}</dd>
              </div>
              <div>
                <dt>Adet:</dt>
                <dd>{siparis.adet}</dd>
              </div>
              {siparis.not && (
                <div>
                  <dt>Not:</dt>
                  <dd>{siparis.not}</dd>
                </div>
              )}
            </dl>

            <section className="success-total" aria-labelledby="onay-toplam">
              <h3 id="onay-toplam">Sipariş Toplamı</h3>
              <dl>
                <div>
                  <dt>Seçimler</dt>
                  <dd>{siparis.secimler.toFixed(2)}₺</dd>
                </div>
                <div>
                  <dt>Toplam</dt>
                  <dd>{siparis.toplam.toFixed(2)}₺</dd>
                </div>
              </dl>
            </section>
          </section>
        </main>
      ) : (
        <main className="success-message">
          <h1>
            TEBRİKLER!
            <br />
            SİPARİŞİNİZ ALINDI!
          </h1>
        </main>
      )}
    </div>
  )
}
