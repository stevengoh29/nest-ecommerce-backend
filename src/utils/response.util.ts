import { Response } from "express";

export interface IResponse {
    data: any,
    meta?: any
}

export const buildResponse = (res: Response, data: any, meta?: any) => {
    if (meta == undefined) return res.status(200).json({ statusCode: 200, message: "success", data })
    return res.status(200).json({ statusCode: 200, message: "success", data, meta })
}