# obibok - contributing

## Branch model

Repozytorium używa modelu [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html). Programy takie jak: [GitKraken](https://www.gitkraken.com/), czy [SourceTree](https://www.sourcetreeapp.com/) ułatwiają pracę w GitFlow.

## Commit message convention

Wiadomości commitów muszą przestrzegać zasad: [AngularJS commit conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153). Pozwala to zachować porządek w zarządzaniu wersji kodu.

## Udostępnianie swoich zmian do repozytorium obibok

1. Zrób [Fork](https://help.github.com/articles/fork-a-repo/) projektu
2. Skonfiguruj i uruchom aplikację w trybie deweloperskim. W [README](README.md) opisane jest jak skonfigurować i uruchomić aplikację w swoim środowisku.
3. Stwórz swój branch (`git checkout -b my-new-branch`)
4. Zacommituj zmiany (`git commit -am "feat(...): ..."`)
5. Pushnij na branch (`git push origin my-new-branch`)
6. [Stwórz nowy Pull Request](https://help.github.com/articles/creating-a-pull-request/)