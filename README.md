[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Kapshtyk_countries_typescrirpt)](https://sonarcloud.io/summary/new_code?id=Kapshtyk_countries_typescrirpt)

[![Link](https://img.shields.io/badge/Link-Visit-blue?style=for-the-badge&logo=link)](https://countries-vercel.vercel.app)

# Countries App

Countries App is a simple web application built with React. It allows users to explore information about different countries, view their details, and see various diagrams. This application was created as part of the Business College Helsinki lessons and uses data from [restcountries.com](https://restcountries.com/) and weather data from [openweathermap.org](https://openweathermap.org/).

## Table of Contents

- [Features](#features)
- [Technologies used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Code Examples](#code-examples)
- [Code Quality](#code-quality)
- [Credits](#credits)
- [Screenshots](#screenshots)
- [Author](#author)
- [Contributing](#contributing)
- [License](#license)

## Features

- View a list of countries.
- Search for a specific country.
- View detailed information about a selected country.
- View weather information for each country.
- Explore diagrams related to countries.
- Mark countries as favorites.
- View your favorite countries.
- Dark mode support.
- Mobile version support.
- User authentication (registration and login).

## Technologies used

- [TypeScript](https://www.typescriptlang.org).
- External APIs: Google's [Firebase, Firestore](https://firebase.google.com) and [Maps](https://mapsplatform.google.com), [OpenWeatherMap API](https://openweathermap.org), [REST Countries API]().
- [React](https://react.dev), [React Router](https://reactrouter.com/en/main).
- [Recharts](https://recharts.org/en-US/) - for creating responsive dynamic charts.
- [Redux Toolkit](https://redux-toolkit.js.org), Redux-persist - for managing the state of the application.
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) - for fetching the data, transforming the result and caching it.
- [Zod](https://zod.dev) - for creating the types of incoming data from external APIs, and validating the response at runtime within RTK Query (you can check some features below).
- [Cypress](https://www.cypress.io) - to build the E2E test.
- [Tailwind](https://tailwindcss.com) and a couple components by [shadcn/ui](https://ui.shadcn.com) for styling.

## Getting Started

To get a copy of the project up and running on your local machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) - Make sure you have Node.js installed.

> [!IMPORTANT]
> You should get your API keys and other credentials for the Google Firebase and Open Weather Map APIs and place them in the .env file (you can use .env.example as a reference). The configuration from the .env.example will probably work, but these credentials can be revoked at any time.
> If you want to run Cypress tests, you will also need to create an .env.local.json file (the same, you can use the .env.local.json.example file).


### Installation

1. Clone this repository:

```
git clone https://github.com/Kapshtyk/countries_typescript.git
```

2. Navigate to the project directory:

```
cd countries_typescript
```

3. Install the required dependencies:

```
npm install
```

## Usage

- To start the development server, run:

```
npm start
```

- Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the application.

## Code examples:

### Zod:

- Creation of the schema and types with the help of Zod:

```JavaScript
import { ZodError, z } from 'zod'

const CountrySchema = z.object({
  name: z.object({
    common: z.string(),
    official: z.string()
  }),
  area: z.number(),
  flags: z.object({
    png: z.string().url(),
    svg: z.string().url(),
    alt: z.string().optional()
  }),
  capital: z.array(z.string()).optional(),
  capitalInfo: z.object({
    latlng: z.array(z.number()).length(2).optional()
  }),
  region: z.string(),
  population: z.number(),
  languages: z.record(z.string()).optional(),
  currencies: z
    .record(
      z.object({
        name: z.string(),
        symbol: z.string().optional()
      })
    )
    .optional(),
  flag: z.string(),
  cca3: z.string(),
  borders: z.array(z.string()).optional()
})

const CountriesSchema = z.array(CountrySchema)

export type Country = z.infer<typeof CountrySchema>
export type Countries = z.infer<typeof CountriesSchema>
```

- Use Zod to create the runtime validation function:

```JavaScript
export default function validateAndCleanUpCountryData(data: any): Countries {
  try {
    const validatedCountries = data
      .map((country: any) => {
        const result = CountrySchema.safeParse(country)

        switch (result.success) {
          case true:
            return result.data
          case false:
            console.log(
              `Error validating country data: ${country.name.common}: `,
              JSON.stringify(result.error, null, 2)
            )
            return null
        }
      })
      .filter(Boolean)

    return validatedCountries
  } catch (error: unknown) {
    const { name = 'ZodError', issues = [] } = error as ZodError
    console.log(JSON.stringify({ name, issues, data }, null, 2))
    return []
  }
}
```

- Use the above function to validate the response at runtime within the RTK Query:

```JavaScript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import validateAndCleanUpCountryData, { Countries } from '@/lib/zod/countries'

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://restcountries.com/v3.1/'
  }),
  endpoints: (builder) => ({
    getCountries: builder.query<Countries, unknown>({
      query: () => 'all',
      transformResponse: (response: any): Countries =>
        validateAndCleanUpCountryData(response)
    })
  })
})

export const { useLazyGetCountriesQuery, useGetCountriesQuery } = countriesApi
```

As a result, you can rely on types not only during development, but also during runtime. Zod will check every response, and if the structure of the API has been changed, or new countries with different fileds structure have been added, Zod will notify you and prevent your program from breaking.

Also it helps us to delete the redundant fileds from the store, as only metnioned in the schema fileds will be present in the output of the `validateAndCleanUpCountryData` function.

### Cypress

- Use Cypress to test the application for unauthorised users:

```JavaScript
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
```

- Test the application for authorised users:

```JavaScript
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
```

- Test the dark mode:

```JavaScript
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
```

As a result, I am confident that all my secure routes are working as they should, users cannot access secure pages without authentication, users can login and register using the appropriate forms, users can open any country page in the API as of 20 October 2023, and the dark mode switch is working.

![cypress screenshot](https://github.com/Kapshtyk/countries/blob/master/screenshots/cypress.jpeg)

It has also been possible to verify that form validation is working correctly.

You can run tests in the browser:
```
 npm run cypress:open
```
or in the headless mode:
```
npm run test:e2e
``````
## Code Quality
Code quality verified by SonarCloud.io

![sonar](https://github.com/Kapshtyk/countries/blob/master/screenshots/sonar.png)

## Credits

- Special thanks to [Martin Holland](https://github.com/martin-holland) for coming up with the idea for this project and teaching us how to do it.
- Thanks to the developers of the technologies used to create this project for their valuable contributions to the web development community.
- Thanks to the [Unsplash](https://unsplash.com) for providing us with this random photo API.

## Screenshots

![full-screen-light-countries](https://github.com/Kapshtyk/countries/blob/master/screenshots/full-screen-light-countries.png)
![full-screen-dark-country](https://github.com/Kapshtyk/countries/blob/master/screenshots/full-screen-dark-country.png)
![full-screen-light-country](https://github.com/Kapshtyk/countries/blob/master/screenshots/full-screen-light-country.png)
![full-screen-light-diagrams](https://github.com/Kapshtyk/countries/blob/master/screenshots/full-screen-light-diagrams.png)
![mobile-dark-country](https://github.com/Kapshtyk/countries/blob/master/screenshots/mobile-dark-country.png)

## Author

- LinkedIn - [Arseniiy Kapshtyk](https://www.linkedin.com/in/kapshtyk/)
- Github - [@kapshtyk](https://github.com/Kapshtyk)

## Contributing

If you'd like to contribute to this project, you can follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name.
3. Make your changes and commit them.
4. Push your branch to your fork.
5. Create a pull request and describe your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
