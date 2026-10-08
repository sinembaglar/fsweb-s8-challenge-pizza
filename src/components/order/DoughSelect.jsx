import FieldError from './FieldError'

export default function DoughSelect({ doughs, selected, onChange, error }) {
  return (
    <div className="form-group">
      <label htmlFor="hamur" className="form-group__title">
        Hamur Seç <span className="required" aria-hidden="true">*</span>
      </label>
      <select
        id="hamur"
        name="hamur"
        value={selected}
        onChange={onChange}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'hamur-error' : undefined}
        data-cy="dough-select"
      >
        <option value="" disabled>
          Hamur Kalınlığı
        </option>
        {doughs.map((dough) => (
          <option key={dough} value={dough}>
            {dough}
          </option>
        ))}
      </select>
      <FieldError id="hamur-error" message={error} />
    </div>
  )
}
