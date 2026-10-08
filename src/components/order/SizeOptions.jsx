import FieldError from './FieldError'

export default function SizeOptions({ sizes, selected, onChange, error }) {
  return (
    <fieldset className="form-group" aria-describedby={error ? 'boyut-error' : undefined}>
      <legend className="form-group__title">
        Boyut Seç <span className="required" aria-hidden="true">*</span>
      </legend>
      <div className="size-list">
        {sizes.map((size) => (
          <label key={size.value} className="size-option" htmlFor={`boyut-${size.value}`}>
            <input
              type="radio"
              id={`boyut-${size.value}`}
              name="boyut"
              value={size.value}
              checked={selected === size.value}
              onChange={onChange}
              required
              className="visually-hidden"
              data-cy={`size-${size.value}`}
            />
            <span className="size-option__circle" aria-hidden="true">
              {size.value}
            </span>
            <span className="visually-hidden">{size.label}</span>
          </label>
        ))}
      </div>
      <FieldError id="boyut-error" message={error} />
    </fieldset>
  )
}
