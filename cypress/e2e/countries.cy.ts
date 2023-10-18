it('front page can be opened', function () {
    cy.visit(Cypress.env('BASE_URL'))
    cy.contains(
      'Настоящий ли я сайт? Быть может это подделка, чтобы запутать вас? Нет, я настоящий.'
    )
  })
})
