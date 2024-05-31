export interface ITransipService {
    writeToken(token: string): Promise<void>;

    readToken(): Promise<string>;

    updateToken(token: string): Promise<void>;

    deleteToken(): Promise<void>;
}