export default function QuantityCounter({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="counter" role="group" aria-label="Pizza adedi">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Adedi azalt"
        data-cy="decrease"
      >
        -
      </button>
      <output aria-live="polite" data-cy="quantity">
        {quantity}
      </output>
      <button type="button" onClick={onIncrease} aria-label="Adedi artır" data-cy="increase">
        +
      </button>
    </div>
  )
}
