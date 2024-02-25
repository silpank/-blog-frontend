//All API calls
import { baseUrl } from "./baseUrl";
import { commonAPI } from "./commonAPI";



//Register api call
export const registerAPI = async (user) => {
    return await commonAPI("post", `${baseUrl}/register`, user, "")
}

//Login API call
export const loginAPI = async (user) => {
    return await commonAPI("post", `${baseUrl}/login`, user, "")
}

// Get all Post
export const allPostAPI = async () => {
    const token = sessionStorage.getItem("token")
    const requestHeader = {
        'x-access-token': token
    }

    return await commonAPI("get", `${baseUrl}/allPosts`, "", requestHeader)
}

// addPostBackend function to add a new post
export const addPostAPI = async (postData) => {
    try {
        const token = sessionStorage.getItem("token");
        const requestHeader = {
            'x-access-token': token
        };
        return await commonAPI("post", `${baseUrl}/newPost`, postData, requestHeader)
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};
