import { params } from 'library/helper';
import { post } from 'library/request';
import { isMobile } from "react-device-detect";

const c = {
    customer: 'ref',
    userToken: 'token',
    lang: 'lang',
    mobile: 'mobile',
}

export function userInfo() {
    return new Promise((resolve, reject) => {
        let ref = params(c.customer);
        let token = params(c.userToken);
        let lang = params(c.lang);
        let mobile = params(c.mobile);
        console.log(isMobile)
        if (!ref || !token) {
            reject('info-error')
        }
        else {
            post('auth', { ref, token })
                .then(data => {
                    if (data?.result == 'ok') {
                        lang = lang ? lang : data.data.lang;
                        mobile = mobile ? true : isMobile;

                        resolve({ ...data.data, lang, mobile })
                    }
                    else {
                        reject('info-error')
                    }
                })
        }

    });
}
