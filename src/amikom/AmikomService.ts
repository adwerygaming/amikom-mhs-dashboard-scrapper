import { DatabaseClassSchedules, DatabaseMeProp, DatabaseService } from "../database/DatabaseService.js"
import AmikomClient from "./AmikomClient.js"

export const AmikomService = {
    mhs: {
        GetMe: async (): Promise<DatabaseMeProp | null> => {
            const cache = await DatabaseService.me.Get()

            if (!cache) {
                const { status, ...rest } = await AmikomClient.FetchMe()

                if (status == "success") {
                    const data = await DatabaseService.me.Set(rest)
                    return data
                }

                return null
            }

            return cache
        },
        GetClassSchedules: async (): Promise<DatabaseClassSchedules | null> => {
            const cache = await DatabaseService.classSchedules.Get()

            if (!cache) {
                const { status, data } = await AmikomClient.FetchClassSchedule()

                if (status == "success") {
                    const res = await DatabaseService.classSchedules.Set(data ?? [])
                    return res
                }

                return null
            }

            return cache
        }
    }
}