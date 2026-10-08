import { Link } from 'react-router-dom'
import Header from '../components/Header'
import './Success.css'

const formatPrice = (value) => `${Number(value).toFixed(2)}₺`

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleString('tr-TR', { dateStyle: 'long', timeStyle: 'short' })

export default function Success({ order }) {
  return (
    <div className="success">
      <Header transparent />
      <main className="success__content">
        {order ? (
          <>
            <p className="success__tagline">lezzetin yolda</p>
            <h1 className="success__title" data-cy="success-title">
              SİPARİŞ ALINDI
            </h1>
            <hr className="success__divider" />

            <section className="success__details" aria-labelledby="order-product" data-cy="order-details">
              <h2 id="order-product">{order.urun}</h2>
              <p className="success__meta" data-cy="order-meta">
                Sipariş No: <strong>#{order.id}</strong>
                <span aria-hidden="true"> · </span>
                <time dateTime={order.createdAt}>{formatDate(order.createdAt)}</time>
              </p>
              <dl className="success__list">
                <div>
                  <dt>İsim:</dt>
                  <dd data-cy="order-name">{order.isim}</dd>
                </div>
                <div>
                  <dt>Boyut:</dt>
                  <dd data-cy="order-size">{order.boyut}</dd>
                </div>
                <div>
                  <dt>Hamur:</dt>
                  <dd data-cy="order-dough">{order.hamur}</dd>
                </div>
                <div>
                  <dt>Ek Malzemeler:</dt>
                  <dd data-cy="order-toppings">{order.malzemeler.join(', ')}</dd>
                </div>
                <div>
                  <dt>Adet:</dt>
                  <dd>{order.adet}</dd>
                </div>
                {order.ozel && (
                  <div>
                    <dt>Not:</dt>
                    <dd>{order.ozel}</dd>
                  </div>
                )}
              </dl>
            </section>

            <aside className="success__summary" aria-labelledby="success-summary-title">
              <h2 id="success-summary-title">Sipariş Toplamı</h2>
              <dl>
                <div>
                  <dt>Seçimler</dt>
                  <dd data-cy="order-extras">{formatPrice(order.secimler)}</dd>
                </div>
                <div>
                  <dt>Toplam</dt>
                  <dd data-cy="order-total">{formatPrice(order.toplam)}</dd>
                </div>
              </dl>
            </aside>
          </>
        ) : (
          <div className="success__empty" data-cy="no-order">
            <h1 className="success__title">HENÜZ SİPARİŞ YOK</h1>
            <p>Görüntülenecek bir sipariş bulunamadı.</p>
            <Link to="/siparis" className="success__link">
              SİPARİŞ VER
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
