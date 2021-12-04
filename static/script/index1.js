
var outputData = document.getElementById("outputData");
var btnGetPuns = document.getElementById("btnGetPuns");
var spinner = document.getElementById('spinner');


function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
};

function waitScreen(inputWord){
    // Get end point based on inputWord

    console.log("The input word " + inputWord);

    // setting up waiting part
    outputData.innerHTML = `<p> Waiting to get puns for ${inputWord}</p>`;
    spinner.hidden = false;
    // change text in button
    var oldValue = btnGetPuns.value;
    btnGetPuns.value = 'Loading...';
    btnGetPuns.disabled=true; // disable button
    console.log('Waiting is setup');
};

function onClick() {
    console.log('Starting Pun Retrieval');
    var inputWord = $('#inputWord').val();
    waitScreen(inputWord);

    sleep(5000);

    console.log('re-enabling button');
    //spinner.hidden = true;
    btnGetPuns.disabled=false;
    //btnGetPuns.value= oldValue;

};

btnGetPuns.addEventListener("click", onClick)



