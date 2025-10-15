export interface ISignInData {
    email: string;
    password: string;
}
export interface LoginResponse {
    type: string;
    access_token: string;
    access_ocpp_token: string;
    // subscription: SubscriptionData;
}