import { Check, ChevronDown, Play, Plus } from 'lucide-react'
import type { Media } from '../types'

interface Props {
  media: Media
  listIds: number[]
  onOpen: (media: Media) => void
  onPlay: (media: Media) => void
  onToggleList: (id: number) => void
  rank?: number
}

export function MediaCard({ media, listIds, onOpen, onPlay, onToggleList, rank }: Props) {
  const inList = listIds.includes(media.id)
  return (
    <article className={`media-card ${rank ? 'media-card--ranked' : ''}`} data-testid="media-card">
      {rank && <span className="media-card__rank" aria-hidden="true">{rank}</span>}
      <button className="media-card__poster" onClick={() => onOpen(media)} aria-label={`Voir les détails de ${media.title}`}>
        <img src={media.poster} alt="" width="400" height="600" loading="lazy" />
        <span className="media-card__shade" />
        <strong>{media.title}</strong>
        {media.dogflixOriginal && <span className="media-card__original">D ORIGINAL</span>}
        {media.isNew && <span className="media-card__new">NOUVEAU</span>}
      </button>
      <div className="media-card__peek">
        <div className="media-card__actions">
          <button aria-label={`Lire ${media.title}`} onClick={() => onPlay(media)}><Play fill="currentColor" /></button>
          <button aria-label={inList ? `Retirer ${media.title} de ma liste` : `Ajouter ${media.title} à ma liste`} onClick={() => onToggleList(media.id)}>
            {inList ? <Check /> : <Plus />}
          </button>
          <button className="media-card__details" aria-label={`Plus d’informations sur ${media.title}`} onClick={() => onOpen(media)}><ChevronDown /></button>
        </div>
        <p><span>{media.match}% compatible</span> <b>{media.age}</b> {media.duration ?? `${media.seasons} saisons`}</p>
        <small>{media.genres.join(' • ')}</small>
      </div>
    </article>
  )
}
