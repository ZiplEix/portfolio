---
title: Dotfile
description: A dotfile repo to easily setup a new MacOs or Linux based operating systeme
date: "18-08-2023"
categories:
  - "dotfile"
  - "configuration"
published: true
url: https://github.com/ZiplEix/dotfile
---

En deuxieme année d'étude, le nombre de machaine virtuel ou non (WSL2, VPS, différents PC, etc) que j'utilisais était devenu trop important pour que je puisse me permettre de perdre du temps à les configurer à chaque fois que je devais en créer une nouvelle. J'ai donc décidé de créer un repo git contenant l'ensemble de mes configurations et de les installer automatiquement à l'aide d'un script.

## Fonctionnalités

Le but de ce script est de pouvoir installer l'ensemble de mes configurations sur n'importe quel système d'exploitation Unix (MacOS, Linux, WSL) en une seule commande en ayant le minimum d'outil à installer au préalable, le seul prérequis étant `git` afin de pouvoir cloner le repo.

Ce projet se base sur [Dotbot](https://github.com/anishathalye/dotbot) pour l'installation et la gestion des différents dotfiles. Il utilise ensuite des script personalisé pour installer et configurer les différents outils qui ne peuvent pas être installé par l'installeur.

Pour plus de simplicité et de modularité le script utilise `Homebrew` pour installer et mettre à jour les différents outils. Cela permet d'utiliser un seul installeur pour plusieurs systèmes d'exploitation et de pouvoir facilement ajouter ou supprimer des outils à installer.

## Utilisation

Le script étant concu pour être extrêmement simple d'utilisation, il suffit de cloner le repo et d'executer le script d'installation.

```bash
git clone https://github.com/ZiplEix/dotfile.git ~/.dotfiles
cd ~/.dotfiles
./install
```

## Aller plus loin

Pour plus d'information sur le fonctionnement du script et sur la manière de l'utiliser, vous pouvez consulter le [README](https://github.com/ZiplEix/dotfile) du repo sur GitHub.

## Ce que j'ai appris

Ce projet m'a permis de découvrir et d'utiliser plusieurs outils et technologies que je n'avais jamais utilisé auparavant. J'ai également pu approfondir mes connaissances sur d'autres outils que j'utilisais déjà.

### Les dotfiles

Les dotfiles sont des fichiers de configuration qui sont utilisés par les différents outils et logiciels que nous utilisons au quotidien. Ils sont généralement cachés et stockés dans le dossier `~` de l'utilisateur et sont utilisés pour configurer les différents outils et logiciels que nous utilisons au quotidien afin de les configurés à notre guise.

### Dotbot

J'ai pu d"couvrir la grande communauté qui s'est construite autour de la configuration et l'automatisation des dotfiles. J'ai également pu découvrir et utiliser [Dotbot](https://github.com/anishathalye/dotbot), ce qui m'a permis de gagner beacoup de temps sur la configuration et de me concentrer sur l'installation des différents outils.
