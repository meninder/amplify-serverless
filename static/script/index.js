
function disable(inputWord){
    console.log('Disable Start');
    document.getElementById("outputData").innerHTML = `<p> Waiting to get puns for ${inputWord}</p>`;
    // spinner
    document.getElementById('spinner').hidden = false;
    // change text in button
    document.getElementById("btnGetPuns").value = 'Loading...';
    document.getElementById("btnGetPuns").disabled=true; // disable button
    console.log('Disable Complete');
};


function enable(oldValue, htmlString){
    console.log('Enable Start');
    document.getElementById('spinner').hidden = true;
    document.getElementById("btnGetPuns").disabled=false;
    document.getElementById("btnGetPuns").value= oldValue;
    document.getElementById("outputData").innerHTML = htmlString;
    console.log('Enable Complete');
};


function handleHtml(response){
    console.log('Convert response to HTML table');
    var htmlString = `<table class="table">
            <thead>
                <tr>
                    <th scope="col"> Pun </th>
                    <th scope="col"> Original </th>
                </tr>
            </thead>
            <tbody>`

            for (var key in response) {
                htmlString += '<tr>'
                htmlString += '<td>'
                htmlString += response[key][0]
                htmlString += '</td>'
                htmlString += '<td>'
                htmlString += response[key][1]
                htmlString += '</td>'
                htmlString += '</tr>'

                };
            htmlString += '</tbody></table>';
    return htmlString;
};

function hitEndpoint(urlEndpoint){
    // Hit endpoint
    console.log('In endpoint');
    const promise = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', urlEndpoint);
        xhr.responseType = 'json';

        xhr.onload = () => {
          console.log("In request onload");
          if (xhr.status >= 400) {
            reject(xhr.response);
          } else {
            resolve(xhr.response);
            console.log("The response is : " + xhr.response);
          }
        };
        xhr.onerror = () => {
            reject('Something went wrong!');
        };
        xhr.send();
    });
    return promise;
};



document.getElementById("btnGetPuns").addEventListener("click", function(){

    console.log('Starting Pun Retrieval');

    // Get end point based on inputWord
    var inputWord = $('#inputWord').val();
    var oldValue = btnGetPuns.value;
    console.log("The input word is: " + inputWord);

    var URLENDPOINT = 'https://abofr4qdyd.execute-api.us-east-1.amazonaws.com/default/getPuns';
    var urlEndpoint = URLENDPOINT + '?input_word=' + inputWord;
    console.log("The url endpoint is: " + urlEndpoint);
    disable(inputWord); //disable

    hitEndpoint(urlEndpoint).then(
        response => {
        console.log("Response from endpoint: " + response);
        htmlString = handleHtml(response)
        console.log('Done with handleHtml, received: ' + htmlString)
        enable(oldValue, htmlString);
        });
});
