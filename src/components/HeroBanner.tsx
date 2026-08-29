import { Check, Info, Play, Plus, Volume2, VolumeX } from 'lucide-react'
import { useState } from 'react'
import type { Media } from '../types'

interface Props {
  media: Media
  inList: boolean
  onInfo: () => void
  onPlay: () => void
  onToggleList: () => void
}

export function HeroBanner({ media, inList, onInfo, onPlay, onToggleList }: Props) {
  const [muted, setMuted] = useState(true)
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img className="hero__backdrop" src={media.backdrop} alt="" width="1536" height="1024" fetchPriority="high" />
      <div className="hero__scrim" />
      <div className="hero__content">
        <p className="hero__kicker"><span>D</span> UNE SÉRIE DOGFLIX</p>
        <h1 id="hero-title">BREAKING <em>DOG</em></h1>
        <p className="hero__rank">N° 1 des friandises bleues aujourd’hui</p>
        <p className="hero__synopsis">{media.synopsis}</p>
        <div className="hero__buttons">
          <button className="button button--primary" onClick={onPlay}><Play fill="currentColor" />Lecture</button>
          <button className="button button--secondary" onClick={onInfo}><Info />Plus d’infos</button>
          <button className="button button--round hero__list" onClick={onToggleList} aria-label={inList ? 'Retirer de ma liste' : 'Ajouter à ma liste'}>
            {inList ? <Check /> : <Plus />}
          </button>
        </div>
      </div>
      <div className="hero__side">
        <button className="button button--round" onClick={() => setMuted(!muted)} aria-label={muted ? 'Activer le volume' : 'Couper le volume'}>
          {muted ? <VolumeX /> : <Volume2 />}
        </button>
        <span>{media.age}</span>
      </div>
      <div className="hero__bottom" />
    </section>
  )
}
