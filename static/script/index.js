
var outputFunction = document.getElementById("outputFunction");
var getPuns = document.getElementById("getPuns");
var URLENDPOINT = 'https://94xn5a9ye5.execute-api.us-east-1.amazonaws.com/default/getPuns';

getPuns.addEventListener("click", function(){

        var inputWord = $('#inputWord').val()
        console.log(inputWord)

        urlEndpoint = URLENDPOINT + '?input_word=' + inputWord
        console.log(urlEndpoint)

       var punRequest = new XMLHttpRequest();
        punRequest.open('GET', urlEndpoint);

        punRequest.onload = function(){
            var punData = punRequest.responseText;
            console.log(punData);
            renderHTML(punData)
            };

        punRequest.send();

});


function renderHTML(data){
    var htmlString = "";
    htmlString += "<p>" + data + "</p>";
    outputFunction.insertAdjacentHTML('beforeend', htmlString)
}
