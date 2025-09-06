import React, { createContext, useCallback, useState, useContext } from "react";
import { ISignInData } from "../interfaces/sign.interfaces";
import { ISignUpData } from "../interfaces/signup.interfaces";
import SoulTechServices from "../services/solTech-services";

interface UserData {
    username: string;
    // userPlan: SubscriptionData
    authkey: string;
    token: string;
    loginTime: string;
    isAdmin: string;
}

interface AuthContextData {
    user: UserData;
    signIn(data: ISignInData): Promise<boolean>;
    signOut(): void;
}

interface AuthState {
    authkey: string;
    username: string;
    token: string;
    loginTime: string;
    //subscription: SubscriptionData;
    isAdmin: string
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem("@solTech:token");
        const username = localStorage.getItem("@solTech:username");
        //const subscription = localStorage.getItem("@solTech:subscription");
        const authkey = localStorage.getItem("@solTech:authkey");
        const loginTime = localStorage.getItem("@solTech:loginTime");
        const isAdmin = localStorage.getItem("@solTech:isAdmin");

        if (token && username) {
            return {
                token,
                username,
                authkey: authkey ? authkey : "unlogged",
                loginTime: loginTime ? loginTime : "",
                //subscription: subscription ? JSON.parse(subscription) : {},
                isAdmin: isAdmin ? isAdmin : ""
            }
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async (data: ISignInData) => {
        try {
            const response = await SoulTechServices.signIn(data);
            const { token, username, isAdmin } = response.data;
            const loginTime = new Date().toISOString();
            localStorage.setItem("@solTech:authkey", "logged");
            localStorage.setItem("@solTech:username", username);
            localStorage.setItem("@solTech:token", token);
            localStorage.setItem('@solTech:loginTime', loginTime);
            //localStorage.setItem("@solTech:subscription", generalHelper.setUserPlan(subscription));
            localStorage.setItem("@solTech:isAdmin", isAdmin);
            setData({ token, username, loginTime, authkey: "logged", isAdmin });
            return true;
        } catch (e) {
            console.log('Erro encontrado:', e);
            return false;
        }
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem("@solTech:authkey");
        localStorage.removeItem("@solTech:username");
        localStorage.removeItem("@solTech:token");
        localStorage.removeItem('@solTech:loginTime');
        //localStorage.removeItem("@solTech:subscription");
        localStorage.removeItem("@solTech:isAdmin");
        setData({} as AuthState);
    }, []);


    return (
        <AuthContext.Provider value={{ user: { username: data.username, authkey: data.authkey, token: data.token, loginTime: data.loginTime, isAdmin: data.isAdmin }, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth}