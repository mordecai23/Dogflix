import { Camera, Clapperboard, Music2, PawPrint } from 'lucide-react'

export function Footer() {
  return (
    <footer>
      <div className="footer__social"><a href="#top" aria-label="Photos"><Camera /></a><a href="#top" aria-label="Communauté"><PawPrint /></a><a href="#top" aria-label="Vidéos"><Clapperboard /></a><a href="#top" aria-label="DogTok"><Music2 /></a></div>
      <nav aria-label="Liens de pied de page">
        <a href="#aide">Audiodescription canine</a><a href="#aide">Centre d’aide</a><a href="#aide">Cartes friandises</a><a href="#aide">Presse à museau</a>
        <a href="#aide">Relations investisseurs</a><a href="#aide">Recrutement de bons chiens</a><a href="#aide">Conditions d’utilisation</a><a href="#aide">Confidentialité du panier</a>
        <a href="#aide">Préférences croquettes</a><a href="#aide">Mentions légales</a><a href="#aide">Nous contacter</a><a href="#aide">Vitesse de reniflage</a>
      </nav>
      <button className="service-code">Code de service : BON-CHIEN</button>
      <p>© 2026 Dogflix, Incroyablement poilu.</p>
      <p className="footer__disclaimer">Dogflix est une parodie indépendante. Aucun chien n’a été forcé à binge-watcher.</p>
    </footer>
  )
}
