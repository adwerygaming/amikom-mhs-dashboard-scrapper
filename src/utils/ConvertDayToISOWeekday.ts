import moment from "moment-timezone";
import { ClassSchedule } from "../types/AmikomTypes.js";
import { dayStringToIndexMap } from "./GetTodayISOWeekday.js";

export async function ConvertDayToISOWeekday(day: ClassSchedule["Hari"]) {
    const classDay = dayStringToIndexMap[day.toUpperCase()];
    const classDate = moment().isoWeekday(classDay);

    return classDate
}