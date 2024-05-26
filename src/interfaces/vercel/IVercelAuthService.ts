export interface IVercelAuthService {
    // login user to vercel
    login(email: string): Promise<void>;

    // logout user from vercel
    logout(): Promise<void>;

    whoami(): Promise<void>;

    // check if user is logged in
    isAuthenticated(): Promise<boolean>;
}