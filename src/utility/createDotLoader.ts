export function createDotLoader(message: string): NodeJS.Timeout {
    let frameIndex = 0;
    const frames = ["⢿", "⣻", "⣽", "⣾", "⣷", "⣯", "⣟", "⡿"];

    return setInterval(() => {
        process.stdout.write(`\r${frames[frameIndex]} ${message}`);
        frameIndex = (frameIndex + 1) % frames.length;
    }, 100);
}
