import axios, {AxiosRequestConfig} from "axios";
import {ApiRequestResult} from "../models";
import {IApiService, IConfigService} from "../interfaces";
import {inject, injectable} from "tsyringe";

@injectable()
class AxiosApiService implements IApiService {
    constructor(@inject('IConfigService') private configService: IConfigService) {
    }

    private async getConfig(directives: any): Promise<AxiosRequestConfig<any>> {
        const bearerToken = await this.configService.readConfig.readKeyFromChild('auth', 'token');
        return <AxiosRequestConfig<any>>{
            timeout: 10000 ?? directives.timeout,
            headers: bearerToken ? {
                Authorization: `Bearer ${bearerToken}`,
            } : {},
        };
    }

    async get(url: string, directives?: any): Promise<ApiRequestResult> {
        try {
            const axiosResult = await axios.get(
                url,
                await this.getConfig(directives)
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

    async post(url: string, data?: any, directives?: any): Promise<ApiRequestResult> {
        return axios.post(
            url,
            data,
            await this.getConfig(directives)
        );
    }

    async put(url: string, data: any, directives?: any): Promise<ApiRequestResult> {
        return axios.put(
            url,
            data,
            await this.getConfig(directives)
        );
    }

    async patch(url: string, data: any, directives?: any): Promise<ApiRequestResult> {
        return axios.patch(
            url,
            data,
            await this.getConfig(directives)
        );
    }

    async delete(url: string, directives?: any): Promise<ApiRequestResult> {
        return axios.delete(url, await this.getConfig(directives));
    }
}

export {AxiosApiService};