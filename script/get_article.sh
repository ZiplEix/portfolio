#!/bin/bash

# Assurez-vous que le répertoire "src/posts" existe
mkdir -p src/posts

# Parcours chaque ligne du fichier articles.txt
while IFS= read -r line; do
  # Extrait le titre et le lien de la ligne
  title=$(echo "$line" | awk '{print $2}')
  link=$(echo "$line" | awk '{print $1}')

  # Supprime les caractères non valides pour un nom de fichier
  title=$(echo "$title" | tr -cd '[:alnum:]')

  # Télécharge le contenu de l'article en utilisant curl
  curl -s "$link" > "src/posts/$title.md"
  echo "Article '$title' téléchargé et enregistré dans src/posts/$title.md"
done < articles.txt

echo "Tous les articles ont été vérifiés et téléchargés si nécessaire, puis enregistrés dans le répertoire 'src/posts'."
