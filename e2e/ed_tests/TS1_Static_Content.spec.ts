import { test, expect } from "@playwright/test"
import { SetupEnvironment } from "../../environments/SetupEnvironment"

test.describe('Test Scenario', () => {

    let pageUrl: string;
    let userName1: string;
    let userPassword1: string;
    let userName2: string;
    let userPassword2: string;

    test.beforeAll(async ( ) => {
        SetupEnvironment.initialise();
        pageUrl = process.env.BASE_URL;
        userName1 = process.env.CHAT_USER_NAME_1;
        userPassword1 = process.env.CHAT_USER_PASSWORD_1;
        userName2 = process.env.CHAT_USER_NAME_2;
        userPassword2 = process.env.CHAT_USER_PASSWORD_2;
    });

    test('basic test', async () => {

    });

    test('stretch goal', async () => {
        
    });

});