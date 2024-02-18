//All API calls
import { baseUrl } from "./baseUrl";
import { commonAPI } from "./commonAPI";

//Register api call
export const registerAPI = async()=>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")
}

//Login API call
export const loginAPI = async(user) =>{
    return await commonAPI("post",`${baseUrl}/login`,user,"")
}
