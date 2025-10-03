import moment from "moment-timezone";

export const dayStringToIndexMap: Record<string, number> = {
    SENIN: 1,
    SELASA: 2,
    RABU: 3,
    KAMIS: 4,
    JUMAT: 5,
    SABTU: 6,
    MINGGU: 7,
} as const;

export const enum Days {
    SENIN = "SENIN",
    SELASA = "SELASA",
    RABU = "RABU",
    KAMIS = "KAMIS",
    JUMAT = "JUMAT",
    SABTU = "SABTU",
    MINGGU = "MINGGU",
}

export const dayIndexToStringMap: Record<number, string> = {
    1: "SENIN",
    2: "SELASA",
    3: "RABU",
    4: "KAMIS",
    5: "JUMAT",
    6: "SABTU",
    7: "MINGGU",
} as const;

export async function GetTodayISOWeekday(manual?: number) {
    const todayNumber = manual ?? moment().isoWeekday();

    const todayName = dayIndexToStringMap[todayNumber];

    return todayName
}
