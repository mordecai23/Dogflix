import { describe, expect, it } from 'vitest'
import { catalog } from '../data/catalog'
import { filterCatalog, searchCatalog } from './catalog'

describe('catalogue Dogflix', () => {
  it('contient les 36 films et 37 séries du catalogue', () => {
    expect(filterCatalog('film', [])).toHaveLength(36)
    expect(filterCatalog('serie', [])).toHaveLength(37)
    expect(catalog).toHaveLength(73)
  })

  it('recherche sans tenir compte des accents ni de la casse', () => {
    expect(searchCatalog('CROQUETTES').some((item) => item.title === 'Breaking Dog')).toBe(true)
    expect(searchCatalog('deuxieme patte').map((item) => item.title)).toContain('Dune : Deuxième Patte')
    expect(searchCatalog('paloma')).toHaveLength(5)
    expect(searchCatalog('berger australien').filter((item) => item.title.startsWith('Paloma'))).toHaveLength(5)
  })

  it('filtre les nouveautés et Ma liste', () => {
    expect(filterCatalog('new', []).every((item) => item.isNew)).toBe(true)
    expect(filterCatalog('list', [1, 21]).map((item) => item.id)).toEqual([1, 21])
  })

  it('référence une affiche et des identifiants uniques pour chaque œuvre', () => {
    expect(catalog.every((item) => item.poster.startsWith('/assets/posters/'))).toBe(true)
    expect(new Set(catalog.map((item) => item.id)).size).toBe(catalog.length)
    expect(new Set(catalog.map((item) => item.slug)).size).toBe(catalog.length)
  })
})
