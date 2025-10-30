import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { AddPost } from '../AddPost'
import userEvent from '@testing-library/user-event'

describe('AddPost Component', () => {
  it('should render component', () => {
    render(<AddPost />)

    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument()
    expect(screen.getByText(/Enviar new post/i)).toBeInTheDocument()
  })

  it('should update input value', async () => {
    const user = userEvent.setup()
    render(<AddPost />)

    const titleInputs = screen.getAllByRole('textbox', { name: /title/i })
    const titleInput = titleInputs.find(
      (input) => input.getAttribute('name') === 'title',
    ) as HTMLInputElement

    await user.type(titleInput, 'Mi nuevo post')

    expect(titleInput.value).toBe('Mi nuevo post')
  })

  it('should update input body', async () => {
    const user = userEvent.setup()
    render(<AddPost />)

    const bodyInputs = screen.getAllByRole('textbox', { name: /body/i })
    const bodyInput = bodyInputs.find(
      (input) => input.getAttribute('name') === 'body',
    ) as HTMLInputElement

    await user.type(bodyInput, 'Este es el contenido del post')

    expect(bodyInput.value).toBe('Este es el contenido del post')
  })

  it('it should reset inputs after send form', async () => {
    const user = userEvent.setup()
    render(<AddPost />)

    const titleInputs = screen.getAllByRole('textbox', { name: /title/i })
    const titleInput = titleInputs.find(
      (input) => input.getAttribute('name') === 'title',
    ) as HTMLInputElement

    const bodyInputs = screen.getAllByRole('textbox', { name: /body/i })
    const bodyInput = bodyInputs.find(
      (input) => input.getAttribute('name') === 'body',
    ) as HTMLInputElement

    const submitButton = screen.getByRole('button', {
      name: /Enviar new post/i,
    })

    await user.type(titleInput, 'Nuevo Post')
    await user.type(bodyInput, 'Contenido del post')
    await user.click(submitButton)

    expect(titleInput.value).toBe('')
    expect(bodyInput.value).toBe('')
  })

  it('should dispatch ADD_POST', async () => {
    const user = userEvent.setup()
    render(<AddPost />)

    const titleInputs = screen.getAllByRole('textbox', { name: /title/i })
    const titleInput = titleInputs.find(
      (input) => input.getAttribute('name') === 'title',
    ) as HTMLInputElement

    const bodyInputs = screen.getAllByRole('textbox', { name: /body/i })
    const bodyInput = bodyInputs.find(
      (input) => input.getAttribute('name') === 'body',
    ) as HTMLInputElement

    const submitButton = screen.getByRole('button', {
      name: /Enviar new post/i,
    })

    await user.type(titleInput, 'Test Post')
    await user.type(bodyInput, 'Test Body')
    await user.click(submitButton)

    expect(titleInput.value).toBe('')
    expect(bodyInput.value).toBe('')
  })
})
