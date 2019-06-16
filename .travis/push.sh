#!/bin/bash

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
  git remote add origin-obibok https://${GH_TOKEN}@github.com/and-end/obibok.git > /dev/null 2>&1
}

pull_files() {
  git pull origin-obibok continuous-integration/travis-ci --rebase
  git pull origin-obibok master --rebase
}

commit_website_files() {
  git add .
  git checkout continuous-integration/travis-ci
  git commit --message "ci(style): lint and format files"
}

upload_files() {
  git push --set-upstream origin-obibok
}

setup_git
pull_files
commit_website_files
upload_files
