import {IGlobalOptions} from "../interfaces";

function appendGlobalOptions(commandParts: string[], options?: IGlobalOptions) {
    if (!options) return commandParts;

    if (options.cwd) commandParts.push(`--cwd ${options.cwd}`);
    if (options.debug) commandParts.push('--debug');
    if (options.globalConfig) commandParts.push(`--global-config ${options.globalConfig}`);
    if (options.help) commandParts.push('--help');
    if (options.localConfig) commandParts.push(`--local-config ${options.localConfig}`);
    if (options.noColor) commandParts.push('--no-color');
    if (options.scope) commandParts.push(`--scope ${options.scope}`);
    if (options.token) commandParts.push(`--token ${options.token}`);

    return commandParts;
}

export {appendGlobalOptions};