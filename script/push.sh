#!/bin/bash

git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"

if [ -n "$(git status --porcelain)" ]; then
    git add src/posts/*
    git commit -m "[ADD] new articles"
    git push
else
    echo "Aucune modification à commettre."
fi
