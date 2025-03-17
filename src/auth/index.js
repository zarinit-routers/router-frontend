import { useRouter } from "vue-router";
import axios from "axios";

const JWT_TOKEN_NAME = "authToken";
const DEFAULT_REDIRECT_TO = "/";
const saveToken = (token) => {
    if (!token) {
        console.error("Bad token");
        return;
    }
    localStorage.setItem(JWT_TOKEN_NAME, response.data.token); // Пример
};
const getToken = () => {
    return localStorage.getItem(JWT_TOKEN_NAME);
};
/**
 * Tries to login.
 * Login for cloud authentication only.
 * @param {String} email
 * @param {String} password
 * @param {Boolean|{to: String}} redirect
 * @example
 * login("email", "password", false)
 * login("email", "password", {to: "/home"})
 */
const login = (email, password, redirect) => {
    axios
        .post("/api/auth", {
            email: email,
            password: password,
        })
        .then((response) => {
            saveToken(response.data.token);
            if (redirect) {
                useRouter().push(redirect.to ?? DEFAULT_REDIRECT_TO);
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

/**
 * Returns authentication token, if token is empty than user is not authenticated
 * @returns {String}
 */
const isAuthenticated = () => {
    return getToken();
};

export { login, isAuthenticated };
