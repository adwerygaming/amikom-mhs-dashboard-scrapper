import express from "express"
import path from "path";
import fs from "fs"

import { RequestMethod, RouteFilesProp, RouteLayoutDefault } from "../../../../types/ServerTypes.js";
import { _dirname } from "../../../../utils/Path.js";
import { Request, Response } from 'express';
import tags from "../../../../utils/Tags.js";
import NotFound from "./NotFound.js";
import { pathToFileURL } from "url";

const router = express.Router()
const dirname = path.join(_dirname, "server", "routes", "api", "v1")

const files: RouteFilesProp[] = []

async function loadFolder(dir: string, from: string[] = []) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(async (x) => {
        const name = x.name

        if (x.isDirectory()) {
            await loadFolder(path.join(dir, name), [...from, name])
        } else {
            if (name.endsWith(".ts") || name.endsWith(".js")) {
                files.push({ fullPath: path.join(dir, x.name), fileName: x.name, from })
            }
        }
    })
}

loadFolder(dirname)

async function loadRoutes() {
    for (const { fileName, fullPath, from = [] } of files) {
        try {
            const moduleUrl = pathToFileURL(fullPath).href;
            let blacklisted = [
                "Index.js",
                "Index.ts",
                "NotFound.js",
                "NotFound.ts",
                "Template.js",
                "Template.ts"
            ]

            if (!blacklisted.includes(fileName)) {
                const file = await import(moduleUrl) as RouteLayoutDefault

                if (file?.default?.metadata) {
                    const module = file.default
                    if (!module.metadata.name) {
                        console.log(`[${tags.RouteLoader}] ${fileName} dosen't have metdata name`)
                        return
                    }

                    if (!module.metadata.method || !Object.keys(RequestMethod).includes(module.metadata.method)) {
                        console.log(`[${tags.RouteLoader}] ${fileName} dosen't have metdata method or not using RequestMethod.`)
                        return
                    }

                    if (!module.execute) {
                        console.log(`[${tags.RouteLoader}] ${fileName} dosen't have execute function.`)
                        return
                    }

                    const method = module.metadata.method
                    const routePath = "/" + [...from].join("/") + module.metadata.path
                    const middlewares = module.metadata.middlewares ?? []
                    const execute = module.execute

                    if (method == "GET") {
                        router.get(routePath, ...middlewares, (req: Express.Request, res: Express.Response) => execute(req, res))
                    } else if (method == "POST") {
                        router.post(routePath, ...middlewares, (req: Express.Request, res: Express.Response) => execute(req, res))
                    } else if (method == "PUT") {
                        router.put(routePath, ...middlewares, (req: Express.Request, res: Express.Response) => execute(req, res))
                    } else if (method == "DELETE") {
                        router.delete(routePath, ...middlewares, (req: Express.Request, res: Express.Response) => execute(req, res))
                    } else if (method == "PATCH") {
                        router.patch(routePath, ...middlewares, (req: Express.Request, res: Express.Response) => execute(req, res))
                    } else {
                        console.log(`[${tags.RouteLoader}] ${fileName} has invalid method.`)
                    }

                    console.log(`[${tags.RouteLoader}] Loaded ${fileName}`)
                } else {
                    if (!blacklisted.includes(fileName)) {
                        console.log(`[${tags.RouteLoader}] ${fileName} is dosent have required structure. Skipping Import.`)
                    }
                }
            }
        } catch (e) {
            console.log(`[${tags.RouteLoader}] Error`)
            console.error(e)
        }
    }
}

router.get("/", (_req: Request, res: Response) => {
    res.status(200).send({ message: "Hi mi ayam!" })
});

await loadRoutes()

router.use((req, res, next) => {
    NotFound(req, res, next)
})

export default router
