import { Days } from "../utils/GetTodayISOWeekday.js";
import tags from "../utils/Tags.js";
import { AmikomService } from "./AmikomService.js";

const amikom = new AmikomService()

amikom.on("error", (e: any) => {
    console.log(`[${tags.Amikom}] AmikomService Error`)
    console.error(e)
})

amikom.on("class_finished", (classData) => {
    console.log(`[${tags.Amikom}] Class Ended!`)
    console.log(`[${tags.Amikom}] ${classData.Kelas} - ${classData.NamaDosen}`)
})

amikom.on("class_started", (classData) => {
    console.log(`[${tags.Amikom}] Class Started!`)
    console.log(`[${tags.Amikom}] ${classData.Kelas} - ${classData.NamaDosen}`)
})

amikom.on("class_upcoming_10m", (classData) => {
    console.log(`[${tags.Amikom}] Class In 10m!`)
    console.log(`[${tags.Amikom}] ${classData.Kelas} - ${classData.NamaDosen}`)
})

amikom.on("class_upcoming_15m", (classData) => {
    console.log(`[${tags.Amikom}] Class In 15m!`)
    console.log(`[${tags.Amikom}] ${classData.Kelas} - ${classData.NamaDosen}`)
})

amikom.on("class_upcoming_30m", (classData) => {
    console.log(`[${tags.Amikom}] Class In 30m!`)
    console.log(`[${tags.Amikom}] ${classData.Kelas} - ${classData.NamaDosen}`)
})

amikom.on("class_upcoming_1h", (classData) => {
    console.log(`[${tags.Amikom}] Class In 1h!`)
    console.log(`[${tags.Amikom}] ${classData.Kelas} - ${classData.NamaDosen}`)
})

const ClassesOnMonday = await amikom.mhs.GetClassByDay({ day: Days.SENIN })

console.log(skejul)