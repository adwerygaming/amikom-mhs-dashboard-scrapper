import { env } from "process"
import { AmikomScrapper } from "./AmikomScrapper.js"
import tags from "../utils/Tags.js"

const npm = env.AMIKOM_NIM!
const pw = env.AMIKOM_PASSWORD!

const AmikomClient = new AmikomScrapper(npm, pw)

const { status, loginStrategy } = await AmikomClient.Login()

console.log(`[${tags.Amikom}] Login Status: ${status} | Using Strategy: ${loginStrategy}`)

export default AmikomClient