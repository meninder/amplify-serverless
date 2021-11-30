
var outputFunction = document.getElementById("outputFunction");
var getPuns = document.getElementById("getPuns");
var URLENDPOINT = 'https://bmqu6eztu2.execute-api.us-east-1.amazonaws.com/default/testEvent';

getPuns.addEventListener("click", function(){

        var inputWord = $('#inputWord').val()
        console.log(inputWord)

        urlEndpoint = URLENDPOINT + 'user_id?user_id=' + inputWord
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
