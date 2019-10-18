import {
    GET,
    POST,
    // PREFIX,
    // PORT
} from '../constants/api.constant';

export default class Http {

    static get(path, data = null) {
        return Http._request(GET, path, data);
    }

    static post(path, data = null) {
        return Http._request(POST, path, data);
    }

    static _request(method, path, data = null) {
        const fetchOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'include',
        };

        if (data) {
            fetchOptions.body = JSON.stringify(data);
        }

        return fetch(`/${path}`, fetchOptions)
            .then(resp => resp.json());
    }
}
