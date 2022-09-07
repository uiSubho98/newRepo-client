const __setCookie = (cookieName:string, cookieValue:string, 
    age:number = 5, age_format:string = "min") => {
    switch (age_format) {
        case "min": //Age in minutes
            age *= 60;
            break;
        case "hour": //Age in hours
            age *= 60 * 60;
            break;
        case "day": //Age in days
            age *= 60 * 60 * 24;
            break;
        case "month": //Age in months(month is taken as 30 days)
            age *= 60 * 60 * 24 * 30;
            break;
        case "year": //Age in years
            age *= 60 * 60 * 24 * 365;
            break;
        default: //Age in seconds
    }
    document.cookie = `${cookieName}=${cookieValue};max-age=${age};Path=/;`;
};

const __deleteCookie = (cookieName:string) => {
    cookieName = cookieName.trim();
    document.cookie = `${cookieName}=;Path=/;Expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};

const __getCookie = (name:string) => {
    let cookie = document.cookie.split(name + "=");
    let cookieValue, cookieExists;
    //if the split length is 2 that means cookie exists
    if (cookie.length === 2 && cookie[1]) {
        cookieValue = cookie[1].split(";")[0];
        cookieExists = true;
    } else cookieExists = false;
    return {
        cookieExists,
        cookieValue: cookieValue ? cookieValue : undefined,
    };
};

export { __setCookie, __deleteCookie, __getCookie };
