---
title: Portfolio
description: My portfolio website
date: "21-12-2023"
categories:
  - "portfolio"
  - "svelte"
published: true
url: https://github.com/ZiplEix/portfolio
---

<script>
  import Counter from './counter.svelte';
</script>

Bienvenue sur le premier articles de ce blog. Cet articles est là pour faire le du propriétaire ainsi que servir de de dev log et de demonstration/documentaion de ce que peux faire ce blog.

## Le propriétaire

Je m'appelle **Baptiste** et je suis développeur. Je suis passionné par les langages bas niveau (principalement le C, le Go et un peu de C++ pour passer le temps). Je me permet aussi de faire un peu de web, surtout du backend, et part de temps en temps en enfer faire un peu de front end (comme vous pouvez le voir sur ce site ce n'est pas mon fort).

## Le portfolio

Comme tout bon developpeur qui se respecte je me devais d'avoir un portfolio. J'ai donc décidé de faire un site en SvelteKit (un framework front end) pour montrer mes projets ainsi que mon CV. Ce site est disponible sur [mon github](https://github.com/ZiplEix/portfolio).

## Pourquoi svelte ?

Après avoir testé React, Vue et Svelte, j'ai décidé de faire mon site en Svelte. Pourquoi ? Car Svelte est un framework qui compile le code en vanilla JS, ce qui permet d'avoir un site plus léger et plus rapide. De plus, Svelte est un framework qui est très simple à prendre en main,  très agréable à utiliser et qui permte une gestion des états très simple et intuitive.

## Spécifications techniques

### Hébergement

Initialement, j'avais l'intention de l'héberger sur mon propre serveur VPS et de l'exposer via `CapRover`. Cependant, j'ai rencontré un obstacle lorsque mon VPS n'avait pas suffisamment de RAM pour générer le site. J'ai donc décidé d'explorer une autre approche en construisant une `image Docker` dans le cadre d'une `action GitHub`, puis en la téléchargeant sur `Docker Hub` pour ensuite la récupérer sur mon VPS. Bien que cette solution ait fonctionné, elle a soulevé des problèmes liés aux variables d'environnement. Plus précisément, `Vite` refusait de prendre en compte les variables d'environnement configurées sur CapRover. Finalement, après avoir pesé le pour et le contre, j'ai choisi la voie de la facilité en optant pour l'hébergement sur Vercel.

### Gestion des articles du blog

Dans la première itération de mon portfolio, j'avais envisagé de créer une `API` pour stocker les articles au format HTML, avec l'idée de les récupérer à chaque chargement de page via une requête `HTTP` pour ensuite les évaluer et les afficher. Cependant, j'ai rapidement découvert que SvelteKit offrait une fonctionnalité permettant de générer des pages statiques à partir de fichiers `Markdown`.

Cela a résolu une partie du problème, mais la question du stockage des articles demeurait. Il s'est avéré que la solution consistant à stocker les articles en format Markdown dans une base de données accessible via une API n'était pas pratique. J'ai donc opté pour une approche différente en stockant les articles directement dans le dépôt GitHub de mon projet. Pour récupérer le contenu des fichiers Markdown, j'ai utilisé la fonctionnalité "raw content" de GitHub.

Pour faciliter le processus, j'ai créé un fichier texte à la racine du projet dans lequel j'ai enregistré les liens vers chaque article ainsi que leur titre. L'API interne du site peut ainsi analyser ce fichier et générer les pages statiques correspondantes. Pour automatiser la mise à jour du site, j'ai mis en place une action GitHub. À chaque push sur la branche principale (main) du dépôt, cette action télécharge les articles, les stocke dans le dossier `src/posts` du projet, puis les pousse à nouveau sur le dépôt. Cela permet de maintenir le site constamment à jour, sans nécessiter de mises à jour manuelles.

En ce qui concerne les articles qui ne sont pas liés à un projet spécifique, ils peuvent être stockés de différentes manières, du moment qu'il est possible d'en extraire le contenu en utilisant un simple lien.

### Interprétation du Markdown

Pour l'interprétation du Markdown, j'ai choisi d'utiliser le package `mdsvex`, qui permet de convertir le Markdown en HTML. Cependant, j'ai rencontré un défi avec ce package : il ne permettait pas d'ajouter des classes aux balises HTML générées. Pour résoudre ce problème, j'ai trouvé une solution en utilisant d'abord le package `remark` pour transformer le Markdown en HTML, puis en employant `rehype` pour ajouter les classes nécessaires aux balises HTML, me permettant ainsi de personnaliser le style des articles du blog selon mes préférences.

En ce qui concerne l'intégration des blocs de code dans les articles, j'ai opté pour le package `shiki`, qui offre la possibilité de coloriser le code en appliquant des thèmes inspirés de `VS Code`. Cette approche s'est avérée pratique et polyvalente, donnant un rendu visuel très convaincant, très proche de ce que l'on peut obtenir dans un environnement de développement intégré (IDE) :

```c
#include <stdio.h>

int main(void)
{
    printf("Hello World\n");
    return 0;
}
```

## Intégration de composent svelte en markdown

Lors de la génération de la page static, le contenu markdown est converti en HTML puis est intéprété par svelte en tant que composent. Ce qui permet d'intégré d'autre composant svelte dans le markdown très facilement. Il suffit de faire un import du composent dans le fichier markdown et de l'utiliser comme n'importe quel autre composent svelte. C'est contre intuitif au début mais ca fonctionne très. La seul limitatation est que le composant svelte doit être présent dans le projet pour pouvoir être utilisé.

Voici donc une liste des différents composant qu'il est possible d'utiliser dans le markdown :

### Counter

- Localisation : `./counter.svelte`
- Description : Un simple compteur qui s'incremente à chaque clique sur le bouton.
- Nom du composent : `Counter`

Rendu :

<Counter />

Contenue du fichier markdown :

```md
<script>
  import Counter from './counter.svelte';
</script>

<Counter />
```

## Conclusion

En résumé, la création de mon site portfolio est une aventure fascinante et instructive. En tant que développeur passionné, j'e veux présenter mes projets et mon CV de manière professionnelle et esthétique. Pour ce faire, j'ai choisi d'utiliser le framework SvelteKit, qui s'est avéré être un excellent choix en raison de sa légèreté, de sa rapidité et de sa simplicité d'utilisation.

Au fil du processus de développement, j'ai dû résoudre divers défis techniques, notamment l'hébergement de mon site. Après avoir envisagé différentes options, j'ai finalement opté pour Vercel, une plateforme d'hébergement qui s'est avérée efficace et pratique pour mes besoins.

La gestion des articles de blog a également été un point clé de ce projet. Grâce à SvelteKit, j'ai pu générer des pages statiques à partir de fichiers Markdown, simplifiant ainsi considérablement la publication de nouveaux articles. En stockant ces articles directement dans le dépôt GitHub de mon projet, j'ai pu automatiser le processus de mise à jour et maintenir le site constamment à jour, sans tracas.

En ce qui concerne l'interprétation du Markdown, l'utilisation de packages comme mdsvex, remark, et rehype m'a permis de personnaliser le style des articles du blog selon mes préférences, en ajoutant des classes aux balises HTML générées. De plus, l'intégration de blocs de code avec le package shiki a donné un résultat visuel professionnel et esthétique, offrant une expérience de lecture agréable aux visiteurs du site.

Enfin, l'intégration de composants Svelte dans le Markdown a ouvert de nouvelles possibilités de personnalisation, facilitant l'ajout de fonctionnalités interactives aux articles. Bien que cela puisse sembler contre-intuitif au début, cette approche s'est avérée être un atout majeur pour enrichir le contenu de manière dynamique.

En somme, la création de mon site portfolio en utilisant SvelteKit a été une expérience enrichissante qui a combiné mes compétences en développement avec ma passion pour le web. J'espère que ce portfolio continuera à évoluer et à inspirer d'autres passionnés de technologie à créer leurs propres espaces en ligne pour partager leur travail et leurs idées. Merci de m'avoir suivi dans cette aventure, et n'hésitez pas à explorer mon site pour découvrir mes projets et articles.

👋
