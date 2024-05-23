export interface IWriteConfigService {
    // write config file child with json data
    write(child: string, data: Record<string, string>): Promise<void>;
}