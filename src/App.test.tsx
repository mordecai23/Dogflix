import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('interactions Dogflix', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('dogflix-profile', 'biscotte')
  })

  it('ouvre et ferme la modal de détail au clavier', async () => {
    render(<App />)
    const details = await screen.findAllByLabelText('Voir les détails de Breaking Dog')
    await userEvent.click(details[0])
    expect(screen.getByRole('dialog', { name: 'Breaking Dog' })).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('ajoute puis retire un titre de Ma liste et le persiste', async () => {
    localStorage.setItem('dogflix-list', '[]')
    render(<App />)
    const details = await screen.findAllByLabelText('Voir les détails de Breaking Dog')
    await userEvent.click(details[0])
    const dialog = screen.getByRole('dialog', { name: 'Breaking Dog' })
    await userEvent.click(within(dialog).getByLabelText('Ajouter à ma liste'))
    expect(JSON.parse(localStorage.getItem('dogflix-list') ?? '[]')).toContain(1)
    await userEvent.click(within(dialog).getByLabelText('Retirer de ma liste'))
    expect(JSON.parse(localStorage.getItem('dogflix-list') ?? '[]')).not.toContain(1)
  })

  it('effectue une recherche instantanée', async () => {
    render(<App />)
    await userEvent.click(screen.getByLabelText('Rechercher'))
    const field = screen.getByLabelText('Rechercher un film ou une série')
    await userEvent.type(field, 'Vikinchiens')
    expect(screen.getByText(/1 résultat reniflé/)).toBeInTheDocument()
    expect(screen.getByLabelText('Voir les détails de Vikinchiens')).toBeInTheDocument()
  })
})
