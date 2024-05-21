export function clearDotLoader(interval: NodeJS.Timeout, finalMessage: string): void {
    clearInterval(interval);
    process.stdout.write(`\r${finalMessage}\n`);
}