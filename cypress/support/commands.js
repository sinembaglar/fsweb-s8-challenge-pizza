Cypress.Commands.add('selectToppings', (count) => {
  cy.get('[data-cy="topping"]').then(($toppings) => {
    for (let i = 0; i < count; i++) {
      cy.wrap($toppings[i]).check()
    }
  })
})

Cypress.Commands.add('checkA11y', () => {
  cy.readFile('node_modules/axe-core/axe.min.js').then((axeSource) => {
    cy.window().then((win) => {
      win.eval(axeSource)
      return win.axe.run(win.document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] })
    })
  }).then(({ violations }) => {
    violations.forEach((violation) => {
      const targets = violation.nodes.map((node) => node.target.join(' ')).join(', ')
      Cypress.log({ name: 'a11y', message: `${violation.id}: ${violation.help} -> ${targets}` })
    })
    expect(violations.map((violation) => violation.id), 'erişilebilirlik ihlalleri').to.be.empty
  })
})

Cypress.Commands.add('fillValidForm', ({ name = 'Sinem Bağlar', toppingCount = 4 } = {}) => {
  cy.get('label[for="boyut-M"]').click()
  cy.get('[data-cy="size-M"]').should('be.checked')
  cy.get('[data-cy="dough-select"]').select('İnce')
  cy.selectToppings(toppingCount)
  cy.get('[data-cy="name-input"]').type(name)
})
