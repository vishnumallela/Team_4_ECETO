import React from 'react'
import Event from './[uid]'

describe('<Event />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Event />)
  })
})