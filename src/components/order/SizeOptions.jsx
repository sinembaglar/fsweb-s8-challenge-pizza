import FieldError from './FieldError'

export default function SizeOptions({ sizes, selected, onChange, error }) {
  return (
    <fieldset className="form-group" aria-describedby={error ? 'boyut-error' : undefined}>
      <legend className="form-group__title">
        Boyut Seç <span className="required" aria-hidden="true">*</span>
      </legend>
      <div className="radio-list">
        {sizes.map((size) => (
          <label key={size.value} className="choice" htmlFor={`boyut-${size.value}`}>
            <input
              type="radio"
              id={`boyut-${size.value}`}
              name="boyut"
              value={size.value}
              checked={selected === size.value}
              onChange={onChange}
              required
              data-cy={`size-${size.value}`}
            />
            <span>{size.label}</span>
          </label>
        ))}
      </div>
      <FieldError id="boyut-error" message={error} />
    </fieldset>
  )
}
