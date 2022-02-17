import { render, screen } from '@testing-library/react'
import App from './App'

test('Render logo text', () => {
  render(<App />)
  const logoElements = screen.getAllByText(/OwlReading/i)
  expect(logoElements.length).toBe(2)
})
