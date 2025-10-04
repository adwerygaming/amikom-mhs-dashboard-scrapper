import moment from "moment-timezone"
import { ClassSchedule, ClassSchedules, FetchMeProp } from "../types/AmikomTypes.js"
import AmikomDB from "./Koneksi.js"
import AmikomClient from "../amikom/AmikomClient.js"
import { env } from "../utils/EnvManager.js"
import tags from "../utils/Tags.js"

export interface DatabaseMeProp {
    data: FetchMeProp,
    expiredAt: string,
    lastModified: string,
}

export interface DatabaseClassSchedulesProp {
    data: ClassSchedules,
    expiredAt: string,
    lastModified: string,
}

export interface LastPollScheduleProp {
    data: ClassSchedule | null
}

export interface ClassState {
    started: boolean
    finished: boolean
    notified: Record<string, boolean>
    schedule: ClassSchedule
}

export const DatabaseService = {
    async getNewExpiredAt() {
        const expiredAt = moment().tz("Asia/Jakarta").add(Number(env.CACHE_TTL), "seconds").toISOString()
        return expiredAt
    },
    classStates: {
        async Get(): Promise<Record<string, ClassState>> {
            let data: Record<string, ClassState> | null = await AmikomDB.get("classStates")
            return data ?? {}
        },
        async Set(states: Record<string, ClassState>): Promise<Record<string, ClassState>> {
            await AmikomDB.set("classStates", states)
            return states
        },
        async Delete(): Promise<boolean> {
            await AmikomDB.delete("classStates")
            return true
        }
    },
    me: {
        async Get(): Promise<DatabaseMeProp | null> {
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
        async Set(data: FetchMeProp): Promise<DatabaseMeProp> {
            const obj = {
                data,
                expiredAt: await DatabaseService.getNewExpiredAt(),
                lastModified: moment().toISOString()
            }

            await AmikomDB.set("me", obj)

            return obj
        },
        async Delete(): Promise<boolean> {
            await AmikomDB.delete("me")

            return true
        }
    },
    classSchedules: {
        async Get(): Promise<DatabaseClassSchedulesProp | null> {
            let data: DatabaseClassSchedulesProp | null = await AmikomDB.get("classSchedules")

            // Expiry check
            const expiredAt = data?.expiredAt
            if (moment()?.isAfter(expiredAt) || !expiredAt) {
                console.log(`[${tags.Debug}] classSchedules is expired. [${expiredAt}]`)
                const { status, data: res } = await AmikomClient.FetchClassSchedule()

                if (status == "success") {
                    data = await DatabaseService.classSchedules.Set(res ?? [])
                }
            }

            return data
        },
        async Set(data: ClassSchedules): Promise<DatabaseClassSchedulesProp> {
            const obj = {
                data,
                expiredAt: await DatabaseService.getNewExpiredAt(),
                lastModified: moment().toISOString()
            }

            await AmikomDB.set("classSchedules", obj)

            return obj
        },
        async Delete(): Promise<boolean> {
            await AmikomDB.delete("classSchedules")

            return true
        }
    }
}