import { forwardRef } from 'react'
import ProductCard from './ProductCard'

const MenuSection = forwardRef(function MenuSection({ categories, products, activeCategory, onSelect }, ref) {
  const visibleProducts = activeCategory
    ? products.filter((product) => product.category === activeCategory)
    : products

  return (
    <section className="menu" aria-labelledby="menu-title" ref={ref}>
      <p className="menu__tagline">en çok paketlenen menüler</p>
      <h2 id="menu-title" className="menu__title">
        Acıktıran Kodlara Doyuran Lezzetler
      </h2>

      <ul className="menu__filters" aria-label="Kategoriye göre filtrele">
        {categories.map((category) => {
          const isActive = category.id === activeCategory
          return (
            <li key={category.id}>
              <button
                type="button"
                className={`filter-pill${isActive ? ' filter-pill--active' : ''}`}
                aria-pressed={isActive}
                onClick={() => onSelect(isActive ? null : category.id)}
                data-cy="filter-pill"
              >
                <img src={category.icon} alt="" />
                {category.label}
              </button>
            </li>
          )
        })}
      </ul>

      {visibleProducts.length > 0 ? (
        <ul className="menu__products" aria-live="polite">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <p className="menu__empty" aria-live="polite" data-cy="menu-empty">
          Bu kategoride çok yakında yeni lezzetler olacak!
        </p>
      )}
    </section>
  )
})

export default MenuSection
