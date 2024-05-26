import axios, {AxiosRequestConfig} from "axios";
import {ApiRequestResult} from "../models";
import {IApiService} from "../interfaces";
import {injectable} from "tsyringe";

const bearerToken = (typeof window !== 'undefined' && window.localStorage.getItem("bearerToken")) ?? process.env.AUTH_TOKEN;

@injectable()
class AxiosApiService implements IApiService {

    private getConfig(directives: any): AxiosRequestConfig<any> {
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
                this.getConfig(directives)
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

    post(url: string, data?: any, directives?: any): Promise<ApiRequestResult> {
        return axios.post(
            url,
            data,
            this.getConfig(directives)
        );
    }

    put(url: string, data: any, directives?: any): Promise<ApiRequestResult> {
        return axios.put(
            url,
            data,
            this.getConfig(directives)
        );
    }

    patch(url: string, data: any, directives?: any): Promise<ApiRequestResult> {
        return axios.patch(
            url,
            data,
            this.getConfig(directives)
        );
    }

    delete(url: string, directives?: any): Promise<ApiRequestResult> {
        return axios.delete(url, this.getConfig(directives));
    }
}

export {AxiosApiService};