import { Search, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Media } from '../types'
import { MediaCard } from './MediaCard'

interface Props {
  query: string
  results: Media[]
  listIds: number[]
  onQuery: (query: string) => void
  onClose: () => void
  onOpen: (media: Media) => void
  onPlay: (media: Media) => void
  onToggleList: (id: number) => void
}

export function SearchPanel({ query, results, listIds, onQuery, onClose, onOpen, onPlay, onToggleList }: Props) {
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => input.current?.focus(), [])
  return (
    <section className="search-panel" aria-label="Recherche dans Dogflix">
      <div className="search-panel__bar">
        <Search />
        <input ref={input} value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Titres, genres, chaussettes…" aria-label="Rechercher un film ou une série" />
        {query && <button onClick={() => onQuery('')} aria-label="Effacer la recherche"><X /></button>}
      </div>
      <div className="search-panel__summary">
        <p>{query ? `${results.length} résultat${results.length > 1 ? 's' : ''} reniflé${results.length > 1 ? 's' : ''} pour « ${query} »` : 'Qu’allons-nous renifler ce soir ?'}</p>
        <button onClick={onClose}>Fermer</button>
      </div>
      {query && results.length === 0 ? (
        <div className="empty-state"><span>🐾</span><h2>Aucune piste fraîche</h2><p>Notre meilleur limier a vérifié sous le canapé. Essayez « croquettes », « chat » ou « aventure ».</p></div>
      ) : (
        <div className="search-results">{results.map((media) => <MediaCard key={media.id} media={media} listIds={listIds} onOpen={onOpen} onPlay={onPlay} onToggleList={onToggleList} />)}</div>
      )}
    </section>
  )
}
