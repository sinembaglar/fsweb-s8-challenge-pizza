Cypress.Commands.add('selectToppings', (count) => {
  cy.get('[data-cy="topping"]').then(($toppings) => {
    for (let i = 0; i < count; i++) {
      cy.wrap($toppings[i]).check()
    }
  })
})

Cypress.Commands.add('fillValidForm', ({ name = 'Sinem Bağlar', toppingCount = 4 } = {}) => {
  cy.get('label[for="boyut-M"]').click()
  cy.get('[data-cy="size-M"]').should('be.checked')
  cy.get('[data-cy="dough-select"]').select('İnce')
  cy.selectToppings(toppingCount)
  cy.get('[data-cy="name-input"]').type(name)
})
