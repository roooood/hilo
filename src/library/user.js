import { params } from 'library/helper';
import { post } from 'library/request';
import { isMobile } from "react-device-detect";

const c = {
    customer: 'ref',
    userToken: 'token',
    lang: 'lang',
}

export function userInfo() {
    return new Promise((resolve, reject) => {
        let ref = params(c.customer);
        let token = params(c.userToken);
        let lang = params(c.lang);

        if (!ref || !token) {
            reject('info-error')
        }
        else {
            post('auth', { ref, token })
                .then(data => {
                    if (data?.result == 'ok') {
                        resolve({ ...data.data, lang })
                    }
                    else {
                        reject('info-error')
                    }
                })
        }

    });
}
