export interface Response {
    status: number
    data: ResponseData
}

export interface ResponseData {
    ip: string,
    status: boolean
    id: string
    code: string
    message: any
}

export interface BadResponse {
    response: Response
}