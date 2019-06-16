#!/bin/bash

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git add .
  git checkout continuous-integration/travis-ci
  git commit --message "ci(style): lint and format files"
}

upload_files() {
  git remote add origin-obibok https://${GH_TOKEN}@github.com/and-end/obibok.git > /dev/null 2>&1
  git push --set-upstream origin-obibok
}

setup_git
commit_website_files
upload_files