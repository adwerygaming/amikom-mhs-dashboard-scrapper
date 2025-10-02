import { Browser, Page } from "puppeteer";
import { PuppeteerExtraPluginRecaptcha, BuiltinSolutionProviders } from "puppeteer-extra-plugin-recaptcha"
import StealthPlugin from "puppeteer-extra-plugin-stealth"
import puppeteer from "puppeteer-extra";

import { env } from "../utils/EnvManager.js";
import tags from "../utils/Tags.js";

import CapMonsterProvider from "puppeteer-extra-plugin-recaptcha-capmonster";
const pup = puppeteer.default

CapMonsterProvider.default.use(BuiltinSolutionProviders);

// ignore this
const recaptchaPlugin = new PuppeteerExtraPluginRecaptcha({
    provider: {
        id: "capmonster",
        token: env.CAPMONSTER_TOKEN
    },
    visualFeedback: true,
});

let browser: Browser | null = null;

pup.use(StealthPlugin())
pup.use(recaptchaPlugin)

export const BrowserService = {
    async GetBrowser() {
        if (!browser) {
            console.log(`[${tags.System}] No existing browser, creating new one..`)
            browser = await pup.launch({
                headless: false,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-infobars",
                    "--disable-blink-features=AutomationControlled",
                    "--mute-audio",
                    "--disable-notifications",
                    "--disable-extensions"
                ],
                userDataDir: "./akubanggakuliahdiamikom",
                executablePath: "/usr/bin/google-chrome-stable"
            })
        }

        return browser
    },
    async GetPage(): Promise<Page> {
        const browser = await this.GetBrowser();
        const pages = await browser.pages();
        return pages.length ? pages[0] : await browser.newPage();
    },

    async NewPage(): Promise<Page> {
        const browser = await this.GetBrowser();
        return await browser.newPage();
    },

    async ClosePage(p: Page) {
        // const browser = await this.GetBrowser();
        // const pages = await browser.pages();

        // for (let i = 0; i < pages.length; i++) {
        //     const page = pages[i];
        //     const url = page.url()
        //     if (url == "about:blank" || url == "") {
        //         console.log(`[${tags.Debug}] Closed Blank Tab.`)
        //         await page.close()
        //     }
        // }

        if (p && !p.isClosed()) {
            await p.close();
        }
    },

    async CloseBrowser() {
        if (browser) {
            await browser.close();
            browser = null;
        }
    }

}

