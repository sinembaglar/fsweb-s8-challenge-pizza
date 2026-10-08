import { Link } from 'react-router-dom'
import logo from '../../images/iteration-1-images/logo.svg'
import './Header.css'

export default function Header({ children, transparent = false }) {
  return (
    <header className={`site-header${transparent ? ' site-header--transparent' : ''}`}>
      <Link to="/" aria-label="Teknolojik Yemekler anasayfa">
        <img src={logo} alt="Teknolojik Yemekler" className="site-header__logo" />
      </Link>
      {children}
    </header>
  )
}
