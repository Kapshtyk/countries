/// <reference types="cypress" />
import countriesList from '../fixtures/countries.json'

const credentials = {
  email: Cypress.env('CYPRESS_APP_TEST_EMAIL'),
  name: Cypress.env('CYPRESS_APP_TEST_NAME'),
  password: Cypress.env('CYPRESS_APP_TEST_PASSWORD')
}

const privatePages = [
  {
    url: '/countries',
    name: 'Countries'
  },
  {
    url: '/countries/finland',
    name: 'Specific country'
  },
  {
    url: '/diagrams',
    name: 'Diagrams'
  },
  {
    url: '/favourites',
    name: 'Favorite countries'
  }
]

describe('Countries app for the unauthorised user', () => {
  beforeEach(function () {
    cy.visit(Cypress.env('BASE_URL'))
    cy.logout()
  })

  it('front page can be opened', function () {
    cy.contains('My name is Arseniiy')
  })

  it('private pages can not be opened without login', function () {
    privatePages.forEach((page) => {
      cy.visit(Cypress.env('BASE_URL') + page.url)
      cy.contains('Login')
    })
  })

  it('header does not contain links to private pages and contains login button', function () {
    cy.get('[data-test="navigation-full-screen"]').as('navbar')
    cy.get('@navbar').should('contain', 'Home')
    cy.get('@navbar').find('a').should('have.length', 1)
    cy.get('[data-test="auth-and-dark-section-full"]')
      .find('button')
      .should('contain', 'Login')
  })

  it('clicking on the login button opens the login page and the register button appears', function () {
    cy.get('[data-test="auth-and-dark-section-full"]').as('auth-section')

    cy.get('@auth-section')
      .find('[data-test="login-button"]')
      .should('contain', 'Login')
      .click()
    cy.location('pathname').should('include', '/login')
    cy.get('@auth-section')
      .find('[data-test="register-button"]')
      .should('contain', 'Register')
  })

  it('new user can register (mock the API request)', function () {
    cy.intercept(
      'POST',
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=*',
      {}
    ).as('register')
    cy.get('[data-test="auth-and-dark-section-full"]').as('auth-section')
    cy.get('@auth-section').find('[data-test="login-button"]').click()
    cy.get('@auth-section').find('[data-test="register-button"]').click()
    cy.location('pathname').should('include', '/register')
    cy.get('form').should('have.length', 1).as('register-form')
    cy.get('@register-form')
      .find('[placeholder="email"]')
      .type(credentials.email)
    cy.get('@register-form').find('[placeholder="name"]').type(credentials.name)
    cy.get('@register-form')
      .find('[placeholder="password"]')
      .type(credentials.password)
    cy.get('@register-form')
      .find('button')
      .should('contain', 'Register')
      .click()
  })
})

describe('Countries app for the authorised user', () => {
  beforeEach(function () {
    cy.visit(Cypress.env('BASE_URL'))
    cy.login(credentials.email, credentials.password)
    cy.wait(3000)
  })

  it('header contains links to private pages and contains logout button', function () {
    cy.get('[data-test="navigation-full-screen"]').as('navbar')
    cy.get('@navbar').should('contain', 'Home')
    cy.get('@navbar').should('contain', 'Countries')
    cy.get('@navbar').should('contain', 'Diagrams')
    cy.get('@navbar').should('contain', 'Favourites')
    cy.get('@navbar').find('a').should('have.length', 4)
    cy.get('[data-test="auth-and-dark-section-full"]')
      .find('button')
      .should('contain', 'Logout')
  })

  it('private pages can be opened after login', function () {
    privatePages.forEach((page) => {
      cy.visit(Cypress.env('BASE_URL') + page.url)
      cy.location('pathname').should('include', page.url)
    })
  })

  it('logout button works', function () {
    cy.get('[data-test="auth-and-dark-section-full"]').as('auth-section')
    cy.wait(3000)
    cy.get('@auth-section').find('[data-test="logout-button"]').click()
    cy.contains('Login')
  })

  it('user can add a country to favourites', function () {
    cy.visit(Cypress.env('BASE_URL') + '/countries')
    cy.get('[data-test="navigation-full-screen"]').as('navbar')
    cy.get('@navbar').find('[data-test="navlink-/favourites"]').as('favourites')
    cy.get('@favourites').should('not.contain', '(')
    cy.get('[data-test="country-card"]').first().as('country-card')
    cy.get('@country-card').find('[data-test="favourite-button"]').click()
    cy.get('@favourites').should('contain', '(1)')
  })

  it('user can remove a country from favourites', function () {
    cy.visit(Cypress.env('BASE_URL') + '/favourites')
    cy.get('[data-test="clear-favourites-button"]').as('clear-favourites')
    cy.get('@clear-favourites').click()
    cy.contains(/you have no favourites/i)
  })

  it('page of every country can be opened', function () {
    countriesList.forEach((country) => {
      cy.visit(Cypress.env('BASE_URL') + `/countries/${country.name.common}`)
      cy.contains(country.name.common)
      cy.contains(country.region)
      if (country.capital) {
        cy.contains(country.capital[0])
      }
      if (country.languages) {
        Object.values(country.languages).forEach((language) => {
          cy.contains(language)
        })
      }
      cy.contains(country.population.toLocaleString())
      cy.contains(country.area.toLocaleString())
    })
  })

  it('diagrams page can be opened and checkboxes can be clicked', function () {
    cy.visit(Cypress.env('BASE_URL') + '/diagrams')
    cy.contains('Diagrams')
    cy.get('[data-test="scatter-component"]').should('exist')
    cy.get('[data-test="area-component"]').should('exist')
    cy.get('[data-test="diagram-checkbox"]').each((checkbox) => {
      cy.wrap(checkbox).click()
    })
    cy.get('[data-test="scatter-component"]').should('not.exist')
    cy.get('[data-test="area-component"]').should('not.exist')
  })
})

describe('dark mode', () => {
  it('dark mode can be toggled', function () {
    cy.visit(Cypress.env('BASE_URL'))
    cy.get('html').should('not.have.class', 'dark')
    cy.get('[data-test="auth-and-dark-section-full"]').as('auth-section')
    cy.get('@auth-section')
      .find('[data-test="dark-mode-toggle"]')
      .find('button')
      .as('dark-mode-toggle')
    cy.get('@dark-mode-toggle').click()
    cy.get('html').should('have.class', 'dark')
  })
})
