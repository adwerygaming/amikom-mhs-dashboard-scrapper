import { env } from "process"
import { AmikomScrapper } from "./AmikomScrapper.js"

const npm = env.AMIKOM_NIM!
const pw = env.AMIKOM_PASSWORD!

const AmikomClient = new AmikomScrapper(npm, pw)

export default AmikomClient