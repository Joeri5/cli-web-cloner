import "reflect-metadata";
import {exec} from 'child_process';
import {IVercelService} from "../src/interfaces";
import {container} from "tsyringe";

import "../src/container";

jest.mock('child_process', () => ({
    exec: jest.fn((command, callback) => {
        callback(null, 'stdout', 'stderr');
    })
}));

describe("VercelService", () => {
    const vercelService: IVercelService = container.resolve("IVercelService");

    describe("alias", () => {
        it("should set an alias", async () => {
            await vercelService.alias.set("https://my-deployment.vercel.app", "my-custom-domain.com");
            expect(exec).toHaveBeenCalled();
        });

        it("should remove an alias", async () => {
            await vercelService.alias.remove("my-custom-domain.com", {yes: true});
            expect(exec).toHaveBeenCalled();
        });

        it("should list aliases", async () => {
            await vercelService.alias.list({limit: 100});
            expect(exec).toHaveBeenCalled();
        });
    });

    describe("bisect", () => {
        it("should run bisect with options", async () => {
            await vercelService.bisect.bisect({
                good: 'https://example.com',
                bad: 'https://example-s93n1nfa.vercel.app',
                path: '/blog/first-post',
                open: "true",
                run: './test.sh',
                token: 'my-token'
            });
            expect(exec).toHaveBeenCalled();
        });
    });
});