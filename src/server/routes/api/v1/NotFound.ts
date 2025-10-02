import { NextFunction, Response, Request } from "express";
import tags from "../../../../utils/Tags.js";

export default function NotFound(_req: Request, res: Response, _next: NextFunction) {
    console.log(`[${tags.Express}] Reached 404 Page`)
    res.status(404).send({ message: "API endpoint not found. womp womp." })
}