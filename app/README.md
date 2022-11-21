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

## pomysł na implementacje koszyka

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
