#!/usr/bin/env sh

set -e

npm run build
 
cd dist
cp index.html 404.html

git init -b master
git add .
git commit -m 'deploy'
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages
git push -f git@github.com:ccbobs13/vue-dashboard.git master:gh-pages

cd -