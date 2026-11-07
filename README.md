# Dogflix

Dogflix est une plateforme de streaming parodique premium entièrement consacrée aux chiens. L’application contient 37 séries et 31 films, un écran de profils, une recherche instantanée, des filtres, une liste persistante, des carrousels, des fiches détaillées et un faux lecteur plein écran.

## Développement local

Prérequis : Node.js 20 ou supérieur et npm.

```bash
npm install
npm run dev
```

Vite affiche l’URL locale, généralement `http://localhost:5173`.

## Qualité et build

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run preview
```

Le site final est généré dans `dist/`. Toutes les données sont locales dans `src/data/catalog.ts` et tous les visuels sont servis depuis `public/assets/` ; aucun backend, compte ou secret n’est requis.

## Conteneur Docker

```bash
docker build -t dogflix .
docker run --rm -p 8080:8080 -e PORT=8080 dogflix
```

Ouvrir ensuite `http://localhost:8080`. Nginx applique la compression, un cache long aux assets et le fallback SPA vers `index.html`. Le conteneur expose aussi un healthcheck HTTP sur `/`.

## Déploiement Railway

1. Pousser ce dossier dans un dépôt GitHub.
2. Dans Railway, choisir **New Project → Deploy from GitHub repo** et sélectionner le dépôt.
3. Railway détecte `railway.json` et construit le `Dockerfile` automatiquement.
4. Générer un domaine dans **Settings → Networking**. Aucune variable d’environnement n’est nécessaire : Railway fournit `PORT`.

## Structure utile

- `src/data/catalog.ts` : les 68 œuvres et toutes leurs métadonnées.
- `src/components/` : composants réutilisables de l’interface.
- `public/assets/posters/` : les affiches verticales originales du catalogue.
- `source-assets/posters/` : les masters PNG et variantes conservés hors du build public.
- `public/assets/backdrops/` : trois panoramas originaux.
- `public/assets/profiles/` : quatre avatars canins.
- `nginx.conf.template`, `Dockerfile`, `railway.json` : déploiement statique Railway.

Le détail des crédits et la déclaration de parodie figurent dans [CREDITS.md](CREDITS.md).
