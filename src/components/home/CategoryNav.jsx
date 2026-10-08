export default function CategoryNav({ categories, onSelect }) {
  return (
    <nav className="category-nav" aria-label="Yemek kategorileri">
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <button type="button" onClick={() => onSelect(category.id)} data-cy="category-nav-item">
              <img src={category.icon} alt="" />
              <span>{category.navLabel}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
