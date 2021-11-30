
var outputFunction = document.getElementById("outputFunction")
var getPuns = document.getElementById("getPuns")

getPuns.addEventListener("click", function(){
        var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://bmqu6eztu2.execute-api.us-east-1.amazonaws.com/default/testEvent');
    ourRequest.onload = function(){
        var ourData = ourRequest.responseText;
        console.log(ourData);
        renderHTML(ourData)
    };

    ourRequest.send();

});


function renderHTML(data){
    var htmlString = "";
    htmlString += "<p>" + data + "</p>";
    outputFunction.insertAdjacentHTML('beforeend', htmlString)
}
