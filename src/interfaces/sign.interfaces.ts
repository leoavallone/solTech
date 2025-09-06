export interface ISignInData {
    email: string;
    password: string;
}
export interface LoginResponse {
    type: string;
    token: string;
    username: string;
    // subscription: SubscriptionData;
}