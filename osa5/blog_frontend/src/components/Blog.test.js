import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { Blog, Blog_rend } from './Blog'


test('renders title, but not all content when hided', () => {
  const user = {
    username: 'testuser'
  }

  const blog = {
    title: 'TEST TITLE',
    author: 'TEST AUTHOR',
    url: 'TEST URL',
    user: {
      username: 'testuser'
    },
    likes: 0
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent(blog.title)
})


test('shows all content when enabled', async () => {
  const user = {
    username: 'testuser'
  }

  const blog = {
    title: 'TEST TITLE',
    author: 'TEST AUTHOR',
    url: 'TEST URL',
    user: {
      username: 'testuser'
    },
    likes: 0
  }


  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    blog.title,
    blog.author,
    blog.url,
    blog.likes
  )
})


test('click like 2 times', async () => {
  const user = {
    username: 'testuser'
  }

  const blog = {
    title: 'TEST TITLE',
    author: 'TEST AUTHOR',
    url: 'TEST URL',
    user: {
      username: 'testuser'
    },
    likes: 0
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog_rend blog={blog} user={user} setLikes={mockHandler} />
  )

  const button_show = component.getByText('View')
  fireEvent.click(button_show)

  const button_like = component.getByText('Like')
  fireEvent.click(button_like)
  fireEvent.click(button_like)
  //fireEvent.click(button_like)

  expect(mockHandler.mock.calls).toHaveLength(2)
})