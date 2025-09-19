import { useRouter } from "vue-router";
import axios from "axios";

const JWT_TOKEN_NAME = "authToken";
const DEFAULT_REDIRECT_TO = "/Home";
const saveToken = (token) => {
  if (!token) {
    console.error("Bad token");
    return;
  }
  localStorage.setItem(JWT_TOKEN_NAME, token);
};

const getToken = () => {
  return localStorage.getItem(JWT_TOKEN_NAME);
};

/**
 * Tries to login.
 * Login for cloud authentication only.
 * @param {String} password
 * @param {Boolean|{to: String}} redirect
 */
const login = (password, redirect, router) => {
  axios
    .post("/api/auth/login", { password: password })
    .then((response) => {
      saveToken(response.data.token);
      window.dispatchEvent(new Event("authChanged"));
      if (redirect && router) {
        router.push(redirect.to ?? DEFAULT_REDIRECT_TO);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const isAuthenticated = () => {
  return !!getToken();
};

const logout = () => {
  localStorage.removeItem(JWT_TOKEN_NAME);
  window.dispatchEvent(new Event("authChanged")); // Уведомляем о выходе
};

export { login, isAuthenticated, logout, getToken };
