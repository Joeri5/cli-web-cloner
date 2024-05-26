import {ApiRequestResult} from "../models";

export interface IApiService {
    /// <summary>
    /// Performs a GET request to the specified URL.
    /// </summary>
    /// <param name="url">The URL to GET.</param>
    /// <param name="directives">The directives to use for the request, this can be anything depending on the specific implementation.</param>
    /// <returns>The result of the request.</returns>
    get(url: string, directives?: any): Promise<ApiRequestResult>;

    /// <summary>
    /// Performs a POST request to the specified URL.
    /// </summary>
    /// <param name="url">The URL to POST to.</param>
    /// <param name="data">The data to post.</param>
    /// <param name="directives">The directives to use for the request, this can be anything depending on the specific implementation.</param>
    /// <returns>The result of the request.</returns>
    post(url: string, data?: any, directives?: any): Promise<ApiRequestResult>;

    /// <summary>
    /// Performs a PUT request to the specified URL.
    /// </summary>
    /// <param name="url">The URL to PUT to.</param>
    /// <param name="data">The data to put.</param>
    /// <param name="directives">The directives to use for the request, this can be anything depending on the specific implementation.</param>
    /// <returns>The result of the request.</returns>
    put(url: string, data: any, directives?: any): Promise<ApiRequestResult>;

    /// <summary>
    /// Performs a PATCH request to the specified URL.
    /// </summary>
    /// <param name="url">The URL to PATCH to.</param>
    /// <param name="data">The data to patch.</param>
    /// <param name="directives">The directives to use for the request, this can be anything depending on the specific implementation.</param>
    /// <returns>The result of the request.</returns>
    patch(url: string, data: any, directives?: any): Promise<ApiRequestResult>;

    /// <summary>
    /// Performs a DELETE request to the specified URL.
    /// </summary>
    /// <param name="url">The URL to DELETE.</param>
    /// <param name="directives">The directives to use for the request, this can be anything depending on the specific implementation.</param>
    /// <returns>The result of the request.</returns>
    delete(url: string, directives?: any): Promise<ApiRequestResult>;
}