/* const { logout } = require('../../src/app/services/auth/firebase') */
/* const countriesList = require('../support/countriesList') */

describe('Countries app for unauthorized users', function () {
  it('front page can be opened', function () {
    cy.visit(Cypress.env('BASE_URL'))
    cy.contains(
      'Настоящий ли я сайт? Быть может это подделка, чтобы запутать вас? Нет, я настоящий.'
    )
  })
})
