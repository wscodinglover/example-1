export default class Http {
    static get(url, body) {
        return this.request(url, 'get', body)
    }
    static post(url, body) {
        return this.request(url, 'post',body)
    }
    static request(url, method, body) {
        // let isOk;
        return new Promise((resolve, reject) => {
            fetch(url, {
                // mode:'no-cors',
                method,
                body,
            }).then((res) => {

                // isOk = !!res;

                console.log(res)

                return res;
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}