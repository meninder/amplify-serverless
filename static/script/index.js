<script type="text/javascript">

       $(function() {
    $('#getPuns').click(function() {
        event.preventDefault();
        var form_data = new FormData($('#myform')[0]);
        console.log(form_data);
        $.ajax({
            type: 'POST',
            url: 'https://bmqu6eztu2.execute-api.us-east-1.amazonaws.com/default/testEvent',
            data: form_data,
            contentType: false,
            processData: false,
        }).done(function(data, textStatus, jqXHR){

            htmlCode = '<h1>Ajax Generator</h1>'
            $("#outputFunction").html(htmlCode);



        }).fail(function(data){
            alert('error!');
        });
    });
});


</script>