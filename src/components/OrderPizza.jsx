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
      </main>
    </>
  )
}
