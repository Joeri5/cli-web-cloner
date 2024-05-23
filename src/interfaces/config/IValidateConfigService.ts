export interface IValidateConfigService {
    // validate config file
    validate(): Promise<void>;

    // validate config file child
    validateChild(child: string): Promise<void>;

    // validate config file key from child
    validateKeyFromChild(child: string, key: string): Promise<void>;
}