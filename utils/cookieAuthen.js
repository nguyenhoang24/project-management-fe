import Cookies from 'js-cookie';

const cookiesConfig = require('./../config/cookies.env');
const AccessToken = cookiesConfig.AUTHEN.AccessToken;
const RefreshToken = cookiesConfig.AUTHEN.RefreshToken;
const UserInfo = cookiesConfig.AUTHEN.UserInfo;
const DeviceUsingWifi = cookiesConfig.AUTHEN.DeviceUsingWifi;
const SsVideo5 = cookiesConfig.AUTHEN.SsVideo5;
const SearchKey = cookiesConfig.AUTHEN.SearchKey;
const FirebaseToken = cookiesConfig.AUTHEN.FirebaseToken;
const LoginType = cookiesConfig.AUTHEN.LoginType;
const LoginCsrfState = cookiesConfig.AUTHEN.LoginCsrfState;

export function getAccessToken() {
    return Cookies.get(AccessToken);
}

export function setAccessToken(token, expired) {
    Cookies.set(AccessToken, token, { expires: expired * 1/86400000});
}

export function removeAccessToken() {
    Cookies.remove(AccessToken);
}

export function getRefreshToken() {
    return Cookies.get(RefreshToken);
}

export function setRefreshToken(token) {
    Cookies.set(RefreshToken, token, { expires: 7 });
}

export function removeRefreshToken() {
    Cookies.remove(RefreshToken);
}

export function getUserInfo() {
    if (process.browser) {
        return localStorage.getItem(UserInfo);
    }
}

export function setUserInfo(data) {
    if (process.browser) {
        localStorage.setItem(UserInfo, JSON.stringify(data));
    }
}

export function removeUserInfo() {
    if (process.browser) {
        localStorage.removeItem(UserInfo);
    }
}

export function getDeviceUsingWifi() {
    return Cookies.get(DeviceUsingWifi);
}

export function setDeviceUsingWifi(val) {
    Cookies.set(DeviceUsingWifi, val, { expires: 7 });
}

export function removeDeviceUsingWifi() {
    Cookies.remove(DeviceUsingWifi);
}

export function getSsVideo5() {
    if (process.browser) {
        return localStorage.getItem(SsVideo5);
    }
}

export function setSsVideo5(val) {
    if (process.browser) {
        localStorage.setItem(SsVideo5, JSON.stringify(val));
    }
}

export function removeSsVideo5() {
    if (process.browser) {
        localStorage.removeItem(SsVideo5);
    }
}

export function getFirebaseToken() {
    if (process.browser) {
        return localStorage.getItem(FirebaseToken);
    }
}

export function setFirebaseToken(val) {
    if (process.browser) {
        localStorage.setItem(FirebaseToken, JSON.stringify(val));
    }
}

export function removeFirebaseToken() {
    if (process.browser) {
        localStorage.removeItem(FirebaseToken);
    }
}

export function getSearchKey() {
    if (process.browser) {
        return localStorage.getItem(SearchKey);
    }
}

export function setSearchKey(val) {
    if (process.browser) {
        localStorage.setItem(SearchKey, JSON.stringify(val));
    }
}

export function removeSearchKey() {
    if (process.browser) {
        localStorage.removeItem(SearchKey);
    }
}

export function getLoginType() {
    return Cookies.get(LoginType);
}

export function setLoginType(val) {
    Cookies.set(LoginType, val, { expires: 7 });
}

export function removeLoginType() {
    Cookies.remove(LoginType);
}

export function getLoginCsrfState() {
    return Cookies.get(LoginCsrfState);
}

export function setLoginCsrfState(val) {
    Cookies.set(LoginCsrfState, val, { expires: 7 });
}

export function removeLoginCsrfState() {
    Cookies.remove(LoginCsrfState);
}
