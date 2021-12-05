
var outputData = document.getElementById("outputData");
var btnGetPuns = document.getElementById("btnGetPuns");
var URLENDPOINT = 'https://abofr4qdyd.execute-api.us-east-1.amazonaws.com/default/getPuns';
var spinner = document.getElementById('spinner');

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
};



btnGetPuns.addEventListener("click", function(){

    console.log('Starting Pun Retrieval');

    // Get end point based on inputWord
    var inputWord = $('#inputWord').val();
    console.log("The input word " + inputWord);
    urlEndpoint = URLENDPOINT + '?input_word=' + inputWord;
    //urlEndpoint = URLENDPOINT
    console.log(urlEndpoint);


    // setting up waiting part
    outputData.innerHTML = `<p> Waiting to get puns for ${inputWord}</p>`;
    spinner.hidden = false;
    // change text in button
    var oldValue = btnGetPuns.value;
    btnGetPuns.value = 'Loading...';
    btnGetPuns.disabled=true; // disable button
    console.log('Waiting is setup')
    sleep(100)
    try {
    // Hit endpoint
    var punRequest = new XMLHttpRequest();
    punRequest.open('GET', urlEndpoint);
    punRequest.onload = function(){
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
        outputData.innerHTML = htmlString
        };
    punRequest.send();
    } catch(e){
        outputData.innerHTML = `<p> fail </p>`
    }


    console.log('re-enabling button');
    spinner.hidden = true;
    btnGetPuns.disabled=false;
    btnGetPuns.value= oldValue;
});
