import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../navbar'

const numOfElement = 2

it('should render navbar', () => {
  render(<Navbar />, { wrapper: MemoryRouter })
  const logoText = screen.getAllByText(/owlreading/i)
  expect(logoText.length).toBe(numOfElement)
})

it('should render "reading list" anchor', () => {
  render(<Navbar />, { wrapper: MemoryRouter })
  const readingList = screen.getAllByText(/reading list/i)
  expect(readingList.length).toBe(numOfElement)
})

it('should render "recall" anchor', () => {
  render(<Navbar />, { wrapper: MemoryRouter })
  const recall = screen.getAllByText(/recall/i)
  expect(recall.length).toBe(numOfElement)
})
