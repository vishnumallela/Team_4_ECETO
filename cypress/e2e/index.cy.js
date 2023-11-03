import React from 'react'
import index from '../../src/pages/index'

describe('<index />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<index />)
  })
})