import { G_HOME_URL } from "../../../constants/constants"

const checkURL = () => {
    let split_url:Array<string> = window.location.href.split(G_HOME_URL);
    let url: string = split_url[1];

    if(url.includes("admin")) return "admin";
    else return "mentor";

}

const checkUserAccess = (domain_type:string, userType:number) => {
    let isValidUser:boolean = userType === 7;
    if(domain_type === "admin") isValidUser = userType === 8 || userType === 9;

    if(isValidUser) {
        return true;
    } else if (userType === 9) return true
    else return false

}

const LoginClickHandler = () => {
    let split_url: Array<string> = window.location.href.split(G_HOME_URL);
    let url: string = split_url[1];

    return window.location.href = G_HOME_URL + "login?rurl=" + url;

}

const NavStyle = (checkurl: string) => {
    let url: string = window.location.href;
    let style = {}
    if(url.includes(checkurl)) style = {borderBottom: "4px solid var(--primary)"}
    return style
}



export {checkURL, checkUserAccess, LoginClickHandler, NavStyle}