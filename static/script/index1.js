
//var outputData = document.getElementById("outputData");
//var btnGetPuns = document.getElementById("btnGetPuns");
//var spinner = document.getElementById('spinner');

function sleep(miliseconds) {
    console.log('sleeping')
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {};
    console.log('waking')
};

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

function enable(oldValue){
    console.log('Enable Start');
    document.getElementById('spinner').hidden = true;
    document.getElementById("btnGetPuns").disabled=false;
    document.getElementById("btnGetPuns").value= oldValue;
    document.getElementById("outputData").innerHTML = `<p> Nothing special </p>`
};

function onClick() {
    console.log('Starting Pun Retrieval');
    var oldValue = document.getElementById("btnGetPuns").value;
    var inputWord = $('#inputWord').val();
    console.log("The input word " + inputWord);

    disable(inputWord); // part 1: disable
    sleep(4000); //part 2: long process
    enable(oldValue); //part3: enable
    };

//document.getElementById("btnGetPuns").addEventListener("click", onClick)


document.getElementById('btnGetPuns').addEventListener('click', function () {
        document.getElementById('outputData').innerHTML = '...';
        setTimeout(function () {
                sleep(1000);
                document.getElementById('outputData').innerHTML = 'content loaded!';
            }, 2000)
});