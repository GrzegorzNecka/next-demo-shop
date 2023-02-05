# Next.js Demo Sjop

Next.js e-commerce

## 🧰 What This Includes

-   [Yarn](https://yarnpkg.com/en/)
-   [Next.js](https://nextjs.org/)
-   [Hygraph CMS](https://hygraph.com/docs)
-   [ApolloGraphQL](https://www.apollographql.com/docs/)
-   [Stripe](https://stripe.com/docs)

## 🚀 Getting Started

## 🍃 Envirolment

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

### Requirements

-   [Yarn](https://yarnpkg.com/en/)

### Quick Start

````
yarn create next-app -e https://github.com/GrzegorzNecka/next-demo-shop


### Running the Project
First, run the development server:

```bash
yarn dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Git

[Git-folw](https://frontstack.pl/praca-z-git-git-flow/)

### Branches

-   main – produkcyjna wersja aplikacji. Do tego brancha będziemy mergować tylko te zmiany, które już zostały wydane na produkcję oraz krytyczne hotfixy.
-   hotfix – jedyna gałąź bazująca ma masterze. To właśnie ona służy do szybkiego naprawiania krytycznych błędów występujących na produkcji.
-   release – na tym branchu przygotowywany jest release kolejnej wersji aplikacji. To właśnie wersja aplikacji z tego brancha trafia na produkcję.
-   develop – gałąź ta jest „nieoficjalnym” masterem podczas pracy nad releasem. Z tego brancha programiści tworzą swoje gałęzie robocze i do niego mergują (rebase-ują) swoją pracę. Gdy praca nad wszystkimi funkcjonalnościami w danym releasie jest gotowa, branch ten jest mergowany do gałęzi „release”.
-   feature/nazwa – na tych gałęziach pracujemy na co dzień i tworzymy nowe funkcjonalności.

### Prefixes

-   feat(feature): ...
-   fix(bug fix): ...
-   docs(documentation): ...
-   style(formatting, missing semicolons): ...
-   refactor: ...
-   test(when adding missing tests): ...
