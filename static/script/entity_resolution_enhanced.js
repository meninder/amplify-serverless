
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


function handleHtml(result, company1, company2){
    console.log('Convert response to HTML table');
    var match_case = result['match_case']
    var probability = result['probability'].toFixed(4)*100
    var key1 = result[company1]['key']
    var key2 = result[company2]['key']
    var key1_probability = (result[company1]['key_probability']*100).toFixed(2)
    var key2_probability = (result[company2]['key_probability']*100).toFixed(2)

    var ticker1 = result[company1]['ticker']
    var ticker2 = result[company2]['ticker']
    var ticker1_probability = (result[company1]['ticker_probability']*100).toFixed(2)
    var ticker2_probability = (result[company2]['ticker_probability']*100).toFixed(2)

    var htmlString = `<p style="font-size:40px">`
    if (match_case==4){
        htmlString += `<b>Not a Match!</b><br>`
    } else {
        htmlString += `<b>Match!</b><br>`
    }
    htmlString += `</p><p>`
    htmlString += `Case ${match_case} with probability <b>${probability}%</b> <br> </p>`

    htmlString += `<p>`
    htmlString += `Input entity 1: <u>${company1}</u> matched to key: <u>${key1}</u> with a probability: ${key1_probability}% <br>`
    htmlString += `Input entity 2: <u>${company2}</u> matched to key: <u>${key2}</u> with a probability: ${key2_probability}% <br>`
    if ((match_case==3)||(match_case==4)){
        htmlString += `Input entity 1: <u>${company1}</u> matched to ticker: <u>${ticker1}</u> with probability: ${ticker1_probability}% <br>`
        htmlString += `Input entity 2: <u>${company2}</u> matched to ticker: <u>${ticker2}</u> with probability: ${ticker2_probability}% <br>`
    }
    htmlString += `</p>`

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

    var URLENDPOINT = 'https://s2stql1k1h.execute-api.us-east-1.amazonaws.com/dev/lambda_handler';
    var urlEndpoint = URLENDPOINT + '?e1=' + company1 + '&e2=' + company2;
    console.log("The url endpoint is: " + urlEndpoint);
    msg = `Running ER algo on ${company1} and ${company2}`
    disable(msg); //disable

    hitEndpoint(urlEndpoint).then(
        response => {
        console.log("Response from endpoint: " + response);
        htmlString = handleHtml(response, company1, company2)
        console.log('Done with handleHtml, received: ' + htmlString)
        enable(oldValue, htmlString);
        });
    //let result = hitEndpoint(urlEndpoint)
    //console.log("Result from endpoint: " + result);
    //htmlString = handleHtml(result)
    //console.log('Done with handleHtml, received: ' + htmlString)
    //enable(oldValue, htmlString);
});

