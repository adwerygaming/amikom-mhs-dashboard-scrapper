export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

export interface RouteLayout {
    metadata: {
        name: string,
        path: string,
        method: RequestMethod,
        middlewares?: any[]
    },
    execute: (req: Express.Request, res: Express.Response) => Promise<void>
}

export interface RouteLayoutDefault {
    default: RouteLayout
}

export interface RouteFilesProp {
    fullPath: string,
    fileName: string,
    from?: string[]
}

export type ErrorTypes = "supabase_error" | "zod_validation" | "server_error" | "idk";
export type StatusCodes = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 422 | 500 | 502 | 503 | 504;

export type ErrorSchema<T = Record<string, any>> = {
    type: ErrorTypes;
} & Partial<T>;

export interface ResponseSchema<D = any, E = any> {
    code: StatusCodes;
    message: string | null;
    data?: D | null;
    error?: ErrorSchema<E> | null;
}
