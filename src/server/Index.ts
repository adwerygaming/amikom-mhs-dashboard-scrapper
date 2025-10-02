import express from "express";
import tags from "../utils/Tags.js";
import RequestLogger from "./RequestLogger.js";

import api_v1_router from "./routes/api/v1/Index.js"
import { env } from "../utils/EnvManager.js";

const app = express()
const SERVER_IP = env.SERVER_IP
const SERVER_PORT = Number(env.SERVER_PORT)

if (!SERVER_IP || !SERVER_PORT) {
    throw new Error("Please set SERVER_IP & SERVER_PORT in the .env file!")
}

app.use(express.json())

app.use((req, res, next) => {
    if (req.method == "options") return next()
    RequestLogger(req, res, next)
})

app.use("/api/v1", api_v1_router)

console.log(`[${tags.RouteRegister}] ======== API v1 Loaded Routes ========`)
for (let i = 0; i < api_v1_router.stack.length; i++) {
    const res = api_v1_router.stack[i];

    if (typeof res?.route?.path === "undefined") continue;

    const path = res?.route?.path
    const met = res?.route?.stack[0]?.method

    console.log(`[${tags.RouteRegister}] [${met?.toUpperCase()}] ${path}`)
}
console.log(`[${tags.RouteRegister}] ======================================`)
console.log("")

app.set("trust proxy", 1);

app.listen(SERVER_PORT, SERVER_IP, (error: Error | undefined) => {
    if (error) {
        console.log(`[${tags.Express}] Failed to run Express Server on port ${SERVER_PORT}.`)
        console.log(error)
        return
    }

    console.log(`[${tags.Express}] Server is running on port ${SERVER_PORT} (http://${SERVER_IP ?? "localhost"}:${SERVER_PORT}).`)

    // SyncCacheWithDatabase()
    // startCacheWatcher()
})

export default app