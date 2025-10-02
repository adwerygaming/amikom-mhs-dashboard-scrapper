import { EventEmitter } from "events"
import { DatabaseClassSchedulesProp, DatabaseMeProp, DatabaseService } from "../database/DatabaseService.js"
import AmikomClient from "./AmikomClient.js"
import { sleep } from "../utils/Sleep.js";
import { GetTodayISOWeekday } from "../utils/GetTodayISOWeekday.js";
import tags from "../utils/Tags.js";
import { ConvertDayNameToDate } from "../utils/ConvertDayNameToDate.js";
import moment from "moment-timezone";

export class AmikomService extends EventEmitter {
    constructor() {
        super();
        this.startPolling()
    }

    public mhs = {
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
        GetClassSchedules: async (): Promise<DatabaseClassSchedulesProp | null> => {
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

    private async startPolling() {
        while (true) {
            try {
                console.log(`[${tags.Amikom}] Polling.`)
                const getClassSchedule = await this.mhs.GetClassSchedules()

                if (getClassSchedule) {
                    const latestSchedules = getClassSchedule.data;
                    const todayName = await GetTodayISOWeekday()
                    const todaySchedules = latestSchedules.filter((x) => x.Hari.toUpperCase() == todayName.toUpperCase())

                    if (todaySchedules) {
                        console.log(`[${tags.Debug}] Today schedulle:`)
                        console.log(`[${tags.Debug}] todayName: ${todayName}`)
                        console.log(todaySchedules)

                        const results = await Promise.all(
                            todaySchedules.map(async (x) => await ConvertDayNameToDate(x))
                        )

                        for (const res of results) {
                            const end = res?.end
                            const start = res?.start

                            const lastPoll = await DatabaseService.lastPollSchedule.Get()
                            const currentSchedule

                            if (lastPoll?.data?.IdKuliah != res?.schedule.IdKuliah) {
                                // diff

                                if (moment().isAfter(start) && moment().isBefore(end)) {
                                    // happening
                                } else if (moment().isBefore(start)) {
                                    const diff = moment(start).diff(moment(), "minutes")
                                    if (diff == 60) {
                                        // upcomin 1h
                                    } else if (diff == 30) {
                                        // upcomin 30m
                                    } else if (diff == 15) {
                                        // upcomin 15m
                                    } else if (diff == 10) {
                                        // upcoming 10m
                                    } else if (diff == 5) {
                                        // upcoming 5m
                                    }
                                } else if (moment().isAfter(end)) {
                                    // finished
                                }
                            }

                            await DatabaseService.lastPollSchedule.Set(res?.schedule)
                        }
                    }
                }
            } catch (e) {
                this.emit('error', e)   
            }

            await sleep(60000 * 1) // pause for 1m
        }
    }
}