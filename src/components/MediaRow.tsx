import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import type { Media } from '../types'
import { MediaCard } from './MediaCard'

interface Props {
  title: string
  eyebrow?: string
  items: Media[]
  listIds: number[]
  ranked?: boolean
  onOpen: (media: Media) => void
  onPlay: (media: Media) => void
  onToggleList: (id: number) => void
}

export function MediaRow({ title, eyebrow, items, listIds, ranked, onOpen, onPlay, onToggleList }: Props) {
  const track = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const scroll = (direction: -1 | 1) => track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.82, behavior: 'smooth' })
  const updateProgress = () => {
    const el = track.current
    if (el) setProgress(el.scrollWidth <= el.clientWidth ? 0 : el.scrollLeft / (el.scrollWidth - el.clientWidth))
  }

  return (
    <section className="media-row" aria-labelledby={`row-${title.replaceAll(' ', '-')}`}>
      <div className="media-row__heading">
        <div>{eyebrow && <span>{eyebrow}</span>}<h2 id={`row-${title.replaceAll(' ', '-')}`}>{title}</h2></div>
        <div className="row-progress" aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(.08, 1 - progress)})` }} /></div>
      </div>
      <button className="row-arrow row-arrow--left" onClick={() => scroll(-1)} aria-label={`Faire défiler ${title} vers la gauche`}><ChevronLeft /></button>
      <div className="media-row__track" ref={track} onScroll={updateProgress} tabIndex={0}
        onKeyDown={(event) => { if (event.key === 'ArrowRight') scroll(1); if (event.key === 'ArrowLeft') scroll(-1) }}>
        {items.map((media, index) => <MediaCard key={media.id} media={media} listIds={listIds} onOpen={onOpen} onPlay={onPlay} onToggleList={onToggleList} rank={ranked ? index + 1 : undefined} />)}
      </div>
      <button className="row-arrow row-arrow--right" onClick={() => scroll(1)} aria-label={`Faire défiler ${title} vers la droite`}><ChevronRight /></button>
    </section>
  )
}
