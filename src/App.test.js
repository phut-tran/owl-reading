import { render, screen } from '@testing-library/react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

jest.mock('./modals/db')

test('Render logo text', async () => {
  render(<App />, { wrapper: BrowserRouter })
  const logoElements = await screen.findAllByText(/OwlReading/i)
  expect(logoElements.length).toBe(2)
})
