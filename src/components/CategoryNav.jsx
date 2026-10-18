import { kategoriler } from '../data/menu'

export default function CategoryNav() {
  return (
    <nav className="category-nav" aria-label="Kategoriler">
      <ul>
        {kategoriler.map((kategori) => (
          <li key={kategori.id}>
            <img src={kategori.ikon} alt="" />
            <span>{kategori.ad}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}
