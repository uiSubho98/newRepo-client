import { __getCookie } from "./cookie.util";
import keys from "../config/keys";

// @ts-ignore
import jwtDecode from "jwt-decode";

const decodeToken = () => {
    if (__getCookie(keys.cookiePrefix + "ut").cookieExists === false) return undefined;
    return jwtDecode(__getCookie(keys.cookiePrefix + "ut").cookieValue);
};

const __getUserName = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.name : "";
};

const __getFirstName = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? (decodedToken.foreName ? decodedToken.foreName : decodedToken.name) : "";
};

const __getEmail = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.email : "";
};

const __getToken = () => {
    const cookie = __getCookie(keys.cookiePrefix + "ut");
    if (cookie !== undefined && cookie.cookieValue !== null && cookie.cookieValue !== undefined) {
        return cookie.cookieValue;
    }
    return "";
};

const __getUID = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.uid : "";
};

const __getMobileNumber = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.mobileNumber : "";
};

const __getYear = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.year : undefined;
};

const __getUserType = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.userType : undefined;
};

const __getSubscriptions = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.subscriptions : undefined;
};

const __getPrograms = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined && decodedToken.programs !== undefined ? decodedToken.programs : [];
};

const __getUName = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.uname : "";
};

const __getProfilePicture = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.profilePic : "https://cdn.prograd.org/upp/default.png";
};

const __getProfileSetupStatus = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.isProfileSetup : false;
}

export {
    decodeToken,
    __getUserName,
    __getEmail,
    __getToken,
    __getUID,
    __getMobileNumber,
    __getYear,
    __getSubscriptions,
    __getUserType,
    __getUName,
    __getProfilePicture,
    __getFirstName,
    __getPrograms,
    __getProfileSetupStatus
};
