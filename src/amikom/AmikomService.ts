import { EventEmitter } from "events"
import { DatabaseClassSchedulesProp, DatabaseMeProp, DatabaseService } from "../database/DatabaseService.js"
import AmikomClient from "./AmikomClient.js"
import { sleep } from "../utils/Sleep.js";
import { GetTodayISOWeekday } from "../utils/GetTodayISOWeekday.js";
import tags from "../utils/Tags.js";
import { ConvertDayNameToDate } from "../utils/ConvertDayNameToDate.js";
import moment from "moment-timezone";
import { ClassSchedule } from "../types/AmikomTypes.js";

interface AmikomServiceEvents {
    class_started: ClassSchedule
    class_upcoming_1h: ClassSchedule
    class_upcoming_30m: ClassSchedule
    class_upcoming_15m: ClassSchedule
    class_upcoming_10m: ClassSchedule
    class_upcoming_5m: ClassSchedule
    class_finished: ClassSchedule
    error: any
}

class TypedEmitter<T> {
    private ee = new EventEmitter();

    on<K extends keyof T>(event: K, listener: (arg: T[K]) => void): this {
        this.ee.on(event as string, listener);
        return this;
    }

    emit<K extends keyof T>(event: K, arg: T[K]): boolean {
        return this.ee.emit(event as string, arg);
    }

    eventNames(): (keyof T)[] {
        return this.ee.eventNames() as (keyof T)[];
    }
}

export class AmikomService extends TypedEmitter<AmikomServiceEvents> {
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

                        const states = await DatabaseService.classStates.Get()

                        if (results && results.length > 0) {
                            for (const res of results) {
                                const end = res?.end
                                const start = res?.start

                                if (!res) return

                                const currentSchedule = res?.schedule;

                                // init if not exists
                                if (!states[currentSchedule.IdKuliah]) {
                                    states[currentSchedule.IdKuliah] = {
                                        started: false,
                                        finished: false,
                                        notified: {},
                                        schedule: currentSchedule
                                    }
                                }

                                const state = states[currentSchedule.IdKuliah];
                                const lastSchedule = state.schedule

                                console.log(`[${tags.Debug}] Current Schedule`)
                                console.log(`[${tags.Debug}] ${currentSchedule?.IdKuliah} - ${currentSchedule?.MataKuliah}`)
                                console.log("")
                                console.log(`[${tags.Debug}] Last Schedule`)
                                console.log(`[${tags.Debug}] ${lastSchedule?.IdKuliah} - ${lastSchedule?.MataKuliah}`)

                                if (moment().isBetween(start, end) && !state.started) {
                                    this.emit("class_started", currentSchedule)
                                    state.started = true
                                } else if (moment().isBefore(start)) {
                                    const diff = moment(start).diff(moment(), "minutes")
                                    if (diff <= 60 && diff > 59 && !state.notified["1h"]) {
                                        // upcomin 1h
                                        this.emit("class_upcoming_1h", currentSchedule)
                                    } else if (diff == 30) {
                                        // upcomin 30m
                                        this.emit("class_upcoming_30m", currentSchedule)
                                    } else if (diff == 15) {
                                        // upcomin 15m
                                        this.emit("class_upcoming_15m", currentSchedule)
                                    } else if (diff == 10) {
                                        // upcoming 10m
                                        this.emit("class_upcoming_10m", currentSchedule)
                                    } else if (diff == 5) {
                                        // upcoming 5m
                                        this.emit("class_upcoming_5m", currentSchedule)
                                    }
                                } else if (moment().isAfter(end) && !state.finished) {
                                    // finished
                                    this.emit("class_finished", currentSchedule)
                                    state.finished = true
                                }

                                await DatabaseService.classStates.Set(states)
                            }
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