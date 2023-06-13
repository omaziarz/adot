# Exo recrutement Adot

## Comment lancer le projet

### Installation

```bash
npm install
```

### Dev

```bash
npm run dev
```

### Production

```bash
npm run build
npm run start
```

### Test

```bash
npm run test
```

## Description

Le csv est load en mémoire avant le lancement du serveur.

Le serveur expose une unique route :

- POST /poi

Elle calcule les stats des évènements situé à moins de 500m des inputs par défaut.
La valeur peut être modifiée en spécifiant une variable d'environnement `THRESHOLD` (en mètres).

On peut aussi spécifiér une variable d'environnement `PORT` (3000 par défaut) pour changer le port d'écoute du serveur.

exemple :

```bash
npm run build
THRESHOLD=1000 PORT=3010 npm run start
```

Il lui faut un body de ce type:

```json
[
  {
    "name": "string",
    "lat": "number",
    "lon": "number"
  }
]
```

Il n'y a pas de validation sur les inputs.

Il retourne un tableau de Point of Interest avec les stats des évènements.

```json
[
  {
    "name": "string",
    "lat": "number",
    "lon": "number",
    "impressions": "number",
    "clicks": "number"
  }
]
```
