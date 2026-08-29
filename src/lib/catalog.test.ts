import { describe, expect, it } from 'vitest'
import { catalog } from '../data/catalog'
import { filterCatalog, searchCatalog } from './catalog'

describe('catalogue Dogflix', () => {
  it('contient exactement 20 films et 20 séries', () => {
    expect(filterCatalog('film', [])).toHaveLength(20)
    expect(filterCatalog('serie', [])).toHaveLength(20)
    expect(catalog).toHaveLength(40)
  })

  it('recherche sans tenir compte des accents ni de la casse', () => {
    expect(searchCatalog('CROQUETTES').some((item) => item.title === 'Breaking Dog')).toBe(true)
    expect(searchCatalog('deuxieme patte').map((item) => item.title)).toContain('Dune : Deuxième Patte')
  })

  it('filtre les nouveautés et Ma liste', () => {
    expect(filterCatalog('new', []).every((item) => item.isNew)).toBe(true)
    expect(filterCatalog('list', [1, 21]).map((item) => item.id)).toEqual([1, 21])
  })
})
