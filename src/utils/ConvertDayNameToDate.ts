import { ClassSchedule } from "../types/AmikomTypes.js";
import moment from "moment-timezone";
import { ConvertDayToISOWeekday } from "./ConvertDayToISOWeekday.js";

export async function ConvertDayNameToDate(schedule: ClassSchedule) {
    const day = schedule?.Hari || null
    const time = schedule?.Waktu || null

    if (!day || !time) return null
    
    const [startTime, endTime] = time.split("-");
    const now = moment();
    const classDate = await ConvertDayToISOWeekday(day)

    if (classDate.isBefore(now, "day")) {
        classDate.add(1, "week");
    }

    const start = moment(classDate.format("YYYY-MM-DD") + " " + startTime, "YYYY-MM-DD HH:mm");
    const end = moment(classDate.format("YYYY-MM-DD") + " " + endTime, "YYYY-MM-DD HH:mm");

    return { classDate, start, end }
}