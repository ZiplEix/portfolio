---
title: Goly
description: Ume application web de réduction d'url
date: "30-10-2022"
categories:
  - "Web App"
  - "Go"
  - "API"
  - "svelte"
published: true
url: https://github.com/ZiplEix/gloy
---

Goly est un raccourcisseur d'URL simple et rapide, écrit en `Go`. Il a été conçu comme un projet d'apprentissage pour découvrir ce qu'est une `API` et comment en créer une en Go. C'est à la fois mon premier projet web full-stack (frontend + backend) et ma première expérience avec une API. Il est donc possible que le code ne soit pas très propre et que certaines choses ne soient pas implémentées de la manière la plus optimale.

Le projet n'est pas hébergé, mais vous pouvez le cloner et le lancer localement.

## Le Frontend

Étant donné que l'objectif de ce projet n'était pas de passer trop de temps sur le frontend, je ne vais pas m'attarder sur cette partie. Il est écrit en `Svelte`, car je n'ai pas jugé nécessaire d'utiliser SvelteKit pour un site d'une seule page, et je n'étais pas familier avec SvelteKit à l'époque. Le CSS est minimaliste, juste ce qu'il faut pour ne pas agresser les yeux.

## Le Backend

Le backend est au cœur de ce projet, conçu pour apprendre à créer un backend et améliorer mes compétences en Go.

### L'API

L'API est écrite en Go. J'ai utilisé la bibliothèque [`Fiber`](https://github.com/gofiber/fiber). Elle est très bien documentée et en raison de sa grande similarité avec ExpressJS, que j'avais déjà un peu utilisé, elle est très facile à prendre en main.

Fiber est construit sur Fasthttp, le moteur HTTP le plus rapide pour Go, ce qui le rend très performant. Il est également très simple de créer des middlewares avec Fiber, ce qui est très pratique pour l'authentification (mais cela reste un projet futur).

### La Base de Données

Pour la base de données, j'ai utilisé le classique `PostgreSQL` qui tourne dans un conteneur Docker pour plus de simplicité. J'ai découvert Docker à l'époque et je n'étais pas familier avec les Dockerfiles, il faut donc la lancer avec cette commande :

```bash
sudo docker run --name auth-psql -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=test -d postgres:14
```

### L'ORM

Pour plus de simplicité et surtout pour éviter de rédiger des requêtes `SQL` manuellement, j'ai décidé d'utiliser un `ORM`. D'après mes recherches, `Gorm` semble faire l'unanimité, c'est pourquoi je l'ai choisi. Il est très simple à prendre en main et permet de rédiger des requêtes très facilement. De plus, il est très bien documenté.

## Conclusion

En résumé, Goly dépasse largement le simple rôle de raccourcisseur d'URL. Il résulte d'une expérience d'apprentissage stimulante, au cours de laquelle j'ai plongé dans l'univers de la création d'API en utilisant Go, tout en enrichissant mes compétences en tant que développeur Go & full-stack.
