import { useEffect, useMemo, useState } from 'react'
import { catalog } from './data/catalog'
import { filterCatalog, initialListIds, searchCatalog } from './lib/catalog'
import type { Media, View } from './types'
import { DetailsModal } from './components/DetailsModal'
import { FakePlayer } from './components/FakePlayer'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HeroBanner } from './components/HeroBanner'
import { MediaRow } from './components/MediaRow'
import { MediaCard } from './components/MediaCard'
import { ProfileGate } from './components/ProfileGate'
import { profiles, type Profile } from './data/profiles'
import { SearchPanel } from './components/SearchPanel'

const rows: Array<{ title: string; eyebrow?: string; ids: number[]; ranked?: boolean }> = [
  { title: 'La collection Paloma', eyebrow: '5 FILMS · UNE HÉROÏNE', ids: [69, 70, 71, 72, 73] },
  { title: 'Tout juste sortis de la niche', eyebrow: `${catalog.length - 40} NOUVEAUTÉS`, ids: catalog.slice(40).map((item) => item.id) },
  { title: 'Tendances actuelles', eyebrow: 'ÇA FAIT ABOYER', ids: [8, 21, 1, 38, 5, 36, 34, 3, 32, 13], ranked: true },
  { title: 'Les plus reniflées aujourd’hui', ids: [16, 6, 22, 33, 2, 10, 18, 35, 27, 20] },
  { title: 'Séries à dévorer', ids: [12, 3, 19, 9, 15, 7, 14, 11, 17, 4] },
  { title: 'Blockbusters à quatre pattes', ids: [32, 35, 24, 39, 40, 29, 23, 28, 34, 22] },
  { title: 'Parce que vous avez regardé Jurassic Bark', eyebrow: 'VOTRE FLAIR A AIMÉ', ids: [21, 30, 38, 39, 12, 8, 22, 24, 28, 31] },
  { title: 'Comédies qui donnent la patte', ids: [16, 15, 36, 31, 10, 28, 40, 23, 20, 35] },
  { title: 'Univers sombres, museaux humides', ids: [19, 34, 4, 26, 37, 9, 11, 8, 2, 27] },
]

const filmCount = catalog.filter((item) => item.type === 'film').length
const seriesCount = catalog.filter((item) => item.type === 'serie').length

const viewTitles: Record<Exclude<View, 'home'>, { eyebrow: string; title: string; copy: string }> = {
  serie: { eyebrow: `${seriesCount} SÉRIES · BEAUCOUP DE SAISONS CHIEN`, title: 'Séries à dévorer', copy: 'Des épisodes soigneusement classés par odeur et par niveau de canapé détruit.' },
  film: { eyebrow: `${filmCount} FILMS · ${filmCount * 2} OREILLES EN MOYENNE`, title: 'Films pour toute la meute', copy: 'Grand spectacle, petits chiens et génériques que personne ne saute.' },
  new: { eyebrow: 'TOUT FRAIS · PAS ENCORE RENIFLÉ', title: 'Nouveautés', copy: 'Les dernières productions sorties tout droit de la niche de montage.' },
  list: { eyebrow: 'VOTRE TERRITOIRE', title: 'Ma liste', copy: 'Les œuvres que vous avez marquées d’un discret coup de patte.' },
}

function readProfile(): Profile | null {
  try { const id = localStorage.getItem('dogflix-profile'); return profiles.find((profile) => profile.id === id) ?? null } catch { return null }
}

function readList(): number[] {
  try {
    const raw = localStorage.getItem('dogflix-list')
    return raw ? (JSON.parse(raw) as number[]) : initialListIds
  } catch { return initialListIds }
}

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(readProfile)
  const [listIds, setListIds] = useState<number[]>(readList)
  const [view, setView] = useState<View>('home')
  const [selected, setSelected] = useState<Media | null>(null)
  const [playing, setPlaying] = useState<Media | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 650); return () => window.clearTimeout(timer) }, [])
  useEffect(() => { try { localStorage.setItem('dogflix-list', JSON.stringify(listIds)) } catch { /* préférence non persistée */ } }, [listIds])

  const toggleList = (id: number) => setListIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const selectProfile = (next: Profile) => { setProfile(next); try { localStorage.setItem('dogflix-profile', next.id) } catch { /* navigation privée */ } }
  const setActiveView = (next: View) => { setView(next); setSearchOpen(false); setQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const filtered = useMemo(() => filterCatalog(view, listIds), [view, listIds])
  const searchResults = useMemo(() => searchCatalog(query), [query])
  const hero = catalog[0]

  if (!profile) return <ProfileGate onSelect={selectProfile} />

  return (
    <div id="top" className="app-shell">
      {loading && <div className="boot-loader" aria-label="Chargement de Dogflix"><div className="boot-loader__logo">D</div><p>On renifle le catalogue…</p></div>}
      <Header activeView={view} profile={profile} searchOpen={searchOpen} onView={setActiveView} onSearch={() => setSearchOpen((open) => !open)} onSwitchProfile={() => { localStorage.removeItem('dogflix-profile'); setProfile(null) }} />
      {searchOpen ? (
        <SearchPanel query={query} results={searchResults} listIds={listIds} onQuery={setQuery} onClose={() => { setSearchOpen(false); setQuery('') }} onOpen={setSelected} onPlay={setPlaying} onToggleList={toggleList} />
      ) : view === 'home' ? (
        <main>
          <HeroBanner media={hero} inList={listIds.includes(hero.id)} onInfo={() => setSelected(hero)} onPlay={() => setPlaying(hero)} onToggleList={() => toggleList(hero.id)} />
          <div className="rows-wrap">
            {rows.map((row) => <MediaRow key={row.title} title={row.title} eyebrow={row.eyebrow} items={row.ids.map((id) => catalog[id - 1])} listIds={listIds} ranked={row.ranked} onOpen={setSelected} onPlay={setPlaying} onToggleList={toggleList} />)}
            <MediaRow title="Ma liste" eyebrow="À GARDER SOUS LA PATTE" items={catalog.filter((item) => listIds.includes(item.id))} listIds={listIds} onOpen={setSelected} onPlay={setPlaying} onToggleList={toggleList} />
          </div>
        </main>
      ) : (
        <main className="catalog-view">
          <div className="catalog-view__heading">
            <p className="eyebrow">{viewTitles[view].eyebrow}</p><h1>{viewTitles[view].title}</h1><p>{viewTitles[view].copy}</p>
          </div>
          {filtered.length ? (
            <div className="catalog-grid">{filtered.map((media) => <MediaCard key={media.id} media={media} listIds={listIds} onOpen={setSelected} onPlay={setPlaying} onToggleList={toggleList} />)}</div>
          ) : (
            <div className="empty-state"><span>🦴</span><h2>Votre liste attend sa première friandise</h2><p>Ajoutez un titre avec le bouton +. Promis, il ne mord pas.</p><button className="button button--primary" onClick={() => setActiveView('home')}>Retour à l’accueil</button></div>
          )}
        </main>
      )}
      {!searchOpen && <Footer />}
      {selected && <DetailsModal media={selected} inList={listIds.includes(selected.id)} onClose={() => setSelected(null)} onPlay={() => { setPlaying(selected); setSelected(null) }} onToggleList={() => toggleList(selected.id)} />}
      {playing && <FakePlayer media={playing} onClose={() => setPlaying(null)} />}
    </div>
  )
}
