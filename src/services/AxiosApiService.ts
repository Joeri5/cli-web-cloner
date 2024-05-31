import axios, {AxiosRequestConfig} from "axios";
import {ApiRequestResult} from "../models";
import {IApiService, IConfigService} from "../interfaces";
import {inject, injectable} from "tsyringe";

@injectable()
export class AxiosApiService implements IApiService {
    constructor(@inject('IConfigService') private configService: IConfigService) {
    }

    private getConfig(directives: any, bearerToken?: string): AxiosRequestConfig<any> {
        return <AxiosRequestConfig<any>>{
            timeout: 10000 ?? directives.timeout,
            headers: bearerToken ? {
                Authorization: `Bearer ${bearerToken}`,
            } : {},
        };
    }

    async get(url: string, bearerToken?: string, directives?: any): Promise<ApiRequestResult> {
        try {
            const axiosResult = await axios.get(
                url,
                this.getConfig(directives, bearerToken)
            );
            return <ApiRequestResult>{
                status: axiosResult.status,
                data: axiosResult.data,
            };
        } catch (err) {
            return <ApiRequestResult>{
                error: err,
            };
        }
    }

    async post(url: string, data?: any, bearerToken?: string, directives?: any): Promise<ApiRequestResult> {
        return axios.post(
            url,
            data,
            this.getConfig(directives, bearerToken)
        );
    }

    async put(url: string, data: any, bearerToken?: string, directives?: any): Promise<ApiRequestResult> {
        return axios.put(
            url,
            data,
            this.getConfig(directives, bearerToken)
        );
    }

    async patch(url: string, data: any, bearerToken?: string, directives?: any): Promise<ApiRequestResult> {
        return axios.patch(
            url,
            data,
            this.getConfig(directives, bearerToken)
        );
    }

    async delete(url: string, bearerToken?: string, directives?: any): Promise<ApiRequestResult> {
        return axios.delete(url, this.getConfig(directives, bearerToken));
    }
}