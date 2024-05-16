import {ApiRequestResult} from "../models";

export interface IHttpClient {
    get(url: string): Promise<ApiRequestResult>;
}