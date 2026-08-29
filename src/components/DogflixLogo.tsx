interface Props { compact?: boolean }

export function DogflixLogo({ compact = false }: Props) {
  return (
    <span className={`logo ${compact ? 'logo--compact' : ''}`} aria-label="Dogflix">
      <span aria-hidden="true">D</span><span className="logo__rest">OGFLIX</span>
    </span>
  )
}
