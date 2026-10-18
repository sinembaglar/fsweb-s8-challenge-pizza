import { sicacikMenuler } from '../data/menu'
import footerLogo from '../../images/iteration-2-images/footer/logo-footer.svg'
import konumIkon from '../../images/iteration-2-images/footer/icons/icon-1.png'
import mailIkon from '../../images/iteration-2-images/footer/icons/icon-2.png'
import telefonIkon from '../../images/iteration-2-images/footer/icons/icon-3.png'
import insta0 from '../../images/iteration-2-images/footer/insta/li-0.png'
import insta1 from '../../images/iteration-2-images/footer/insta/li-1.png'
import insta2 from '../../images/iteration-2-images/footer/insta/li-2.png'
import insta3 from '../../images/iteration-2-images/footer/insta/li-3.png'
import insta4 from '../../images/iteration-2-images/footer/insta/li-4.png'
import insta5 from '../../images/iteration-2-images/footer/insta/li-5.png'
import './Footer.css'

const instagramResimleri = [insta0, insta1, insta2, insta3, insta4, insta5]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <address className="footer-contact">
          <img src={footerLogo} alt="Teknolojik Yemekler" className="footer-logo" />
          <p>
            <img src={konumIkon} alt="" />
            <span>
              341 Londonderry Road,
              <br />
              İstanbul Türkiye
            </span>
          </p>
          <p>
            <img src={mailIkon} alt="" />
            <a href="mailto:aciktim@teknolojikyemekler.com">
              aciktim@teknolojikyemekler.com
            </a>
          </p>
          <p>
            <img src={telefonIkon} alt="" />
            <a href="tel:+902161234567">+90 216 123 45 67</a>
          </p>
        </address>

        <nav className="footer-menu" aria-labelledby="footer-menu-baslik">
          <h2 id="footer-menu-baslik">Sıccacık Menuler</h2>
          <ul>
            {sicacikMenuler.map((menu) => (
              <li key={menu}>{menu}</li>
            ))}
          </ul>
        </nav>

        <section className="footer-instagram" aria-labelledby="instagram-baslik">
          <h2 id="instagram-baslik">Instagram</h2>
          <ul>
            {instagramResimleri.map((resim, index) => (
              <li key={resim}>
                <img src={resim} alt={`Instagram gönderisi ${index + 1}`} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="footer-bottom">
        <p>© 2023 Teknolojik Yemekler.</p>
      </div>
    </footer>
  )
}
