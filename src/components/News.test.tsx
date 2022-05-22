import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import News from './News'

afterEach(cleanup)

test('News renders correctly', () => {
  const { asFragment } = render(<News id={20} created_at={'34 minutes ago'} author={'derbOac'} title={'Book Review: Making Nature'} url={'https://astralcodexten.substack.com/p/your-book-review-making-nature'} />)
  expect(asFragment()).toMatchSnapshot()

  const created_at = screen.getByText('34 minutes ago by derbOac')
  const title = screen.getByText('Book Review: Making Nature')
  const url = screen.getByTestId('url')
  expect(url).toBeInTheDocument()
  expect(url).toHaveAttribute('href', 'https://astralcodexten.substack.com/p/your-book-review-making-nature')
  expect(created_at).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(url).toBeInTheDocument()
})