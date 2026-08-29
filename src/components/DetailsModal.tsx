import { Check, Play, Plus, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Media } from '../types'

interface Props {
  media: Media
  inList: boolean
  onClose: () => void
  onPlay: () => void
  onToggleList: () => void
}

export function DetailsModal({ media, inList, onClose, onPlay, onToggleList }: Props) {
  const closeButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.classList.add('modal-open')
    closeButton.current?.focus()
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('modal-open') }
  }, [onClose])

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal__hero">
          <img className="modal__image" src={media.backdrop ?? media.poster} alt="" />
          <button ref={closeButton} className="modal__close" onClick={onClose} aria-label="Fermer"><X /></button>
          <div className="modal__hero-copy">
            <p className="eyebrow">{media.dogflixOriginal ? 'UNE EXCLUSIVITÉ DOGFLIX' : 'À RENIFLER SANS ATTENDRE'}</p>
            <h2 id="modal-title">{media.title}</h2>
            <div className="modal__actions">
              <button className="button button--primary" onClick={onPlay}><Play fill="currentColor" />Lecture</button>
              <button className="button button--round" onClick={onToggleList} aria-label={inList ? 'Retirer de ma liste' : 'Ajouter à ma liste'}>{inList ? <Check /> : <Plus />}</button>
            </div>
          </div>
        </div>
        <div className="modal__body">
          <div className="modal__main">
            <p className="meta"><strong>{media.match}% compatible</strong> <span>{media.year}</span> <span>{media.duration ?? `${media.seasons} saisons`}</span> <b>{media.age}</b> <span>HD</span></p>
            <p className="modal__synopsis">{media.synopsis}</p>
          </div>
          <aside>
            <p><span>Distribution :</span> de très bons chiens, un facteur courageux</p>
            <p><span>Genres :</span> {media.genres.join(', ')}</p>
            <p><span>Ce programme est :</span> poilu, haletant, approuvé par le vétérinaire</p>
          </aside>
        </div>
        <div className="modal__episode">
          <span>À suivre</span><strong>{media.type === 'serie' ? 'Épisode suivant : Qui a dit « promenade » ?' : 'Bonus : les coulisses du lancer de balle'}</strong>
          <i style={{ width: `${Math.min(media.match, 92)}%` }} />
        </div>
      </section>
    </div>
  )
}
