import { render, screen } from '@testing-library/react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { checkDatabase } from './modals/db'

jest.mock('./modals/db')

beforeEach(() => {
  checkDatabase.mockImplementation(() => Promise.resolve(true))
})

test('Render logo text', async () => {
  render(<App />, { wrapper: BrowserRouter })
  const logoElements = await screen.findAllByText(/OwlReading/i)
  expect(logoElements.length).toBe(2)
})
