
function disable(msg){
    console.log('Disable Start');
    document.getElementById("outputData").innerHTML = `<p> ${msg} </p>`;
    // spinner
    document.getElementById('spinner').hidden = false;
    // change text in button
    document.getElementById("btnGetER").value = 'Loading...';
    document.getElementById("btnGetER").disabled=true; // disable button
    console.log('Disable Complete');
};


function enable(oldValue, htmlString){
    console.log('Enable Start');
    document.getElementById('spinner').hidden = true;
    document.getElementById("btnGetER").disabled=false;
    document.getElementById("btnGetER").value= oldValue;
    document.getElementById("outputData").innerHTML = htmlString;
    console.log('Enable Complete');
};


function handleHtml(result){
    console.log('Convert response to HTML table');
    var probability = result['Probability Match']
    var htmlString = `<p> The probability of a match is about: <b>${probability}</b> </p>`

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

document.getElementById("btnGetER").addEventListener("click", function(event){

    // var form = document.getElementsByClassName('needs-validation').inputForm;

    console.log('Starting ER Algo');

    // Get end point based on inputWord
    var company1 = $('#company1').val();
    var company2 = $('#company2').val();
    var oldValue = btnGetER.value;
    console.log("The company 1 is: " + company1);
    console.log("The company 2 is: " + company2);

    var URLENDPOINT = 'https://xk7q9x3n8e.execute-api.us-east-1.amazonaws.com/dev/lambda_handler';
    var urlEndpoint = URLENDPOINT + '?company1=' + company1 + '&company2=' + company2;
    console.log("The url endpoint is: " + urlEndpoint);
    msg = `Running ER algo on ${company1} and ${company2}`
    disable(msg); //disable

    hitEndpoint(urlEndpoint).then(
        response => {
        console.log("Response from endpoint: " + response);
        htmlString = handleHtml(response)
        console.log('Done with handleHtml, received: ' + htmlString)
        enable(oldValue, htmlString);
        });
    //let result = hitEndpoint(urlEndpoint)
    //console.log("Result from endpoint: " + result);
    //htmlString = handleHtml(result)
    //console.log('Done with handleHtml, received: ' + htmlString)
    //enable(oldValue, htmlString);
});

