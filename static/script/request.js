


const sendHttpRequest = (urlEndpoint) => {
    const promise = new Promise((response, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', urlEndpoint);

        //listener
        xhr.responseType = 'json';
        xhr.onload = () => {
            resolve(xhr.response);
        };

        xhr.send();
    });
    return promise;
};


const getData = () => {
    var urlEndpoint = 'https://reqres.in/api/users';
    sendHttpRequest(urlEndpoint).then(responseData => {
        console.log(responseData);
    });
};



punRequest.onload = function(){
    console.log('in onload')
    var punData = JSON.parse(punRequest.responseText);
    console.log(punData);
    };
punRequest.send();