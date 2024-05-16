import {ICertsIssueOptions, ICertsListOptions, IGlobalOptions} from "./options";

export interface ICertsService {
    list(options?: ICertsListOptions): Promise<void>;

    issue(domain: string | Array<string>, options?: ICertsIssueOptions): Promise<void>;

    remove(uid: Array<string>, options?: IGlobalOptions): Promise<void>;
}