export class APICall {

    constructor(url){
        this.url = url;
    }

    send(data = {}) {
        
        return axios({ 
            method: "POST",
            url: this.url,
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => { 
            if (response.status >= 400) { // check for 4XX, 5XX, wtv
                return Promise.reject({
                    status: response.status,
                    message: response.statusText
                });
            }
            if (response.status >= 200 && response.status <= 202) {          
                return response.data.data;
            }
            return {};            
        })
        .catch((error)=>{            
            return Promise.reject({
                error: error                
            });                        
        });
    
    }
}