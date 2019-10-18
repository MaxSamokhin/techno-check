import {
    GET,
    POST,
    DELETE
} from './../constant/api.constant';

export default class Http {

    static get(path, data = null) {
        return Http._request(GET, path, data);
    }

    static post(path, data = null) {
        return Http._request(POST, path, data);
    }

    static delete(path, data = null) {
        return Http._request(DELETE, path, data);
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
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }

                return resp.json().then(body => ({
                    ...body,
                    status: 'error'
                }));
            });
    }
}
