var outputData = document.getElementById("outputData");
var btnGetPuns = document.getElementById("btnGetPuns");
var URLENDPOINT = 'https://abofr4qdyd.execute-api.us-east-1.amazonaws.com/default/getPuns';
var spinner = document.getElementById('spinner');


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
};


function hitEndpoint(urlEndpoint){
    try {
    // Hit endpoint
        var punRequest = new XMLHttpRequest();
        punRequest.open('GET', urlEndpoint);
        punRequest.onload = function(){
            console.log('in onload')
            var punData = JSON.parse(punRequest.responseText);
            console.log(punData);
            var htmlString = `<table class="table">
            <thead>
                <tr>
                    <th scope="col"> Pun </th>
                    <th scope="col"> Original </th>
                </tr>
            </thead>
            <tbody>`

            for (var key in punData) {
                htmlString += '<tr>'
                htmlString += '<td>'
                htmlString += punData[key][0]
                htmlString += '</td>'
                htmlString += '<td>'
                htmlString += punData[key][1]
                htmlString += '</td>'
                htmlString += '</tr>'

                }
            htmlString += '</tbody></table>'
            console.log(htmlString)
        };
        punRequest.send();
        return htmlString;
        } catch(e){
            htmlString = `<p> fail </p>`
            console.log(htmlString)
            return htmlString;
        };

};



btnGetPuns.addEventListener("click", function(){

    console.log('Starting Pun Retrieval');

    // Get end point based on inputWord
    var inputWord = $('#inputWord').val();
    var oldValue = btnGetPuns.value;
    console.log("The input word " + inputWord);
    var urlEndpoint = URLENDPOINT + '?input_word=' + inputWord;
    console.log(urlEndpoint);

    disable(inputWord); //disable
    var htmlString = hitEndpoint(urlEndpoint); // get html
    enable(oldValue, htmlString); //enable and update
});
