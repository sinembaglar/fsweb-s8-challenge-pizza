import FieldError from './FieldError'

export default function ToppingOptions({ toppings, selected, onChange, error, min, max, price }) {
  const limitReached = selected.length >= max

  return (
    <fieldset className="form-group" aria-describedby="malzemeler-hint malzemeler-error">
      <legend className="form-group__title">Ek Malzemeler</legend>
      <p id="malzemeler-hint" className="form-group__hint">
        En az {min}, en fazla {max} malzeme seçebilirsiniz. {price}₺
      </p>
      <div className="checkbox-grid">
        {toppings.map((topping) => {
          const id = `malzeme-${topping.toLowerCase().replace(/\s+/g, '-')}`
          const isChecked = selected.includes(topping)
          return (
            <label key={topping} className="topping-option" htmlFor={id}>
              <input
                type="checkbox"
                id={id}
                name="malzemeler"
                value={topping}
                checked={isChecked}
                disabled={!isChecked && limitReached}
                onChange={onChange}
                data-cy="topping"
              />
              <span>{topping}</span>
            </label>
          )
        })}
      </div>
      <FieldError id="malzemeler-error" message={error} />
    </fieldset>
  )
}
