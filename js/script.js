
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // google Maps
  var street = $('#street').val();
  var city = $('#city').val();
  var address = street + ', ' + city;

  $greeting.text('So you want to live at '+ address + '?');

  var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address+'';
  $body.append('<img class="bgimg" src=" '+streetViewUrl+'" >');

// NY Times

  var nyTimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+city+'&sort=newest&api-key=5c94a200a2ad46d4bb839f4331e7d433';

  $.getJSON(nyTimesUrl, function( data ) {
    $nytHeaderElem.text('New York Times Articles About '+ city);
    articles = data.response.docs;
    for (var i = 0; i< articles.length; i++){
      var article = articles[i];
      $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');
    };
  }).fail(function() {
      $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
  });


// Wikipedia
  var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+city+'&format=json&callback=wikiCallback';

  var wikiTimeOut = setTimeout(function(){
  $wikiElem.text("failed to get wikipedia resources");
  }, 8000);


  $.ajax( {
    url: wikiUrl,
    dataType: 'jsonp',
    jsonp:"callback"
} ).done (function(response) {
   var articleList = response[1];
   var url = 'https://en.wikipedia.org/wiki/'+ articleList[0];
   $wikiElem.append('<li><a href= "'+url+'">' + articleList[0] +'</a></li>');

   for (var i =0; i < articleList.lenght; i++) {
   articleOne = articleList[i];

  };
});





    return false;
};

$('#form-container').submit(loadData);
