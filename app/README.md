# next-demo-shop

## tasks

-   obsługa koszyka dla niezlogowanych
-   eroror network
-   use memo use callback
-   [useMemo w context](https://kattya.dev/articles/2021-04-17-fixing-re-renders-when-using-context-in-react/)

## envirolment

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

## tips and ads

-   sipmle browser
-   better graphQl package -> [urql](https://formidable.com/open-source/urql/)
-   graphql-code-generator -> [link](https://www.the-guild.dev/graphql/codegen)

<<<<<<< HEAD
## pomysł na implementacje koszyka

=======
## git - prefixy

feat(feature): ...
fix(bug fix): ...
docs(documentation): ...
style(formatting, missing semicolons): ...
refactor: ...
test(when adding missing tests): ...

[prefixy](https://piecioshka.pl/blog/2019/03/23/husky-commitlint-git-changelog.html)

## git flow

main – produkcyjna wersja aplikacji. Do tego brancha będziemy mergować tylko te zmiany, które już zostały wydane na produkcję oraz krytyczne hotfixy.
hotfix – jedyna gałąź bazująca ma masterze. To właśnie ona służy do szybkiego naprawiania krytycznych błędów występujących na produkcji.
release – na tym branchu przygotowywany jest release kolejnej wersji aplikacji. To właśnie wersja aplikacji z tego brancha trafia na produkcję.
develop – gałąź ta jest „nieoficjalnym” masterem podczas pracy nad releasem. Z tego brancha programiści tworzą swoje gałęzie robocze i do niego mergują (rebase-ują) swoją pracę. Gdy praca nad wszystkimi funkcjonalnościami w danym releasie jest gotowa, branch ten jest mergowany do gałęzi „release”.
gałęzie robocze (features) – na tych gałęziach pracujemy na co dzień i tworzymy nowe funkcjonalności.

[git-folw](https://frontstack.pl/praca-z-git-git-flow/)
[git-tag](https://stormit.pl/git-tag/#git-tag-tagowanie-w-git-add-push-checkout-wprowadzenie)

## pomysł na implementacje koszyka

da się pobrać ciasteczko podczas logowania przez next auth ? przy wylogowanym użytkowniku obsługuję koszyk przez api route .. token z id użytkownika tworzę i zapisuję w cookies .... kiedy użytkownik jest zalogowany to pobieram dane z serwera , jak w kursie ..
chciałem obsłużyć przeniesienie koszyka z niezalogowanego stanu na zalogowany w taki sposób, że przy logowaniu, w pliku [...nextauth], w callbacku signIn() pobieram koszyk, wysyłam na serwer i usówma w api route

### token w cookies

[jak ogarnąć cookies](https://ohmydev.pl/post/zapewne-robisz-to-zle-czyli-token-jwt-na-frontendzie-50e7)
[next - cookies](https://maxschmitt.me/posts/next-js-cookies/)
>>>>>>> fd4ff3747d18061700f83e8922bcf448351631ea
pytanie czy da sięto zapisywać w local storage czy może należ yto zrobić w cookies

### klient nr 1 - użytkownik niezalogowany

    1. pierwsza wizyta - sprawdzam localStorage
        1.1. jeśli istnieje ID to je pobieram, a nastepnie pobieram CartItemsTemporary z serwera
        1.2. jeśli nie ma ID tworzę nowy CartItemsTemporary a jego id zapisuję w local storage

### klient nr 1 - użytkownik rejestracja

    2. rejestracja użytkownika - sprawdzam localStorage
        2.1. jeśli istnieje ID w local storage to:
            2.1.1 pobieram elementy z CartItemsTemporary
            2.1.2 tworzę CartItems, nadpisuję local sotrage jego ID i dodaję do niego elementy z CartItemsTemporary
            2.1.3 nadpisuję local sotrage jego ID i dodaję do niego elementy z CartItemsTemporary
            2.1.4 usówam dotychczasowe CartItemsTemporary

### klient nr 1 - użytkownik logowanie

    3. podczas logowania:
        3.1 łączę konto z cart przez maila i pobieram ID
        3.2 sprawdzam aktualizuję ID z CartItem w local storage

### klient nr 1 - czyszczenie pamięci przeglądarki

    1. sprawdzam localStorage - tworzę nowy CartItemsTemporary a jego ID zapisuję w local storage
    2. loguję się:
        2.1 jesli koszyk nie jest pusty, to napdisuję cartItems elementami z CartitemasTemporary
        2.2 usówam CartItemsTemporary
        2.3 nadpisuję local storage właściwym ID

### klient nr 2 - użytkownik niezalogowany na innej przeglądarce

    1. pierwsza wizyta - sprawdzam localStorage
        1.1. jeśli istnieje ID to je pobieram, a nastepnie pobieram CartItemsTemporary z serwera
        1.2. jeśli nie ma ID tworzę nowy CartItemsTemporary a jego ID zapisuję w local storage

### klient nr 2 - użytkownik logowanie

    2. jesli koszyk nie jest pusty, to napdisuję cartItems elementami z CartitemasTemporary
    3. usówam CartItemsTemporary
    4. nadpisuję local storage właściwym ID

---

```
{
  "product": {
    "productOptionId": "cl9lewa6nggtc09ueqfsjarb9",
    "price": 1999,
    "title": "Unisex Long Sleeve Tee",
    "quantity": 1,
    "imgUrl": "https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz",
    "slug": "unisex-long-sleeve-tee"
  },
  "cartItem": [
    {
      "itemId": "cl9wt0fc9229u0ct7znu8zani",
      "quantity": 11,
      "price": 1999,
      "title": "Unisex Long Sleeve Tee",
      "imgUrl": "https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz",
      "slug": "unisex-long-sleeve-tee",
      "productOptionId": "cl9lewa6nggtc09ueqfsjarb9"
    },
    {
      "itemId": "clal3y48wqvub0bt20vq1ojdh",
      "quantity": 1,
      "price": 1999,
      "title": "Unisex Long Sleeve Tee",
      "imgUrl": "https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz",
      "slug": "unisex-long-sleeve-tee",
      "productOptionId": "cl9lex90xg1s00auss1yhx1lz"
    }
  ]
}

```
