import { catalog } from '../data/catalog'
import type { Media, View } from '../types'

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr')

export function searchCatalog(query: string, source: Media[] = catalog): Media[] {
  const needle = normalize(query.trim())
  if (!needle) return source
  return source.filter((item) =>
    normalize([item.title, item.originalTitle, item.synopsis, ...item.genres].join(' ')).includes(needle),
  )
}

export function filterCatalog(view: View, listIds: number[], source: Media[] = catalog): Media[] {
  if (view === 'serie') return source.filter((item) => item.type === 'serie')
  if (view === 'film') return source.filter((item) => item.type === 'film')
  if (view === 'new') return source.filter((item) => item.isNew)
  if (view === 'list') return source.filter((item) => listIds.includes(item.id))
  return source
}

export const initialListIds = catalog.filter((item) => item.inMyList).map((item) => item.id)
