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
// get post Api
export const getPostApi = async (postId) => {
    try {
        const token = sessionStorage.getItem("token");
        const requestHeader = {
            'x-access-token': token
        };
        return await commonAPI("get", `${baseUrl}/getPost/${postId}`, '', requestHeader)
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
}

// Function to add a like to a post
export const addLikeAPI = async (postId) => {
    try {
        const token = sessionStorage.getItem("token");
        const requestHeader = {
            'x-access-token': token
        };
        return await commonAPI("post", `${baseUrl}/addLike/${postId}`, '', requestHeader);
    } catch (error) {
        console.error('Error adding like:', error);
        throw error;
    }
};

// Function to add a comment to a post
export const addCommentAPI = async (postId, commentData) => {
    try {
        const token = sessionStorage.getItem("token");
        const requestHeader = {
            'x-access-token': token
        };
        return await commonAPI("post", `${baseUrl}/addComment/${postId}`, commentData, requestHeader);
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

