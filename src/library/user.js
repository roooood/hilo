import { params } from 'library/helper';
import { post } from 'library/request';
import { isMobile } from "react-device-detect";

const c = {
    customer: 'customer',
    user: 'user',
    lang: 'lang',
    mobile: 'mobile',
}

export function userInfo() {
    return new Promise((resolve, reject) => {
        let customer = params(c.customer);
        let user = params(c.user);
        let lang = params(c.lang);
        let mobile = params(c.mobile);
        if (!customer || !user) {
            reject('info-error')
        }
        else {
            post('auth', { customer, user })
                .then(res => {
                    if (res?.result == 'ok') {
                        lang = lang ? lang : res.data.lang;
                        mobile = mobile ? true : isMobile;

                        resolve({ ...res.data, lang, mobile, ref: customer })
                    }
                    else {
                        reject('info-error')
                    }
                })
        }

    });
}
