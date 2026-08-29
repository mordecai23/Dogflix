import { Maximize, Pause, Play, RotateCcw, Volume2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Media } from '../types'

const messages = [
  'Votre chien a mangé la bande passante.',
  'Le facteur est passé. Toute la production a quitté le plateau.',
  'Une balle a été lancée hors-champ. Personne ne revient.',
  'Le chat est assis sur le routeur. Évidemment.',
  'Pause technique : quelqu’un a dit « promenade ».',
]

interface Props { media: Media; onClose: () => void }

export function FakePlayer({ media, onClose }: Props) {
  const [progress, setProgress] = useState(2)
  const [playing, setPlaying] = useState(true)
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.classList.add('modal-open')
    const timer = window.setInterval(() => playing && setProgress((value) => Math.min(value + 2.1, 34)), 180)
    return () => { document.removeEventListener('keydown', onKey); window.clearInterval(timer); document.body.classList.remove('modal-open') }
  }, [onClose, playing])

  return (
    <section className="player" aria-label={`Lecteur de ${media.title}`}>
      <img src={media.backdrop ?? media.poster} alt="" />
      <div className="player__veil" />
      <button className="player__close" onClick={onClose} aria-label="Fermer le lecteur"><X /></button>
      <div className="player__center">
        <div className="player__loader"><span /></div>
        <p>{messages[media.id % messages.length]}</p>
        <small>Code WOUF-{String(media.id).padStart(3, '0')} · Réessayez après une gratouille.</small>
        <button className="button button--secondary" onClick={() => setProgress(2)}><RotateCcw />Réessayer</button>
      </div>
      <div className="player__controls">
        <div className="player__timeline"><i style={{ width: `${progress}%` }} /></div>
        <button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Lecture'}>{playing ? <Pause /> : <Play />}</button>
        <Volume2 /><strong>{media.title}</strong><span>{media.duration ?? 'S1 : E1 · Le flair du débutant'}</span><Maximize />
      </div>
    </section>
  )
}
