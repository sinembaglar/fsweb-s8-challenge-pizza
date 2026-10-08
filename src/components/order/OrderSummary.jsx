const formatPrice = (value) => `${value.toFixed(2)}₺`

export default function OrderSummary({ extrasTotal, total, isDisabled, isSubmitting }) {
  return (
    <aside className="summary" aria-labelledby="summary-title">
      <div className="summary__body">
        <h2 id="summary-title">Sipariş Toplamı</h2>
        <dl>
          <div className="summary__row">
            <dt>Seçimler</dt>
            <dd data-cy="extras-total">{formatPrice(extrasTotal)}</dd>
          </div>
          <div className="summary__row summary__row--total">
            <dt>Toplam</dt>
            <dd data-cy="total">{formatPrice(total)}</dd>
          </div>
        </dl>
      </div>
      <button type="submit" className="summary__submit" disabled={isDisabled} data-cy="submit">
        {isSubmitting ? 'GÖNDERİLİYOR...' : 'SİPARİŞ VER'}
      </button>
    </aside>
  )
}
