export interface IWriteConfigService {
    // write config file
    write(): Promise<void>;

    // write config file child
    writeChild(child: string, data: string): Promise<void>;

    // write config file key from child
    writeKeyFromChild(child: string, key: string, data: string): Promise<void>;
}