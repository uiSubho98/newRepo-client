const { notification } = require('antd');

// convert time into string
const convert_time_into_string = (time_in_sec:number, type:number = 1) => {
    var seconds = time_in_sec % 60;
    var minutes = Math.floor(time_in_sec / 60);
    var hours = Math.floor(minutes / 60);
    var days = -1;
    var weeks = -1;
    var months = -1;
    if (hours > 24) {
        days = Math.floor(hours / 24);
        hours %= 24;
    }
    if (days >= 7) {
        weeks = Math.floor(days / 7);
        days %= 7;
    }
    if (weeks >= 5) {
        months = Math.floor(weeks / 5);
        weeks %= 5;
    }
    if (minutes >= 60) minutes %= 60;

    var time_string = "";

    if (months !== -1) {
        time_string += months + "m ";
    }
    if (weeks !== -1) {
        time_string += weeks + "w ";
    }
    if (days !== -1) time_string += days + "d ";
    if (hours !== 0) time_string += hours + "h ";
    if (minutes !== 0) time_string += minutes + "m ";
    if (seconds === 0) {
        if (minutes === 0 && hours === 0) time_string += seconds + "s";
    } else time_string += seconds + "s";
    if(type === 1)
        return time_string;
    else
        return (hours > 9 ? hours : "0" + hours ) + " : " + 
        (minutes > 9 ? minutes : "0" + minutes) + " : " +
        (seconds > 9 ? seconds : "0" + seconds)
}

const getInitials = (name:string):string => {
    if (name !== undefined && name !== null) {
        const makeInitialsFromSingleWord = (word:string):string => {
            if (word.length > 1) {
                return word.substr(0, 2).toUpperCase();
            }
            return word.toUpperCase();
        }

        var words = name.split(" ");
        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }

        return makeInitialsFromSingleWord(name);
    }
    return "";
};

/*
        ******* @@@@ check_integer Fn() @@@@ *******
        Functionalities: 
                        Number.isInteger() is num => is integer return true else fale
                        if false Fix the decimal places to 2
*/

const check_integer = (num: number) => {
    if (Number.isInteger(num)) {
        return num;
    } else {
        return num.toFixed(2);
    }
};

const getSearchParam = (param:string) => {
    const urlParams = new URLSearchParams(window.location.search);
    let paramValue = urlParams.get(param);
    return paramValue;
}

// Notifications

const openNotification = (mode:string, msg:string, duration?:number, top?:number, container?:string) => {
    const args = {
        message: msg,
        description: '',
        duration: duration,
        top: top !== undefined ? top : 80,
        className: mode === 'success' ? 'success-notification-top' : (mode === 'warn' ? 'warning-notification-top' : 'failure-notification-top'),
        getContainer: () => container !== undefined ? document.querySelector(`${container}`) : document.body
    };
    notification.destroy();
    notification.open(args);
};

const getRandomString = (length:number):string => {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

const calcDuration = (secs: any) => {
    if (secs / 60 > 59) {
        let hrs = Math.round(secs / 3600)
        let mins = (secs - (hrs * 3600)) / 60
        return { hrs, mins }
    } else {
        return { hrs: 0, mins: (secs / 60) }
    }
}

const getUtmParams = ():string => {
    const searchQuery = window.location.search;
    // store UTM query in storage
    const isLoginPage = window.location.href.includes('login');
    if (searchQuery !== null && searchQuery !== '' && !isLoginPage) {
        localStorage.setItem('utmQuery', searchQuery);
    }
    return searchQuery;
}

const getScript = (isAsync:boolean= false) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    if(isAsync) {
        script.async = true;
    }
    return script;
}

const getGATag = (action: string,category: string,
    label: string, value?: number) => {
    const script = getScript(true);
    let eventValue = "";
    if(value !== undefined) {
        eventValue = "'value':" + value + "\n";
    }
    script.innerHTML = 
    "gtag('event','"+action+"',{\n"+
    "'event_category':'"+category+"',\n"+
    "'event_label': '"+label+"',\n"+
    eventValue +
    "})";
    return script;
}

const handleRegistrationSrc = (source: string) => {
    if (source === 'nav' || source === 'footer' || source === 'testimonial') {
        let regSrc = window.location.pathname.split("/");
        let src = '';
        if (regSrc !== undefined && regSrc[1] !== undefined)
            src = regSrc[1];
        else
            localStorage.setItem('regSrc', source);
        localStorage.setItem('regSrc', src === '' ? 'home-'+source : src + "-"+source);
    } else {
        localStorage.setItem('regSrc', source);
    }
}

const openUrlInNewTab = (url: string) => {
    return window.open(url, "_blank")
}

const onboardRedirect = (history: any): boolean  => {
    if(localStorage.getItem("onboardRedirect") !== null){
        localStorage.removeItem("onboardRedirect");
        history.push('/register');
        return true;
    }
    return false;
}

/*
    ******** @@@@ openFailureNotification @@@@ ********
    Maintainer: RG
    Functionality:
                Red color failed notification on top
*/

const openFailureNotification = (msg: string) => {
    const args = {
        message: msg,
        description: "",
        duration: 4,
        top: 0,
        className: "failure-notification-top",
    };
    notification.open(args);
};

const titleCase = (str: string) => {
    return str.toLowerCase().split('_').map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join('_');
}

export { 
    convert_time_into_string, 
    getInitials, 
    check_integer, 
    getSearchParam,
    openNotification,
    getRandomString,
    calcDuration,
    getUtmParams,
    getScript,
    getGATag,
    openUrlInNewTab,
    handleRegistrationSrc,
    onboardRedirect,
    openFailureNotification,
    titleCase
};
