import React from "react";
import {LEARN_PLAT_URL} from "../../constants/constants";
import { __getToken } from "../../utils/user-details.util";

const RedirectForm = () => {
    return(
        <form
            key={'redirect'}
            method="POST"
            action={LEARN_PLAT_URL+'auth/'}
            name="learning_redirect"
            id="learning_redirect">
            <input
                className="hidden"
                type="hidden"
                name="t"
                placeholder="entity"
                value="set_token"
            />
            <input
                className="hidden"
                type="hidden"
                name="token"
                placeholder="token"
                value={__getToken()}
            />
            <input
                className="hidden"
                type="hidden"
                name="r_path"
                placeholder="r_path"
                value=""
                id="r_path"
            />
        </form>
    )
}

export default RedirectForm;