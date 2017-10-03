$(function() {
    searchSubmit();
    renderBackground();
    toggleOptions();
 });
function getDive(query, callback){
  const tasteDive_URL = 'https://tastedive.com/api/similar?q='+query+'&type=shows&info=1&limit=20&k=284615-BingeOn-6N8G8Z98';
     $.ajax({
     url: tasteDive_URL,
     q: '${query} in:name',
     type: 'shows',
     info: 1,
     limit: 5,
     k: '284615-BingeOn-6N8G8Z98',
     dataType: 'jsonp',
     callback: 'jsonp',
     success: function(data) {
       displayDive(data);
    }
  });
}

function displayDive(data){
  const diveData = data.Similar.Results;
  for (let i = 0; i <diveData.length; i++){
    let result = diveData[i];
    $('.js-results').append(`<div class="result ${i}">
                              <div class="result-name" id="${result.yID}">
                                <h2>${result.Name}</h2>
                                  <div class="result-info">
                                    <p>${result.wTeaser}</p>
                                  </div>
                                  <button type="button" class="option-button">
                                    Details
                                  </button>
                              </div>
                            </div>`);
                            $('.result-info').hide();                       
  }
}

function toggleOptions(data){
  $('.js-results').click(e => {
    e.preventDefault();
    console.log("button pressed");
    //const dataId = $(this).attr('id');
    //console.log(dataId);
    const buttonTarget = $(e.currentTarget).find('.result-info');
    buttonTarget.toggle();
  })
}

const YOUTUBE_SEARCH_URL='https://www.googleapis.com/youtube/v3/search';
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

function searchSubmit() {
  $('.js-search-form').submit(e => {
  e.preventDefault();
  const queryTarget = $(e.currentTarget).find('.js-query');
  const query = queryTarget.val();
  getDive(query);
  getYouTube(query);
  $('.js-results').empty();
  });
}

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
    $bg.attr('src', './img/' + chosen + '.png');
  }
  if ((win_w / win_h) < ($bg.width() / $bg.height())) {
    $bg.css({height: '100%', width: 'auto'});
  } else {
    $bg.css({width: '100%', height: 'auto'});
  } 
    }).resize();
  }