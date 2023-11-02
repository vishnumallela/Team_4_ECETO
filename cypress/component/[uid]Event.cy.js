import React from 'react'
import Event from '../../src/pages/CreateEvent/[uid]'

describe('<Event />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Event />)
  })
})