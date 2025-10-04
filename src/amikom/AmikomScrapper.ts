import { sleep } from "../utils/Sleep.js";
import { BrowserService } from "../browser/BrowserService.js"
import tags from "../utils/Tags.js";
import { Page } from "puppeteer";
import { AmikomEndpoints, AmikomKRSType, FetchMeResponse, FetchClassScheduleResponse, LoginResponse, RawClassScheduleResponse } from "../types/AmikomTypes.js";
import { _dirname } from "../utils/Path.js";

// find "Dashboard Mahasiswa" text.
// to check if already logged in or not
async function isLoggedIn(page: Page) {
    return await page.evaluate(() => {
        const el = document.querySelector(
            "body > section#main > ng-view > section#content > div.container > div.block-header > h2"
        );
        return el?.textContent?.trim() === "Dashboard Mahasiswa";
    });
}

// username field name = user_id
// password field name = pass_id
// login btn class name = btn-login
// rechapcha div name = g-recaptcha

export class AmikomScrapper {
    private npm: string
    private pw: string

    constructor(npm: string, pw: string) {
        this.npm = npm;
        this.pw = pw;
    }

    async CheckLogin(page: Page): Promise<boolean> {
        console.log(`[${tags.Debug}] CheckLogin: Running.`)

        try {
            const cookies = await page.cookies(AmikomEndpoints.dashboardMhs)

            // could be
            // - rtcsrf_cookie_name
            // - amikom
            const cookie = cookies.find(c => c.name == "rtcsrf_cookie_name")

            if (!cookie) {
                console.log(`[${tags.Debug}] CheckLogin: Cookie not found.`)
                return false
            }

            if (cookie.expires && cookie.expires * 1000 < Date.now()) {
                console.log(`[${tags.Debug}] CheckLogin: Found cookie, but expired.`)
                return false;
            }

            console.log(`[${tags.Debug}] CheckLogin: Found good cookie.`)
            return true;
        } catch (err) {
            console.error(`[${tags.Amikom}] CheckLogin: Failed`, err);
            return false;
        }
    }

    async Login(): Promise<LoginResponse> {
        const page = await BrowserService.NewPage()
        const checkLogin = await this.CheckLogin(page)

        if (checkLogin) {
            console.log(`[${tags.Amikom}] Login: using cookies.`)

            await sleep(700);
            await BrowserService.ClosePage(page)
            return { status: "success", loginStrategy: "cookie" }
        }

        console.log(`[${tags.Amikom}] Login: Opening Login Page.`)

        await page.goto(AmikomEndpoints.dashboardMhs, {
            waitUntil: "networkidle2",
        });

        const npmInputKey = 'input[name="user_id"]';
        const passwordInputKey = 'input[name="pass_id"]';
        const loginBtnKey = ".btn-login";

        const dashboardMahastudentTextExist = await isLoggedIn(page)

        if (!dashboardMahastudentTextExist) {
            console.log(`[${tags.Amikom}] Login: using manual method.`)

            const npmInputField = await page.waitForSelector(npmInputKey, { visible: true })
            const passwordInputField = await page.waitForSelector(passwordInputKey, { visible: true })
            const loginButton = await page.waitForSelector(loginBtnKey, { visible: true });

            if (npmInputField) {
                console.log(`[${tags.Debug}] Login: Found NPM Field`)

                await page.type(npmInputKey, this.npm)
            }

            if (passwordInputField) {
                console.log(`[${tags.Debug}] Login: Found Password Field`)

                await page.type(passwordInputKey, this.pw)
            }

            if (loginButton) {
                console.log(`[${tags.Debug}] Login: Found Login Button`)
            }

            // await sleep(500)
            console.log(`[${tags.Debug}] Now doing Captcha part. This might take a while (~10s).`)

            const { error: captchaErr, solved } = await page.solveRecaptchas()

            if (captchaErr) {
                console.log(`[${tags.Error}] Login: Captcha Failed`)
                console.log(`[${tags.Error}] ${captchaErr}`)

                await BrowserService.ClosePage(page);
                return { status: "failed" }
            }

            if (solved) {
                console.log(`[${tags.Debug}] Login: Captcha Solved.`)
                await page.click(loginBtnKey);
            } else {
                await BrowserService.ClosePage(page);
                return { status: "failed" }
            }
        } else {
            console.log(`[${tags.Amikom}] Login: using cookies.`)
            await sleep(700);
            await BrowserService.ClosePage(page)
            return { status: "success", loginStrategy: "cookie" }
        }

        // expected url to change (to dashboard)
        // then close & send data
        try {
            console.log(`[${tags.Error}] Waiting for redirect...`)
            await page.waitForNavigation({ waitUntil: "load", timeout: 12000 })
            await sleep(700);
            return { status: "success", loginStrategy: dashboardMahastudentTextExist ? "cookie" : "manual" }
        } catch (e) {
            console.log(`[${tags.Error}] Logged in, but didnt get redirected.`)
            return { status: "failed" }
        } finally {
            await BrowserService.ClosePage(page)
        }
    }

    async FetchClassSchedule(): Promise<FetchClassScheduleResponse> {
        const page = await BrowserService.NewPage()
        const isLoggedIn = await this.CheckLogin(page)

        if (!isLoggedIn) {
            console.log(`[${tags.Amikom}] FetchMe: Not logged in. Automatically login..`)
            const { status } = await this.Login()
            if (status != "success") {
                return { status: "failed", data: null }
            }
        }

        console.log(`[${tags.Amikom}] FetchClassSchedule: Fetching API`)

        await page.goto(AmikomEndpoints.api.classSchedule, { waitUntil: "load" })

        const res: RawClassScheduleResponse = await page.evaluate(() => {
            const el = document.querySelector(
                "body"
            );

            if (!el) return [];
            return JSON.parse(el.textContent || "[]")
        });

        if ("Message" in res) {
            // Possible denied
            if (res.Message.toLowerCase().includes("Authorization has been denied")) {
                await BrowserService.ClosePage(page)
                return { status: "denied", data: []}
            }

            await BrowserService.ClosePage(page)
            return { status: "failed", data: null };
        } else {
            if (!(res?.[0]?.Kode)) {
                await BrowserService.ClosePage(page)
                return { status: "failed", data: null };
            }

            // Possible subjects
            await BrowserService.ClosePage(page)
            return { status: "success", data: res };
        }
    }

    async FetchMe(): Promise<FetchMeResponse> {
        console.log(`[${tags.Amikom}] FetchMe: Running.`)

        const page = await BrowserService.NewPage()
        const isLoggedIn = await this.CheckLogin(page)

        if (!isLoggedIn) {
            console.log(`[${tags.Amikom}] FetchMe: Not logged in. Automatically login..`)
            const { status } = await this.Login()
            if (status != "success") {
                return { status: "failed" }
            }
        }
        
        await page.goto(AmikomEndpoints.dashboardMhs, { waitUntil: "load", timeout: 8000 })
        await sleep(1000);

        console.log(`[${tags.Amikom}] FetchMe: Fetching API`)

        try {
            // Fetch Sidebar
            const myInfo = await page.evaluate(() => {
                const rootKey = "body > section#main > aside#sidebar > div#mCSB_1 > div#mCSB_1_container > div.s-profile"

                const base64pfp = ((document.querySelector(rootKey + " > div.image-cropper > img") as HTMLImageElement)?.src) || null
                const name = (document.querySelector(rootKey + " > div.sp-info")?.textContent.trim()) ?? null;
                const npm = (document.querySelector(rootKey + " > div.sp-info2")?.textContent.trim()) ?? null;

                return { base64pfp, name, npm }
            });

            // Fetch KRS
            const krsLabel: AmikomKRSType | null = await page.evaluate(() => {
                const cardsSelectior = document.querySelectorAll("div.cardtext-strong")
                const allCards = Array.from(cardsSelectior);
                const krsLabel: AmikomKRSType | null = (allCards[0]?.textContent.trim() as AmikomKRSType) ?? null;

                return krsLabel
            })

            // Fetch Semester
            const semesterLabel: string | null = await page.evaluate(() => {
                const theChosenOne = document.querySelector("div.card-header.cardtext-small.table-title > h2")
                const semesterLabel = (theChosenOne?.textContent.trim()) ?? null

                return semesterLabel
            })

            const krsState = krsLabel == "Aktif" ? true : false

            return { status: "success", krsLabel, krsState, semesterLabel, ...myInfo };
        } catch (e) {
            console.log(`[${tags.Error}] FetchMe: Failed to evaluate`)
            console.error(e)

            return { status: "failed" }
        } finally {
            await BrowserService.ClosePage(page)
        }
    }
}