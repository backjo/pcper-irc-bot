$("#lookup-form").submit(function( event ) {
  event.preventDefault();
  var data = {};
  data.server = $('#server').val();
  data.channel = $('#channel').val();
  data.name = $('#name').val();
  data.targetString = $('#targetString').val();

  console.log('called');

  $.ajax({
    type: "POST",
    url: '/bot',
    data: data,
    complete: function(retData) {
      console.log(retData);
      if(retData && retData.responseJSON && retData.responseJSON.selected) {
        alert("Selected: " + retData.responseJSON.selected);
        $('#button').text("Start");
        $('#button').addClass('btn-success');
        $('#button').removeClass('btn-danger');
      } else {
        $('#button').text("Stop");
        $('#button').removeClass('btn-success');
        $('#button').addClass('btn-danger');
      }
    },
    dataType:'json'
  });

});
