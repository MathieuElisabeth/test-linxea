# Visualisateur d'Évolution d'Actions (test Linxea)

Une application pour visualiser l'évolution annuelle du cours des actions d'une entreprise créé dans le cadre d'un test technique.

## Technologies utilisées

- **React 19** : Dernière version avec les nouveaux hooks
- **TypeScript** : Typage strict et complet
- **Recharts** : Librairie de visualisation de données
- **Vite** : Build tool rapide
- **Vitest** : framework de test unitaire

## Installation et lancement

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Lancer les tests
npm run test

# Lancer les tests en mode watch
npm run test:ui
```

## Prompt utilisé

```
voici une liste d'entreprise avec leur action sur plusieurs années, fait moi une fonction en typescript pour récupérer toutes les entreprises
Voici la liste:
```

```
Peux tu m'expliquer ce qu'est le close et le volume ?
```

```
créé moi une fonction qui prend 2 paramètres: la liste de donnée et le nom d'une entreprise et qui me retourne toutes l'évolution de l'entreprise 
```

