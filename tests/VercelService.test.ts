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
                open: true,
                run: './test.sh',
                token: 'my-token'
            });
            expect(exec).toHaveBeenCalled();
        });
    });

    describe("build", () => {
        it("should run build with options", async () => {
            await vercelService.build.build({prod: true, yes: true, token: 'my-token'});
            expect(exec).toHaveBeenCalled();
        });
    });

    describe("certs", () => {
        it("should list certs", async () => {
            await vercelService.certs.list({limit: 100});
            expect(exec).toHaveBeenCalled();
        });

        it("should issue certs", async () => {
            await vercelService.certs.issue('my-domain.com', {debug: true});
            expect(exec).toHaveBeenCalled();
        });

        it("should remove certs", async () => {
            await vercelService.certs.remove(['cert-id-1', 'cert-id-2'], {help: true});
            expect(exec).toHaveBeenCalled();
        });
    });
});