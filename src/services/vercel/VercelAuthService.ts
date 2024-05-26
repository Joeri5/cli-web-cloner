import {IApiService, IConfigService, IVercelAuthService} from "../../interfaces";
import {inject, injectable} from "tsyringe";
import {createDotLoader} from "../../utility";

@injectable()
export class VercelAuthService implements IVercelAuthService {
    constructor(@inject("IApiService") private apiService: IApiService, @inject("IConfigService") private configService: IConfigService) {
    }

    async login(email: string): Promise<void> {
        const loaderInterval = createDotLoader("Email verification in progress. Please check your inbox and spam folder. \n");

        try {
            const response = await this.apiService.post("https://api.vercel.com/v2/registration?mode=login", {
                email: email,
                tokenName: "cloner"
            });

            if (!response) {
                clearInterval(loaderInterval);
                console.error("Error logging in. Please try again later.");
            }

            let attemptCount = 0;
            const maxAttempts = 12; // Try for a minute (12 * 5 seconds)

            const checkEmailValidation = async () => {
                try {
                    const result = await this.apiService.get(`https://api.vercel.com/registration/verify?token=${response.data.token}&email=${email}`);
                    if (result.data.token) {
                        clearInterval(loaderInterval);
                        clearInterval(validationInterval);
                        await this.configService.writeConfig.write("auth", {
                            token: result.data.token,
                            email: email
                        });
                        console.log("\n Email verified successfully!");
                        return true; // Verification successful
                    }
                } catch (error) {
                    // Ignore error
                }

                attemptCount++;
                if (attemptCount >= maxAttempts) {
                    clearInterval(loaderInterval);
                    clearInterval(validationInterval);
                    console.error("Verification failed after multiple attempts. Please try again.");
                    return true; // Max attempts reached
                }
                return false; // Continue trying
            };

            const validationInterval = setInterval(async () => {
                const done = await checkEmailValidation();
                if (done) clearInterval(validationInterval);
            }, 5000); // Try every 5 seconds
        } catch (e) {
            clearInterval(loaderInterval);
            console.error("Error logging in. Please try again later.");
            throw e;
        }
    }

    async logout(): Promise<void> {
        await this.configService.deleteConfig.deleteChild("auth");
    }

    async whoami(): Promise<void> {
        const config = await this.configService.readConfig.readChild("auth");
        console.log(`Logged in as: ${config.email}`);
    }

    async isAuthenticated(): Promise<boolean> {
        const token = await this.configService.readConfig.readKeyFromChild("auth", "token");
        return !!token;
    }
}