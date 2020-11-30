import axios from 'axios';

export const apiUrl = window.location.protocol + '//localhost:2567';
export const serverUrl = (window.location.protocol === 'https:' ? 'wss' : 'ws') + '://localhost:2567';

const axiosBase = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    validateStatus: function () {
        return true;
    }
});


export const get = async (path) => {
    try {
        const res = await axiosBase.get(path);
        const { data } = await res;
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

export const post = async (path, items) => {
    try {
        // const form = new FormData()
        // for (const key in items) {
        //     form.append(key, items[key]);
        // }
        let form = [];
        for (let property in items) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(items[property]);
            form.push(encodedKey + "=" + encodedValue);
        }
        form = form.join("&");

        const res = axiosBase.post(path, form);
        const { data } = await res;
        return data;
    } catch (error) {
        return await 'net-error';
    }
}


export default { get };