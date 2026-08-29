export type MediaType = 'film' | 'serie'

export interface Media {
  id: number
  slug: string
  type: MediaType
  title: string
  originalTitle: string
  synopsis: string
  year: number
  duration?: string
  seasons?: number
  age: string
  match: number
  genres: [string, string, string]
  poster: string
  backdrop?: string
  isNew: boolean
  trending: boolean
  dogflixOriginal: boolean
  inMyList: boolean
}

export type View = 'home' | 'serie' | 'film' | 'new' | 'list'
