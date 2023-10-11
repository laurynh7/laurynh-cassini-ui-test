# laurynh-cassini-ui-test

## About The Project
Test project testing the login and finance calendar for Yahoo.com.
Please note the login tests may fail due to reCaptcha.

### Built With

Built using TestCafe

## Getting Started

### Prerequisites

* node: https://nodejs.org/
* npm

### Installation

1. Clone the repo or download locally.
2. Open terminal in the main directory: 'laurynh-cassini-ui-test' folder
* Please ensure here you have npm installed with
   ```sh
   npm --version
   ``` 
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run tests from the command line with:
   ```sh
   testcafe chrome ./tests --skip-js-errors
   ```