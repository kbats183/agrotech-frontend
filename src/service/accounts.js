import {useEffect, useState} from "react";
import useCookie, {setCookie} from 'react-use-cookie';
import {API_PATH} from "../config";

const userFetch = (url, method = "GET", body = undefined) =>
    fetch(API_PATH + "users/" + url, {
        headers: {"Content-Type": "application/json"},
        method: method,
        body: method === "GET" ? undefined : JSON.stringify(body),
    })

export const useAccount = () => {
    const [userToken] = useCookie("userAuth");
    const [account, setAccount] = useState();

    const registration = (data) =>
        userFetch("", "POST", data)
            .then(async response => {
                if (response.ok) {
                    const resp = await response.json();
                    setCookie("userAuth", resp.login, {days: 1});
                    setAccount(resp);
                    return resp;
                }
            })
    const authorize = (login) =>
        userFetch(login)
            .then(response => {
                if (!response.ok) {
                    setAccount(undefined);
                    return undefined;
                } else {
                    response.json().then(resp => {
                        setCookie("userAuth", resp.login, {days: 1});
                        setAccount(resp);
                        return resp;
                    });
                }
            });
    const logout = () => {
        setCookie("userAuth", undefined, {days: 1});
        setAccount(undefined);
    };
    const updateProfile = ({_login, ...data}) =>
        userFetch(account.login + "/profile", "PUT", data)
            .then(async response => {
                if (!response.ok) {
                    return undefined;
                } else {
                    const resp = await response.json();
                    setAccount(resp)
                    return resp;
                }
            });

    useEffect(() => {
        if (userToken === undefined || userToken === "") {
            return;
        }
        authorize(userToken);
    }, [userToken])

    return {account, registration, authorize, logout, updateProfile};
};
