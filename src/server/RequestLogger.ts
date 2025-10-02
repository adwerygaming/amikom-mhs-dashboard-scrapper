import { Request, Response, NextFunction } from 'express';
import tags from '../utils/Tags.js';

export default function RequestLogger(req: Request, _res: Response, next: NextFunction) {
    console.log(`[${tags.ExpressLog}] [${req.method.toUpperCase()}] ${req.ip} | ${req.originalUrl}`)

    next()
}