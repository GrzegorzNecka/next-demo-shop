# next-demo-shop

## środowisko

-   System:
    -   OS: Windows 10 10.0.19043
-   Binaries:
    -   Node: 16.15.1
    -   Yarn: 1.22.17
    -   npm: 8.11.0
    -   git: 2.31.1.windows.1
-   Browsers:
    -   Brave
-   npmPackages:
    -   next: 12.3.1 => 12.3.1
    -   react: 18.2.0 => 18.2.0

## funkcjonalności

### koszyk

-   sesja koszyka dla klienta zalogowanego oraz niezalogowanego
-   podczas logowania dokonuje się przenisienie pozycji w koszyka od klienta nizalogowanego do koszyka dal klienta zalogowanego. Po ponownym wylogowaniu koszyk jet pusty dla klienta niezalogowanego
-   aktualizacja id koszyka w cookies, w sytuacji kiedy id zostanie usunięty na serwerze, a w pamięci podręcznej dalej istnieje

## git flow

[git-folw](https://frontstack.pl/praca-z-git-git-flow/)
[git-tag](https://stormit.pl/git-tag/#git-tag-tagowanie-w-git-add-push-checkout-wprowadzenie)
[prefixy](https://piecioshka.pl/blog/2019/03/23/husky-commitlint-git-changelog.html)

### branche

main – produkcyjna wersja aplikacji. Do tego brancha będziemy mergować tylko te zmiany, które już zostały wydane na produkcję oraz krytyczne hotfixy.
hotfix – jedyna gałąź bazująca ma masterze. To właśnie ona służy do szybkiego naprawiania krytycznych błędów występujących na produkcji.
release – na tym branchu przygotowywany jest release kolejnej wersji aplikacji. To właśnie wersja aplikacji z tego brancha trafia na produkcję.
develop – gałąź ta jest „nieoficjalnym” masterem podczas pracy nad releasem. Z tego brancha programiści tworzą swoje gałęzie robocze i do niego mergują (rebase-ują) swoją pracę. Gdy praca nad wszystkimi funkcjonalnościami w danym releasie jest gotowa, branch ten jest mergowany do gałęzi „release”.
gałęzie robocze (features) – na tych gałęziach pracujemy na co dzień i tworzymy nowe funkcjonalności.

### prefixy

feat(feature): ...
fix(bug fix): ...
docs(documentation): ...
style(formatting, missing semicolons): ...
refactor: ...
test(when adding missing tests): ...

## tips and ads

-   sipmle browser
-   better graphQl package -> [urql](https://formidable.com/open-source/urql/)
-   graphql-code-generator -> [link](https://www.the-guild.dev/graphql/codegen)

## błędy w konsoli

`Unchecked runtime.lastError: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received`
[topic](https://stackoverflow.com/questions/72494154/a-listener-indicated-an-asynchronous-response-by-returning-true-but-the-messag)
[opis problemu](https://www.chromium.org/Home/chromium-security/extension-content-script-fetches/)
