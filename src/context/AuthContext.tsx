import React, { createContext, useCallback, useState, useContext } from "react";
import { ISignInData } from "../interfaces/sign.interfaces";
import { ISignUpData } from "../interfaces/signup.interfaces";
import SoulTechServices from "../services/solTech-services";

interface UserData {
    authkey: string;
    access_token: string;
    access_ocpp_token: string;
    loginTime: string;
}

interface AuthContextData {
    user: UserData;
    signIn(data: ISignInData): Promise<boolean>;
    signOut(): void;
}

interface AuthState {
    authkey: string;
    access_token: string;
    access_ocpp_token: string;
    loginTime: string;
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const access_token = localStorage.getItem("@solTech:access_token");
        const access_ocpp_token = localStorage.getItem("@solTech:access_ocpp_token");
        const loginTime = localStorage.getItem("@solTech:loginTime");
        const authkey = localStorage.getItem("@solTech:authkey");

        if (access_token && access_ocpp_token) {
            return {
                access_token,
                access_ocpp_token,
                loginTime: loginTime ? loginTime : "",
                authkey: authkey ? authkey : "unlogged",
            }
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async (data: ISignInData) => {
        try {
            const response = await SoulTechServices.signIn(data);
            const { access_token } = response.data.authToken;
            const { access_token: access_ocpp_token } = response.data.authTokenOCPP;
            const loginTime = new Date().toISOString();
            localStorage.setItem("@solTech:authkey", "logged");
            localStorage.setItem("@solTech:access_token", access_token);
            localStorage.setItem("@solTech:access_ocpp_token", access_ocpp_token);
            localStorage.setItem("@solTech:loginTime", loginTime);
            setData({ access_token, access_ocpp_token, loginTime, authkey: "logged" });
            return true;
        } catch (e) {
            console.log('Erro encontrado:', e);
            return false;
        }
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem("@solTech:authkey");
        localStorage.removeItem("@solTech:access_ocpp_token");
        localStorage.removeItem("@solTech:access_token");
        localStorage.removeItem('@solTech:loginTime');
        setData({} as AuthState);
    }, []);


    return (
        <AuthContext.Provider value={{ user: { access_ocpp_token: data.access_ocpp_token, access_token: data.access_token, authkey: data.authkey, loginTime: data.loginTime }, signIn, signOut }}>
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