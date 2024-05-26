export interface IDeleteConfigService {
    // delete config file
    delete(): Promise<void>;

    // delete config file child
    deleteChild(child: string): Promise<void>;

    // delete config file key from child
    deleteKeyFromChild(child: string, key: string): Promise<void>;
}