import { Link } from 'react-router-dom'
import logoFooter from '../../images/iteration-2-images/footer/logo-footer.svg'
import locationIcon from '../../images/iteration-2-images/footer/icons/icon-1.png'
import mailIcon from '../../images/iteration-2-images/footer/icons/icon-2.png'
import phoneIcon from '../../images/iteration-2-images/footer/icons/icon-3.png'
import insta0 from '../../images/iteration-2-images/footer/insta/li-0.png'
import insta1 from '../../images/iteration-2-images/footer/insta/li-1.png'
import insta2 from '../../images/iteration-2-images/footer/insta/li-2.png'
import insta3 from '../../images/iteration-2-images/footer/insta/li-3.png'
import insta4 from '../../images/iteration-2-images/footer/insta/li-4.png'
import insta5 from '../../images/iteration-2-images/footer/insta/li-5.png'
import './Footer.css'

const MENU_ITEMS = [
  'Terminal Pizza',
  '5 Kişilik Hackathlon Pizza',
  'useEffect Tavuklu Pizza',
  'Beyaz Console Frosty',
  'Testler Geçti Mutlu Burger',
  'Position Absolute Acı Burger',
]

const INSTAGRAM_IMAGES = [insta0, insta1, insta2, insta3, insta4, insta5]

export default function Footer({ menuTitle = 'Sıccacık Menuler' }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <section className="site-footer__contact" aria-label="İletişim">
          <img src={logoFooter} alt="Teknolojik Yemekler" className="site-footer__logo" />
          <address>
            <p>
              <img src={locationIcon} alt="" />
              <span>
                341 Londonderry Road,
                <br />
                Istanbul Türkiye
              </span>
            </p>
            <p>
              <img src={mailIcon} alt="" />
              <a href="mailto:aciktim@teknolojikyemekler.com">aciktim@teknolojikyemekler.com</a>
            </p>
            <p>
              <img src={phoneIcon} alt="" />
              <a href="tel:+902161234567">+90 216 123 45 67</a>
            </p>
          </address>
        </section>

        <nav className="site-footer__menu" aria-labelledby="footer-menu-title">
          <h2 id="footer-menu-title">{menuTitle}</h2>
          <ul>
            {MENU_ITEMS.map((item) => (
              <li key={item}>
                <Link to="/siparis">{item}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="site-footer__insta" aria-labelledby="footer-insta-title">
          <h2 id="footer-insta-title">Instagram</h2>
          <ul>
            {INSTAGRAM_IMAGES.map((image, index) => (
              <li key={image}>
                <img src={image} alt={`Instagram gönderisi ${index + 1}`} loading="lazy" />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="site-footer__bottom">
        <p>© 2023 Teknolojik Yemekler.</p>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter hesabımız">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
            <path d="M23.6 4.6c-.9.4-1.8.6-2.8.8 1-.6 1.8-1.5 2.1-2.7-.9.6-2 1-3.1 1.2a4.9 4.9 0 0 0-8.4 4.5A13.9 13.9 0 0 1 1.3 3.2a4.9 4.9 0 0 0 1.5 6.6c-.8 0-1.6-.3-2.2-.6v.1c0 2.4 1.7 4.4 3.9 4.8-.7.2-1.5.2-2.2.1a4.9 4.9 0 0 0 4.6 3.4A9.9 9.9 0 0 1 0 19.6 13.9 13.9 0 0 0 7.5 21.8c9 0 14-7.5 14-14v-.6c1-.7 1.8-1.6 2.1-2.6z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
