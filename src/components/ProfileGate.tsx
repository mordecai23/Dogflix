import { DogflixLogo } from './DogflixLogo'
import { profiles, type Profile } from '../data/profiles'

interface Props { onSelect: (profile: Profile) => void }

export function ProfileGate({ onSelect }: Props) {
  return (
    <div className="profile-gate" data-testid="profile-gate">
      <DogflixLogo />
      <main className="profile-gate__content">
        <p className="eyebrow">QUI TIENT LA TÉLÉCOMMANDE ?</p>
        <h1>Qui regarde ?</h1>
        <p className="profile-gate__subtitle">Choisissez votre museau. Les recommandations sont calibrées au flair.</p>
        <div className="profiles">
          {profiles.map((profile) => (
            <button className="profile" key={profile.id} onClick={() => onSelect(profile)}>
              <img src={profile.avatar} width="240" height="240" alt="" />
              <strong>{profile.name}</strong>
              <span>{profile.mood}</span>
            </button>
          ))}
        </div>
        <button className="profile-gate__manage">Gérer les museaux</button>
      </main>
    </div>
  )
}
