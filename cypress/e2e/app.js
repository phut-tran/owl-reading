Cypress.on('window:before:load', win => {
  win.indexedDB.deleteDatabase('owl-reading')
  win.localStorage.clear()
})

describe('App', () => {
  it('should display the landing page title on first visit', () => {
    cy.visit('/')
    cy.contains('h1', 'Learn English through reading.')
  })

  it('should navigate to /get-started when the "Get Started" button is clicked', () => {
    cy.get('[data-testid="get-started-btn"]').click()
    cy.url().should('include', '/get-started')
  })

  it('should allow to submit the get started form', () => {
    cy.findByRole('textbox', { name: /nickname/i }).type('mynameisjeff')

    cy.findByRole('combobox', { name: /choose your native language/i })
      .type('Tiếng Việt-vi{enter}')

    cy.findByRole('button', { name: /save/i }).click()

    cy.url().should('include', '/reading')
    cy.contains('h3', 'Enjoy reading')
  })

  it('should able to create new document', () => {
    cy.findByRole('button', { name: /add/i }).click()

    cy.findByRole('textbox', { name: /title/i }).type('Test add new document')
    cy.findByRole('combobox', { name: /tags/i }).type('test-new-tag{enter}{esc}')
    cy.get('[data-testid="editor"]').type(
      `
      old pond
      frog leaps
      water's sound
      -- Bashō
      `)

    cy.findByRole('button', { name: /save/i }).click()

    cy.get('[data-testid="link-card"]').should('have.length', 3)
  })

  it('should be able to edit document', () => {
    cy.get('[data-testid="EditIcon"]').first().click()

    cy.findByRole('textbox', { name: /title/i }).clear().type('Test edit document')

    cy.findByRole('button', { name: /save/i }).click()

    cy.contains('h4', 'Test edit document')
  })

  it('should be able to delete document and recover document', () => {
    cy.get('[data-testid="DeleteIcon"]').last().click()
    cy.get('[data-testid="link-card"]').should('have.length', 2)

    cy.findByRole('button', { name: /undo/i }).click()
    cy.get('[data-testid="link-card"]').should('have.length', 3)
  })
})
