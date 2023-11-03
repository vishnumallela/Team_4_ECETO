import React from 'react'

describe('<index />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<index />)
  })
})