import React from 'react'
import SignUp from '../../src/pages/SignUp'

describe('<SignUp />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SignUp />)
  })
})