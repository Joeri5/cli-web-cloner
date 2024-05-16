import {injectable} from "tsyringe";
import {IHttpClient} from "../interfaces";
import {ApiRequestResult} from "../models";
import axios from "axios";

@injectable()
class AxiosHttpClient implements IHttpClient {
    async get(url: string): Promise<ApiRequestResult> {
        const response = await axios.get(url);
        return response.data;
    }
}

export {AxiosHttpClient};