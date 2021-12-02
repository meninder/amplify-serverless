
var outputFunction = document.getElementById("outputFunction");
var getPuns = document.getElementById("getPuns");
var URLENDPOINT = 'https://abofr4qdyd.execute-api.us-east-1.amazonaws.com/default/getPuns';

getPuns.addEventListener("click", function(){

    var inputWord = $('#inputWord').val()
    console.log(inputWord)
    urlEndpoint = URLENDPOINT + '?input_word=' + inputWord
    //urlEndpoint = URLENDPOINT
    console.log(urlEndpoint)

    var punRequest = new XMLHttpRequest();
    punRequest.open('GET', urlEndpoint);

    punRequest.onload = function(){


        var punData = JSON.parse(punRequest.responseText);
        console.log(punData);
        var htmlString = ''
        for (var key in punData) {
            htmlString += '<p>'
            htmlString += punData[key][0]
            htmlString += '; orginal: ' + punData[key][1]
            htmlString += '</p>'
            }
        outputFunction.insertAdjacentHTML('beforeend', htmlString)

        };


    punRequest.send();

});
