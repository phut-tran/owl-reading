<h1 align="center">Welcome to owl-reading 👋</h1>
<p>
  <a href="https://github.com/phut-tran/owl-reading/actions/workflows/development.yml" alt="test status">
  <img src="https://github.com/phut-tran/owl-reading/actions/workflows/development.yml/badge.svg" />
  </a>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://choosealicense.com/licenses/mit/" target="_blank">
    <img alt="License: MIT License" src="https://img.shields.io/badge/License-MIT License-yellow.svg" />
  </a>
  <a href="https://twitter.com/tdphut" target="_blank">
    <img alt="Twitter: tdphut" src="https://img.shields.io/twitter/follow/tdphut.svg?style=social" />
  </a>
</p>

> E-reader for English learner.

ESL students often learn new vocabularies through reading. But they have to save
the wordlist in one place and import it to another tool for learning (recall it)
later. Isn't it pleased if there is a tool to help them both read and learn new
words in one place? Owl-Reading was born for that purpose.

## Features

- Add new, edit, remove, and read the document using a rich text editor.
- Lookup for new words, get translations for them.
- Recall saved words using the spaced-repetition technique.

### ✨ [Demo](https://phut-tran.github.io/owl-reading/)

![Demo image](/src/images/owl-reading-demo.gif)

## Install

Clone this project.

```sh
git clone https://github.com/phut-tran/owl-reading.git
```

Install dependencies.

```sh
cd owl-reading.
npm install
```

## Usage

To run it locally.

```sh
npm run start
```

## Run tests

To run unit tests with jest.

```sh
npm run test
```

To run end-to-end test with cypress

```sh
npx cypress open
```

## Dependencies

This project was made possible by these excellent libraries:

- [Create React App](https://create-react-app.dev/).
- [Mui](https://mui.com/) - "React UI tools".
- [Draft-js](https://draftjs.org/) - "Rich Text Editor Framework for React".
- [Dexie](https://dexie.org/) - "A Minimalistic Wrapper for IndexedDB".
- [Jest](https://jestjs.io/) - Unit tests.
- [Cypress](https://www.cypress.io/) - End-to-end test.
- [(SM2) algorithm for spaced based repetition flashcards.](https://github.com/Maxvien/supermemo)
- [Translate text](https://github.com/franciscop/translate)

## TODO

- [ ] Improve landing page.
- [ ] Edit, remove flashcard.
- [ ] View word definition in word form.
- [ ] Improve readability for reading page.
- [ ] Imports document from pdf file, URL.
- [ ] Write CONTRIBUTE.md

---

_This README was generated with ❤️ by
[readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
