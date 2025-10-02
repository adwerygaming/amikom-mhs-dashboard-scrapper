import tags from "../utils/Tags.js";
import { AmikomService } from "./AmikomService.js";

const amikom =  new AmikomService()

amikom.on("error", (e: any) => {
    console.log(`[${tags.Amikom}] AmikomService Error`)
    console.error(e)
})

amikom.on("class_finished", (class) => {
    
})