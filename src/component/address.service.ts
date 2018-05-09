export namespace AddressService {
    /**
     * 
     * @method return Promisse with the answer from a HTTP request
     * This method is asynchronous
     * resp: contains the JSON with the response text of the request
     * rej: contains the JSON with the status text of the request
     * @param url 
     */
    export function getFromApi(url: string): Promise<any> {
        return new Promise((resp, rej) => {
            const httpReq = new XMLHttpRequest();
            httpReq.onload = () => {
                if (httpReq.status === 200) {
                    resp(JSON.parse(httpReq.responseText));
                } else {
                    rej(JSON.parse(httpReq.statusText));
                }
            }
            httpReq.open("GET", url, true);
            httpReq.send();
        });
    }

}