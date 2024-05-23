export interface IUpdateConfigService {
    // update config file child with json data
    updateChild(child: string, data: Record<string, string>): Promise<void>;

    // update config file key from child
    updateKeyFromChild(child: string, key: string, value: string): Promise<void>;
}