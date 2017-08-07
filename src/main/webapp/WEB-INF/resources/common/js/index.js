var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
  }, 100);
});

var check = false;
var parameter;

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
    $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
  }
}

function printMessage(msg, id){
	$('<div class="message loading new"><figure class="avatar"><img src="/resources/common/robot.png"/></figure><span></span></div>').appendTo($('.mCSB_container'));
    $('.message.loading').remove(); 
    updateScrollbar();
     setTimeout(function() {
       if(id != "bot"){
      	 $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
      	 check = false;
       }
       else{
      	 $('<div class="message new"><figure class="avatar"><img src="/resources/common/robot.png"/></figure>' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
       }
       setDate();
       updateScrollbar();
       i++;
     }, 1000 + (Math.random() * 20) * 100);
}

function makeButton(output) {
	 var result = [];
	
	if(output.contents.data.uiScript != null){
			$.each(output.contents.data.uiScript.uiScript.options, function (k, v){
				result.push(v);
			});
			console.log(result);
	
			$.each(result, function(k, v){
			printMessage(result[k].text, output.id);
				
		});
	}
}

function insertMessage() {
  msg = $('.message-input').val();
  console.log(msg);
  if ($.trim(msg) == '') {
    return false;
  }
 
  printMessage(msg, "user");
  setDate();
  
 
  
  $.ajax({
 		url: '/jsonTest',
 		type: 'GET',
 		data: {value : msg},
 		dataType: 'JSON',
 		success: function (output){
 			printMessage(output.contents.data.message, output.id);
 			setTimeout(makeButton(output), 1000);
		}
  });
   
 
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
  }, 1000 + (Math.random() * 20) * 100);
}


$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})


$('.button').click(function(){
  $('.menu .items span').toggleClass('active');
   $('.menu .button').toggleClass('active');
});
