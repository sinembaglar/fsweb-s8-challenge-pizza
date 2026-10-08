import Header from '../components/Header'
import './Success.css'

export default function Success() {
  return (
    <div className="success">
      <Header transparent />
      <main className="success__content">
        <h1 className="success__title" data-cy="success-title">
          TEBRİKLER!
          <br />
          SİPARİŞİNİZ ALINDI!
        </h1>
      </main>
    </div>
  )
}
