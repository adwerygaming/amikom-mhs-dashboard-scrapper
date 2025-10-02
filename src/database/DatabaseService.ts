import moment from "moment-timezone"
import { ClassSchedules, FetchMeProp } from "../types/AmikomTypes.js"
import AmikomDB from "./Koneksi.js"
import AmikomClient from "../amikom/AmikomClient.js"

export interface DatabaseMeProp {
    data: FetchMeProp,
    expiredAt: string,
    lastModified: string,
}

export interface DatabaseClassSchedules {
    data: ClassSchedules,
    expiredAt: string,
    lastModified: string,
}

export const DatabaseService = {
    me: {
        Get: async (): Promise<DatabaseMeProp | null> => {
            let data: DatabaseMeProp | null = await AmikomDB.get("me")

            // Expiry check
            const expiredAt = data?.expiredAt 
            if (moment()?.isAfter(expiredAt) || !expiredAt) {
                const { status, ...rest } = await AmikomClient.FetchMe()

                if (status == "success") {
                    data = await DatabaseService.me.Set(rest)
                }
            }

            return data
        },
        Set: async (data: FetchMeProp): Promise<DatabaseMeProp> => {
            const obj = {
                data,
                expiredAt: moment().add(1, "day").toISOString(),
                lastModified: moment().toISOString()
            }

            await AmikomDB.set("me", obj)

            return obj
        },
        Delete: async (): Promise<boolean> => {
            await AmikomDB.delete("me")

            return true
        }
    },
    classSchedules: {
        Get: async (): Promise<DatabaseClassSchedules | null> => {
            let data: DatabaseClassSchedules | null = await AmikomDB.get("classSchedules")

            // Expiry check
            const expiredAt = data?.expiredAt
            if (moment()?.isAfter(expiredAt) || !expiredAt) {
                const { status, data: res } = await AmikomClient.FetchClassSchedule()

                if (status == "success") {
                    data = await DatabaseService.classSchedules.Set(res ?? [])
                }
            }

            return data
        },
        Set: async (data: ClassSchedules): Promise<DatabaseClassSchedules> => {
            const obj = {
                data,
                expiredAt: moment().add(1, "day").toISOString(),
                lastModified: moment().toISOString()
            }

            await AmikomDB.set("classSchedules", obj)

            return obj
        },
        Delete: async (): Promise<boolean> => {
            await AmikomDB.delete("classSchedules")

            return true
        }
    }
}