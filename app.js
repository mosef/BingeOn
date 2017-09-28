$(function() {
    searchSubmit();
    renderBackground();
 });
 //function to call testdive api
function getDive(query, callback){
  const tasteDive_URL = "https://tastedive.com/api/similar?q="+query+"&type=shows&info=1&limit=20&k=284615-BingeOn-6N8G8Z98";
     $.ajax({
     url: tasteDive_URL,
     q: '${query} in:name',
     type: 'shows',
     info: 1,
     limit: 20,
     k: '284615-BingeOn-6N8G8Z98',
     dataType: "jsonp",
     callback: 'jsonp',
     success: function(data) {
       console.log(data.Similar.Results);
       displayDive(data);
       //showData(data);
      /*const info = data.map(function(name) {
        return info.name + 'test';
      })
      console.log(info)*/

      /*info.forEach(function (index){
        //$(".js-results").append('<div class="result"><div class="result-name">'+`${index}`+'</div></div>')
        console.log(name)
      })*/
      //$(".js-results").append('<div class="result"><div class="result-name">'+`${data.Similar.Results[0].Name}`+'</div><div class="result-type">'+`${data.Similar.Results[0].Type}`+'</div><div class="result-teaser">'+`${data.Similar.Results[0].yUrl}`+'</div></div>')
     }
  });
}
function displayDive(data){
  const diveData = data.Similar.Results;
  for (let i = 0; i <diveData.length; i++) {
    let result = diveData[i];
    $(".js-results").append('<div class="result '+`${i}`+'"><div class="result-name"><h2>'+`${result.Name}`+'</h2></div><div class="result-info">'+`${result.wTeaser}`+'</div></div>')
    /*$(".js-results").append('<div class="result'+`${i}`+'">')
      $(".result"+`${i}`).append('<div class="result-name">'+`${result.Name}`+'</div>')
      $(".result-name"+`${i}`).append('<div class="result-info">'+`${result.wTeaser}`+'</div></div>')*/
  }
}

// name type wTeaser wUrl yUrl

// call to youtube api
const YOUTUBE_SEARCH_URL='https://www.googleapis.com/youtube/v3/search';
//function that gets the data from the api
function getYouTube(query, callback) {
  const params = {
    part: 'snippet',
    maxResults: 5,
    key: 'AIzaSyCL5bhmCSouEz_reGUWoLh2xDcFfDJ9bPk',
    q:`${query}`
  };
  $.getJSON(YOUTUBE_SEARCH_URL, params, callback);
}
function displayYouTubeData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
  console.log(data.items)
}

 //function to handle user search
function searchSubmit() {
  $('.js-search-form').submit(e => {
  e.preventDefault();
  const queryTarget = $(event.currentTarget).find('.js-query');
  const query = queryTarget.val();
  getDive(query);
  getYouTube(query);
  });
}

//function to handle background sizes
function renderBackground() {
  const win = $(window);
  win.resize(function() {
  const win_w = win.width(),
      win_h = win.height(),
      $bg   = $("#bg");
  const available = [
    1024, 1280, 1366,
    1400, 1680, 1920,
    2560, 3840, 4860
  ];
  const current = $bg.attr('src').match(/([0-9]+)/) ? RegExp.$1 : null;
  if (!current || ((current < win_w) && (current < available[available.length - 1]))) {
    var chosen = available[available.length - 1];
    for (var i=0; i<available.length; i++) {
      if (available[i] >= win_w) {
        chosen = available[i];
        break;
      }
    }
    // Set the new image
    $bg.attr('src', './img/' + chosen + '.png');
    // console.log('Chosen background: ' + chosen);
  }
  // Determine whether width or height should be 100%
  if ((win_w / win_h) < ($bg.width() / $bg.height())) {
    $bg.css({height: '100%', width: 'auto'});
  } else {
    $bg.css({width: '100%', height: 'auto'});
  } 
    }).resize();
  }