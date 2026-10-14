import { Link } from 'react-router-dom'

export default function Success() {
  return (
    <main>
      <h1>Tebrikler! Siparişiniz Alındı!</h1>
      <Link to="/">Anasayfa</Link>
    </main>
  )
}
