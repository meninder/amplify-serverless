
var outputFunction = document.getElementById("outputFunction");
var getPuns = document.getElementById("getPuns");
//var URLENDPOINT = 'https://94xn5a9ye5.execute-api.us-east-1.amazonaws.com/default/getPuns';
var URLENDPOINT = 'https://adhz5qf9f3.execute-api.us-east-1.amazonaws.com/default/test-12-2';

getPuns.addEventListener("click", function(){

        var inputWord = $('#inputWord').val()
        console.log(inputWord)

        //urlEndpoint = URLENDPOINT + '?input_word=' + inputWord
        urlEndpoint = URLENDPOINT
        console.log(urlEndpoint)

       var punRequest = new XMLHttpRequest();
       punRequest.open('GET', urlEndpoint);

        punRequest.onload = function(){
            var punData = JSON.parse(punRequest.responseText);
            console.log(punData);
            //console.log(punData.0);
            console.log(punData[0]);
            renderHTML(punData);
            };

        punRequest.send();

});


function renderHTML(data){
    var htmlString = "";
    htmlString += "<p>" + data + "</p>";
    outputFunction.insertAdjacentHTML('beforeend', htmlString)
}
