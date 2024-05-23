import * as fs from "fs";
import * as path from "path";

export function getRootDir(): string {
    let currentDir = __dirname
    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
        currentDir = path.join(currentDir, '..')
    }
    return currentDir
}