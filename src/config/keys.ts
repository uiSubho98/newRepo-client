import {G_COOKIE_DOMAIN, G_COOKIE_PREFIX, ENCRYPT_KEY, RZP_KEY, FB_ID, LIN_ID, GL_ID, GIT_ID} from "../constants/constants";

export default {
    cookieDomain: G_COOKIE_DOMAIN,
    cookiePrefix: G_COOKIE_PREFIX,
    rpSecretKey: {
        development: RZP_KEY,
        production: RZP_KEY
    },
    encryptKey: ENCRYPT_KEY,
    facebookClientId: FB_ID,
    linkedInClientID: LIN_ID,
    googleClientId: GL_ID,
    githubClientId: {
        dev: GIT_ID,
        prod: GIT_ID
    }
};