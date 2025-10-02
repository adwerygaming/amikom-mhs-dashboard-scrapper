import { sleep } from "../utils/Sleep.js";
import tags from "../utils/Tags.js";
import amikom from "./AmikomClient.js";
// import { AmikomService } from "./AmikomService.js";

const { status: loginStatus } = await amikom.Login()

if (loginStatus == "success") {
    console.log(`[${tags.Amikom}] Login Success. yay!`)
    await sleep(1500);
} else {
    console.log(`[${tags.Amikom}] Login did not go as planned.`)
}
