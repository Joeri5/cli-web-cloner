import {IVercelService} from "../interfaces/IVercelService";
import {IAliasService} from "../interfaces/vercel";
import {AliasService} from "./vercel";

class VercelService implements IVercelService {
    alias: IAliasService;

    constructor() {
        this.alias = new AliasService();
    }
}