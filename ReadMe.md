# Playwright Project

This is a Playwright project for end-to-end testing of web application to the code challenge for Jobcity

## Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x) or yarn (>= 1.x)

## Installation

# First of all

Must clone the proyect

```
git clone https://github.com/ivo692009/Jobcity-Challenge
```

Install dependencies:

```
npm install
```
    
# or
```
yarn install
```

# THEN

Execute the install of the browsers to execute all tests

```
npx playwright install
```

If needs more permisions, execute the next command on Linux

```
sudo npx playwright install-deps
```

## Running Tests

To run all tests:

```
npx playwright test
```

To run all tests and show the report:

```
npm run test:report
```

To see the last report

```
npx playwright show-report
```

To run all test with the UI, use this command:

```
npx playwright test --ui
```

## Links to the spreadsheet and Trello

Spreadsheet:
https://docs.google.com/spreadsheets/d/1fLDxcdibwjdP3Y3p3Vj-oUhjwvt6B7dfnQppZV5QLOQ/edit?usp=sharing

Trello:
https://trello.com/b/mylEb1P4/qa-board
