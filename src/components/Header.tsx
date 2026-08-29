import { Bell, ChevronDown, Menu, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Profile } from '../data/profiles'
import type { View } from '../types'
import { DogflixLogo } from './DogflixLogo'

interface Props {
  activeView: View
  profile: Profile
  searchOpen: boolean
  onView: (view: View) => void
  onSearch: () => void
  onSwitchProfile: () => void
}

const links: Array<{ label: string; view: View }> = [
  { label: 'Accueil', view: 'home' }, { label: 'Séries', view: 'serie' }, { label: 'Films', view: 'film' },
  { label: 'Nouveautés', view: 'new' }, { label: 'Ma liste', view: 'list' },
]

export function Header({ activeView, profile, searchOpen, onView, onSearch, onSwitchProfile }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className={`header ${scrolled ? 'header--solid' : ''}`}>
      <button className="mobile-menu" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
      <button className="logo-button" aria-label="Accueil" onClick={() => onView('home')}><DogflixLogo compact /></button>
      <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Navigation principale">
        {links.map((link) => (
          <button key={link.view} className={activeView === link.view ? 'active' : ''} onClick={() => { onView(link.view); setMenuOpen(false) }}>
            {link.label}
          </button>
        ))}
      </nav>
      <div className="header__actions">
        <button className="icon-button" aria-label={searchOpen ? 'Fermer la recherche' : 'Rechercher'} onClick={onSearch}>
          {searchOpen ? <X /> : <Search />}
        </button>
        <button className="icon-button header__bell" aria-label="Notifications"><Bell /><span className="notification-dot" /></button>
        <button className="profile-switcher" onClick={onSwitchProfile} aria-label={`Changer de profil, profil actuel ${profile.name}`}>
          <img src={profile.avatar} alt="" /><ChevronDown />
        </button>
      </div>
    </header>
  )
}
