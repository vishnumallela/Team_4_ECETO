import React from 'react'
import Dashboard from '../../src/pages/Dashboard/[user_id]'

describe('<Dashboard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Dashboard />)
  })
})