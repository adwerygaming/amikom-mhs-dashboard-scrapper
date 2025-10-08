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

interface LoginProp {
    method: "manual" | "google"
}

export class AmikomScrapper {
    private npm: string
    private pw: string

    constructor(npm: string, pw: string) {
        this.npm = npm;
        this.pw = pw;
    }

    async CheckLogin(page: Page): Promise<boolean> {
        console.log(`[${tags.Debug}] CheckLogin: Running.`)

        // METHOD 1
        // Cookie method (FAILED)
        // try {
        //     const cookies = await page.cookies(AmikomEndpoints.dashboardMhs)
        //     console.log(cookies)

        //     // could be
        //     // - rtcsrf_cookie_name
        //     // - amikom
        //     const cookie = cookies.find(c => c.name == "rtcsrf_cookie_name")
        //     console.log(cookie)

        //     if (!cookie) {
        //         console.log(`[${tags.Debug}] CheckLogin: Cookie not found.`)
        //         return false
        //     }

        //     if (cookie.expires && cookie.expires * 1000 < Date.now()) {
        //         console.log(`[${tags.Debug}] CheckLogin: Found cookie, but expired.`)
        //         return false;
        //     }

        //     console.log(`[${tags.Debug}] CheckLogin: Found good cookie.`)
        //     return true;
        // } catch (err) {
        //     console.error(`[${tags.Amikom}] CheckLogin: Failed`, err);
        //     return false;
        // }

        // ============

        // METHOD 2
        // Check by accessing dashboard first,
        // if get redirected to auth.amikom.ac.id
        // it meant havent logged in.

        // ussually, they didnt redirect (from mhs.amikom.ac.id) if the login session is still active
        // dunno, could be wrong

        try {
            const page = await BrowserService.NewPage()
            await page.goto(AmikomEndpoints.dashboardMhs, {
                timeout: 16000,
                waitUntil: "load",
            });

            const url = page.url()
            console.log(`[${tags.Debug}] URL: ${url}`)
            console.log(`[${tags.Debug}] ${AmikomEndpoints.loginMhs}`)

            if (url.includes(AmikomEndpoints.loginMhs)) {
                console.log(`[${tags.Debug}] got redirected to ${url}`)
                // Got redirected to login
                await BrowserService.ClosePage(page)
                return false
            } else {
                console.log(`[${tags.Debug}] didnt get redirected`)
                // Possibly still on dashboard
                await BrowserService.ClosePage(page)
                return true
            }
        } catch (e) {
            console.error(`[${tags.Amikom}] CheckLogin: Failed`, e);
            await BrowserService.ClosePage(page)
            return false;
        }
    }

    async Login({ method }: LoginProp): Promise<LoginResponse> {
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
        const googleBtnKey = "#oauth_login";

        const dashboardMahastudentTextExist = await isLoggedIn(page)

        if (dashboardMahastudentTextExist) {
            console.log(`[${tags.Amikom}] Login: using cookies.`)
            await sleep(700);
            await BrowserService.ClosePage(page)
            return { status: "success", loginStrategy: "cookie" }
        }

        // Manual login using NPM & Password
        if (method == "manual") {
            if (!dashboardMahastudentTextExist) {
                console.log(`[${tags.Amikom}] Login: using manual method.`)

                const npmInputField = await page.waitForSelector(npmInputKey, { visible: true })
                const passwordInputField = await page.waitForSelector(passwordInputKey, { visible: true })
                const loginButton = await page.waitForSelector(loginBtnKey, { visible: true });

                if (!npmInputField && !passwordInputField && !loginButton) {
                    console.log(`[${tags.Debug}] Can't find the required fields. Is the web down or something?`)
                    return { status: "failed" }
                }

                if (npmInputField) {
                    console.log(`[${tags.Debug}] Login: Found NPM Field`)

                    await page.type(npmInputKey, this.npm)
                } else {
                    return { status: "failed" }
                }

                if (passwordInputField) {
                    console.log(`[${tags.Debug}] Login: Found Password Field`)

                    await page.type(passwordInputKey, this.pw)
                } else {
                    return { status: "failed" }
                }

                if (loginButton) {
                    console.log(`[${tags.Debug}] Login: Found Login Button`)
                } else {
                    return { status: "failed" }
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
                return { status: "error" }
            } finally {
                await BrowserService.ClosePage(page)
            }
        } else if (method == "google") {
            try {
                if (!dashboardMahastudentTextExist) {
                    console.log(`[${tags.Amikom}] Login: Using Amikom Student Google Account.`)
                    const loginButton = await page.waitForSelector(googleBtnKey, { visible: true });

                    if (loginButton) {
                        console.log(`[${tags.Debug}] Login: Found Login Button`)

                        await page.click(googleBtnKey)
                    }

                    await page.waitForNavigation({ waitUntil: "load", timeout: 16000 })

                    // get redirected to oauth.amikom.ac.id
                    // if not logged in using any google account
                    // will get redirected to accounts.google.com
                    // if not, prob stay on the oauth.amikom.ac.id and go to dashboard

                    const url = page.url()
                    console.log(`[${tags.Debug}] After clicking im on ${url}`)

                    const isGoogleAccountPage = url.includes("accounts.google.com")
                    const isOauthAmikomPage = url.includes(AmikomEndpoints.oauth)

                    if (isGoogleAccountPage) {
                        // user need to manually login
                        // user enters information
                        // wait for nagivation back on oauth.amikom.ac.id

                        console.log(`[${tags.Amikom}] USER INPUT NEEDED!`)
                        console.log(`[${tags.Amikom}] By using google account as login option, you need to log in to your @students.amikom.ac.id account`)
                        console.log(`[${tags.Amikom}] Please enter the information such as email, password and 2FA (if any)`)
                        console.log(`[${tags.Amikom}] Script will continue after get redirected back to oauth.amikom.ac.id`)
                        console.log(`[${tags.Amikom}] Take your time :)`)

                        //! apperanly this dosent work.
                        await page.waitForFunction(
                            () => window.location.href.includes(AmikomEndpoints.dashboardMhs),
                            { timeout: 0 }
                        )

                        console.log(`[${tags.Amikom}] Redirected back to oauth.amikom.ac.id`)
                    } else if (isOauthAmikomPage) {
                        console.log(`[${tags.Amikom}] Waiting for oauth response...`)

                        await page.waitForNavigation({ waitUntil: "load", timeout: 16000 })
                    }

                    return { status: "success", loginStrategy: "google" }
                } else {
                    return { status: "success", loginStrategy: "cookie" }
                }
            } catch (e) {
                return { status: "error" }
            } finally {
                await BrowserService.ClosePage(page)
            }
        } else {
            await BrowserService.ClosePage(page)
            return { status: "failed", loginStrategy: "unknown" }
        }
    }

    async FetchClassSchedule(): Promise<FetchClassScheduleResponse> {
        const page = await BrowserService.NewPage()
        const isLoggedIn = await this.CheckLogin(page)

        if (!isLoggedIn) {
            console.log(`[${tags.Amikom}] FetchMe: Not logged in. Automatically login..`)
            const { status } = await this.Login({ method: "manual" })
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

        console.log(res)

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
            const { status } = await this.Login({ method: "manual" })
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

            return { status: "error" }
        } finally {
            await BrowserService.ClosePage(page)
        }
    }
}