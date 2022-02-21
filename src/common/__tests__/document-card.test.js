import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Router } from 'react-router-dom';
import DocumentCard from '../document-card'
import { createMemoryHistory } from 'history'

const userDocument = {
  id: 1,
  title: 'Test document',
  textShort: 'Document text preview',
}

it('should render card title', function () {
  render(
    <DocumentCard userDocument={userDocument} />
    , { wrapper: MemoryRouter })
  const titleElement = screen.getByText(userDocument.title)
  expect(titleElement).toBeInTheDocument()
})

it('should render card text preview', function () {
  render(
    <DocumentCard userDocument={userDocument} />
    , { wrapper: MemoryRouter })
  const textShortElement = screen.getByText(userDocument.textShort)
  expect(textShortElement).toBeInTheDocument()
})

it('should navigate to reading page when card click', function () {
  const history = createMemoryHistory({
    initialEntries: ['/reading-list'],
  })
  render(
    <Router location={history.location} navigator={history}>
      <DocumentCard userDocument={userDocument} />
    </Router>
  )

  const linkElement = screen.getByTestId('link-card')
  userEvent.click(linkElement)
  expect(history.location.pathname).toBe('/reading/1')
})
