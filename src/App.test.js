import { render, screen } from '@testing-library/react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

jest.mock('./modals/db', () => {
  return {
    __esModule: true,
    db: {
      docsMetaData: {
        add: jest.fn(),
      },
      docsContent: {
        add: jest.fn(),
      },
      open: jest.fn(),
    },
  }
})

test('Render logo text', () => {
  render(<App />, { wrapper: BrowserRouter })
  const logoElements = screen.getAllByText(/OwlReading/i)
  expect(logoElements.length).toBe(2)
})
