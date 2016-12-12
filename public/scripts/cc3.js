console.log( 'js' );

$( document ).ready( function(){
  init();
}); // end doc ready

function init(){
  getJokes();

  $( '#addJokeButton' ).on( 'click', addJoke);
} // end init()

function addJoke(){
  console.log('adding to the hahaha');
  var newJoke =  {
      whoseJoke: $('#whoseJokeIn').val(),
      jokeQuestion: $('#questionIn').val(),
      punchLine: $('#punchlineIn').val()
    }
    $('input').val('');
  console.log('new joke is: ', newJoke);

  $.ajax({
    type: 'POST',
    url: '/new',
    data: newJoke,
    success: function(response){
      console.log('Recieved revised joke list: ', response);
      displayJokes(response);
    },
    error: function(err){
      console.log('Server failed with error: ', err);
    }
  }); // end ajax
} // end addJoke()

function getJokes(){
  console.log('getting the laughter');

  $.ajax({
    type: 'GET',
    url: '/jokes',
    success: function(response){
      console.log('got it!:', response);
      displayJokes(response);
    },
    error: function(err){
      console.log('Server failed with error: ', err);
    }
  }); // end ajax
} // end getJokes()

function displayJokes(array){
  console.log('lol coming to the screen');
  $('#outputDiv').html('');
  for (var i = 0; i < array.length; i++) {
    var outputHTML = '<div class="joke"><p class="question">Question: '+ array[i].jokeQuestion +
                      '</p><p class="punchLine">Punch-Line: '+ array[i].punchLine +
                      '</p><p class="whose">By: '+ array[i].whoseJoke +
                      '</p></div>';
    $('#outputDiv').append(outputHTML);
  } // end for
}// end displayJokes()
