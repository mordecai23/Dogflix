export interface Profile {
  id: string
  name: string
  mood: string
  avatar: string
}

export const profiles: Profile[] = [
  { id: 'biscotte', name: 'Biscotte', mood: 'Voleur de chaussettes', avatar: '/assets/profiles/biscotte.avif' },
  { id: 'pepper', name: 'Pepper', mood: 'Critique très sévère', avatar: '/assets/profiles/pepper.avif' },
  { id: 'nacho', name: 'Nacho', mood: 'Team friandises', avatar: '/assets/profiles/nacho.avif' },
  { id: 'ursula', name: 'Ursula', mood: 'Canapé & réflexion', avatar: '/assets/profiles/ursula.avif' },
]
