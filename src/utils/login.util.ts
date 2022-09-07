import { __setCookie, __deleteCookie, __getCookie } from "./cookie.util";
import keys from "../config/keys";
import { G_API_URL, G_URL, LEARN_PLAT_URL } from "../constants/constants";
// @ts-ignore
import CryptoJS from "crypto-js";
import axios from "axios";
import queryString from "query-string";

const login_user = (data:any):void => {
    let userToken = data.token;
    if (userToken !== undefined) {
        __setCookie(keys.cookiePrefix + "ut", userToken,1, "month");
    }
};

const socialLogin = function(provider:string, responseData:any, rurl:string, prurl:string, loginType:string) {
    // let data;

    // if (provider === "google") {
    //     const { googleId: social_id, email, name, imageUrl: user_image } = responseData.profileObj;
    //     const providerToken = responseData.tokenId;

    //     data = {
    //         provider: provider,
    //         social_id: social_id,
    //         name: name,
    //         email: email,
    //         user_image: user_image,
    //         provider_token: providerToken,
    //         rurl: rurl,
    //     };
    // }

    // if (provider === "facebook") {
    //     const providerToken = responseData.signedRequest;

    //     data = {
    //         provider: provider,
    //         social_id: responseData.id,
    //         name: responseData.name,
    //         email: responseData.email,
    //         user_image: responseData.picture.data.url,
    //         provider_token: providerToken,
    //         rurl: rurl,
    //     };
    // }

    // const config = {
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //     },
    // };

    // axios
    //     .post(G_API_FEED_URL + "auth/social-login/", queryString.stringify(data), config)
    //     .then((response) => {
    //         if (response.data.status === 1) {
    //             this.setState({ loginSuccess: true });
    //             this.openSuccessNotification();

    //             // Call Login Function
    //             login_user(response.data);

    //             if (prurl === "" || prurl === undefined || prurl === null) {
    //                 let redUrl;

    //                 if (!response.data.is_data_entered) {
    //                     redUrl =
    //                         response.data.rurl !== undefined && response.data.rurl !== ""
    //                             ? G_URL + "user-details/?rurl=" + response.data.rurl
    //                             : G_URL + "user-details";
    //                 } else {
    //                     redUrl =
    //                         response.data.rurl !== undefined && response.data.rurl !== ""
    //                             ? G_URL + response.data.rurl
    //                             : G_URL + "";
    //                 }
                    
    //                 if (this.props.loginType === 'external') {
    //                     setTimeout(() => {
    //                         window.close();
    //                     }, 1000);
    //                 } else {
    //                     if (this.props.loginType === 'popup') {
    //                         setTimeout(() => {
    //                             window.location.reload();
    //                         }, 1000);
    //                     } else {
    //                         setTimeout(() => {
    //                             window.location = decodeURIComponent(redUrl);
    //                         }, 2000);
    //                     }
    //                 }

    //             } else {
    //                 window.location = prurl;
    //             }
    //         } else {
    //             this.openFailureNotification(response.data.msg);
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
};

const check_login = ():boolean => {
    const token_cookie = __getCookie(keys.cookiePrefix + "ut");
    return (
        token_cookie.cookieExists &&
        token_cookie.cookieValue !== undefined &&
        token_cookie.cookieValue !== null
    );
};

const logout_user = ():void => {
    let cookies = document.cookie.split(";");
    cookies.map((cookie) => __deleteCookie(cookie.split("=")[0]));
    localStorage.removeItem("Nocookie");
    // Clear Storage
    localStorage.clear();
    sessionStorage.clear();
    // Clear learning platform cookie
    window.location.href = LEARN_PLAT_URL + 'auth/?t=unset_token&r_url=' + G_URL + "login";
};

const encHexSalt = (content:string):object => {
    interface Content {
        hex : string;
        salt : number;
    }
    
    let encContent:Content = {
        hex:"",
        salt:0
    };
    
    let content_B64 = CryptoJS.AES.encrypt(content, "BSLDFS");
    // let content_E64 = CryptoJS.enc.Base64.parse(content_B64);
    // let content_hex = content_E64.toString(CryptoJS.enc.Hex);
    encContent.hex = content_B64.ciphertext.toString();
    encContent.salt = content_B64.salt.toString();
    return encContent;
};

const isVerified = ():boolean => {
    var verified = true;
    if(__getCookie(keys.cookiePrefix + "verified").cookieExists) {
        verified = __getCookie(keys.cookiePrefix + "verified").cookieValue !== 'false'
    }
    return verified
}

const autoLogin = (emailEncryptedKey: any, rurl: any, setEnrollModal: any, is_ignite: any, scheduleWorkshop: Boolean = false, slug: string = "" ) => {
    const data = {
        encIK: emailEncryptedKey
    }

    // Redirect based on rurl
    let redUrl = rurl !== undefined ? rurl : '';

    axios.post(G_API_URL + "auth/token", queryString.stringify(data))
        .then(res => {
            if (res.data.status === 1) {
                const {lastActive, accountVerified} = res.data.data;
                // Remove encIK from store
                localStorage.removeItem('encIK');
                // Set First Login status based on lastActive
                if (lastActive === 1) {
                    localStorage.setItem('first-log', "true");
                }
                // Login user
                login_user(res.data.data);

                if (accountVerified) {
                    if (is_ignite === 'ignite_modal') {
                        setEnrollModal(false);
                        window.location.href=G_URL+"ignite/redr";
                    } else {
                        // Check if its payment RURL
                        let rurlCheck = redUrl.split('/')[0];
                        if (rurlCheck === 'payment') {
                            setTimeout(() => {
                                window.location.href = decodeURIComponent(G_URL + `${redUrl !== '' ? redUrl : ''}`);
                            }, 500);
                        } else {
                            // const searchQuery = localStorage.getItem('utmQuery');
                            // const searchQuery = __getCookie(keys.cookiePrefix + "utm").cookieValue;
                            setTimeout(() => {
                                window.location.href = decodeURIComponent(G_URL + "onboard/");
                            }, 500);
                        }
                    }
                } else {
                    window.location.href = G_URL + `activation/mobile?rurl=${redUrl}`;
                }
            } else {
                window.location.href = G_URL + `login?rurl=${redUrl}`;
            }
        })
        .catch(err => {
            console.log(err);
            window.location.href = G_URL + `login?rurl=${redUrl}`;
        })
}

export { login_user, socialLogin, check_login, logout_user, encHexSalt, isVerified, autoLogin };
