import "reflect-metadata";
import "../src/container";
import {IWebsiteCloner} from "../src/interfaces";
import {container} from "tsyringe";

describe("WebsiteCloner", () => {
    const websiteCloner: IWebsiteCloner = container.resolve("IWebsiteCloner");

    describe("clone", () => {
        it("should clone https://www.example.com", async () => {
            await websiteCloner.clone("https://www.example.com", "example");
        });
    });
})