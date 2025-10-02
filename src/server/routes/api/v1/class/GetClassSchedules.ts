import { AmikomService } from "../../../../../amikom/AmikomService.js";
import { RequestMethod, ResponseSchema, RouteLayout } from "../../../../../types/ServerTypes.js";
import { Request, Response } from "express"

export default {
    metadata: {
        name: "Get Class Schedules",
        method: RequestMethod.GET,
        path: "/"
    },
    execute: async (_req: Request, res: Response) => {
        const amikom = new AmikomService()
        const data = await amikom.mhs.GetClassSchedules()

        const response: ResponseSchema<typeof data> = {
            code: 200,
            message: "monggo mas.",
            data
        }

        res.status(response.code).json(response);
        return
    },
} as RouteLayout