import apiClient from "./api";
import { ISignUpData } from "../interfaces/signup.interfaces";
import { ISignInData } from "../interfaces/sign.interfaces";
import { sign } from "chart.js/helpers";

const signInPath = "/user/signin";
const signUpPath = "/user/create";
const signIn = async (data: ISignInData): Promise<any> => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    return await apiClient.post(`${signInPath}`, formData, {
        headers: { "x-api-token": "bc22997835be3d139056f134d1b8cd37d89679c3", "Content-Type": "application/json" },
    });
};

const signUp = async (data: ISignUpData): Promise<any> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone.replace(/\D/g, ''));
    formData.append("password", data.password);
    formData.append("type", data.tipoPessoa);
    formData.append("occupation", data.occupation);
    formData.append("document", data.document.replace(/\D/g, ''));

    return await apiClient.post(`${signUpPath}`, formData, {
        headers: { "x-api-token": "bc22997835be3d139056f134d1b8cd37d89679c3", "Content-Type": "application/json" },
    });
};

const SoulTechServices = {
    signIn,
    signUp

}

export default SoulTechServices;