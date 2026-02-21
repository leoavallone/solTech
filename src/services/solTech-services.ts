import apiClient from "./api";
import { ISignUpData } from "../interfaces/signup.interfaces";
import { ISignInData } from "../interfaces/sign.interfaces";
import { sign } from "chart.js/helpers";

const signInPath = "/auth";
const signUpPath = "/users";
const signIn = async (data: ISignInData): Promise<any> => {
    return await apiClient.post(`${signInPath}`, data);
};

const signUp = async (data: ISignUpData): Promise<any> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone.replace(/\D/g, ''));
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("cpf", data.cpf.replace(/\D/g, ''));

    return await apiClient.post(`${signUpPath}`, formData, {
        headers: { "x-api-token": "bc22997835be3d139056f134d1b8cd37d89679c3", "Content-Type": "application/json" },
    });
};

const SoulTechServices = {
    signIn,
    signUp

}

export default SoulTechServices;