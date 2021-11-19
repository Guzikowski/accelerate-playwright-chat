accelerate-playwright-chat

This project is testing project for using Playwright against the Discord server. Here are some notes on how to get started. 

VsCode Extension to make life easier
    ESLint
    Playwright Test for VSCode
        requires Test Explorer UI
    Playwright Test Runner (broken but still usable)
    Playwright Trace Viewer (will be obsolete in the next release)
    Prettier - Code formatter (not used but something to consider)
    
Commands to get started for new project:
    Open Vs Code
    Open New Terminal
    run command: npm i -D @playwright/test
    run command: npx playwright install
    run command: npm init playwright
    Add-ons:
    *** Used to have environment setup
    run command: npm i -D dotenv

Commands to get started for cloned project:
    Open Vs Code
    Open New Terminal
    run command: npm install
    run command: npx playwright install

Environment Setup:
    Create .env file in root folder and add:
        CONFIG_ENV_NAME=local

    Create .env.local file in the environments folder and add:
        CONFIG_NAME=local
        BASE_URL=
        CHAT_USER_NAME_1=
        CHAT_USER_PASSWORD_1=
        CHAT_USER_NAME_2=
        CHAT_USER_PASSWORD_2=

        ** Add values accordingly

    Both of these files will be in the .gitignore file and will not be persisted

Starting a new Test:
    Add a new folder under e2e
    Add a new test file and copy the contents of the template.spec.ts to start the file

Testing:
    npx playwright test "example.spec.ts"  
    npx playwright test "example.spec.ts"  --debug

Testing process:
   Record a test by running: 
   npx playwright test "newtest.spec.ts"  --debug
   Keep running until happy with workflow
   Run test live
   npx playwright test "newtest.spec.ts"
   Refactor until working

