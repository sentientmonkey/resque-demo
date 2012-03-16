$(document).ready(function(){

  function get_status(){
    var job_status = $('#job-status');
    if(job_status.data("url")){
      $.ajax({ url: job_status.data("url"),
               dataType: 'json',
               contentType: 'application/json',
               error: function(xhr){
                 alert(xhr);
               },
               success: function(data){
                 console.log(data);
                 $("#job-status").text(data);
                 if(data.status == "working"){
                   $("#message").text(data.message);
                   $("#progressbar").data("value", data.num);
                   $("#progressbar").show();
                   $("#progressbar").progressbar({value : $("#progressbar").data("value")});
                 } else {
                   $("#message").text(data.message);
                   $("#progressbar").data("value", "");
                   $("#progressbar").hide();
                 }
                 if(data.status != "completed"){
                   setTimeout(get_status, 1000);
                 }
               }
      });
    }
  }


  $(".button").button();
  
  get_status();
});
