/// <reference types="cypress" />
import {
  loginWithEmailAndPassword,
  logout
} from '../../src/app/services/auth/firebase'

declare global {
  namespace Cypress {
    interface Chainable {
      logout(): Chainable<void>
      login(email: string, password: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('logout', () => {
  logout()
})

Cypress.Commands.add('login', (email: string, password: string) => {
  loginWithEmailAndPassword(email, password)
})
