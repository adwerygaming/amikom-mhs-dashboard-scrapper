import moment from "moment-timezone";

export const dayStringToIndexMap: Record<string, number> = {
    SENIN: 1,
    SELASA: 2,
    RABU: 3,
    KAMIS: 4,
    JUMAT: 5,
    SABTU: 6,
    MINGGU: 7,
};

export const dayIndexToStringMap: Record<number, string> = {
    1: "SENIN",
    2: "SELASA",
    3: "RABU",
    4: "KAMIS",
    5: "JUMAT",
    6: "SABTU",
    7: "MINGGU",
};

export async function GetTodayISOWeekday() {
    const todayNumber = moment().isoWeekday();

    const todayName = dayIndexToStringMap[todayNumber];

    return todayName
}
