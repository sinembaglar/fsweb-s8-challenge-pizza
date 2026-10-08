describe('Erişilebilirlik (WCAG 2.1 AA)', () => {
  it('anasayfada ihlal yoktur', () => {
    cy.visit('/')
    cy.checkA11y()
  })

  it('sipariş formunda ihlal yoktur', () => {
    cy.visit('/siparis')
    cy.checkA11y()
  })

  it('hata mesajları gösterilirken formda ihlal yoktur', () => {
    cy.visit('/siparis')
    cy.get('[data-cy="name-input"]').type('Si')
    cy.selectToppings(2)
    cy.get('[data-cy="field-error"]').should('have.length', 2)
    cy.checkA11y()
  })

  it('sipariş özeti gösterilirken onay sayfasında ihlal yoktur', () => {
    cy.intercept('POST', 'https://reqres.in/api/pizza', (req) => {
      req.reply({ statusCode: 201, body: { ...req.body, id: '123', createdAt: '2026-10-08T10:00:00.000Z' } })
    })
    cy.visit('/siparis')
    cy.fillValidForm()
    cy.get('[data-cy="submit"]').click()
    cy.get('[data-cy="order-details"]').should('be.visible')
    cy.checkA11y()
  })

  it('özel tasarlanan form elemanları klavyeyle odaklanabilir ve etiketlidir', () => {
    cy.visit('/siparis')
    cy.get('input[type="radio"], input[type="checkbox"], select, textarea, input[type="text"]').each(($input) => {
      cy.wrap($input).focus().should('have.focus')
      cy.get(`label[for="${$input.attr('id')}"]`).should('exist')
    })
  })
})
