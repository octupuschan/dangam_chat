
var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
	  initMessage();
  }, 100);
});


function initMessage() {
	  if ($('.message-input').val() != '') {
	    return false;
	  }
	  $('<div class="message loading new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
	  updateScrollbar();
	  var initMessage = "안녕하세요.아람 북스의 전집을 추천하고,소개해주는 아람봇이라고 합니다. 책을 추천하기 위해 몇가지 질문을 드리겠습니다.책 추천을 받기 원하신다면 <시작>이라고 입력해주세요!";
	  setTimeout(function() {
	    $('.message.loading').remove();
	    $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+initMessage+ '</div>').appendTo($('.mCSB_container')).addClass('new');
	    setDate();
	    updateScrollbar();
	    i++;
	  }, 1000 + (Math.random() * 20) * 100);

	}




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
    if(id==="user"){
      $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new'); 
      setDate();
      updateScrollbar();
      i++;
    }
    else{
    	
    	$('<div class="message loading new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg"/></figure><span></span></div>').appendTo($('.mCSB_container'));
    	updateScrollbar();
        $('.message.loading').remove(); 
        $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg"/></figure>' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();
        i++;
       
    	
    }
}

function makeButton(output) {
	var result = [];
	
	$.each(output.contents.data.uiScript.uiScript.options, function (k, v){
		result.push(v);
	});
	console.log(result);
	
	$.each(result, function(k,v){ //반복문 한번 돌때마다 실행할 함수. 
		var dynamicTag = "<div class='message'><input type='button' id='btn" + result[k].text+ "' value='" + result[k].text + "'/></div>";
		$(dynamicTag).appendTo($('.mCSB_container'));
		 setDate();
	     updateScrollbar();
	});
}

function makeButtonByDB(output) {
	$.ajax({
		url: '/'+output.contents.data.uiScript.name,
		type: 'GET',
		data: {value : "not"},
		dataType: 'JSON',
		success: function (output){
			setTimeout(function(){
				$.each(output.contents, function(k,v){
					
				})
				
			}, 1000 );
		}
	});
}

function insertMessage(msg="",id="") {
  
	if(msg==""){
  msg = $('.message-input').val();
  }
  if ($.trim(msg) == '') {
    return false;
  }
  if(id==""){
	  var id = "user";
	  }
  printMessage(msg,id);
  setDate();
  
 
  
  $.ajax({
 		url: '/jsonTest', //apicontrol에서 겟챠!!
 		type: 'GET',
 		data: {value : msg},
 		dataType: 'JSON',
 		success: function (output){
 
 			printMessage(output.contents.data.message, output.id);
 			
 			if(output.contents.data.uiScript != null){
 				if(output.contents.data.uiScript.uiScript.options[0].id == "DB"){
 					setTimeout(makeButtonByDB(output), 1000 + (Math.random() * 20) * 100);
 				}
 				else{
 					setTimeout(makeButton(output), 1000 + (Math.random() * 20) * 100);
 				}
 			}
 		}
   })
   
 
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
  }, 1000 + (Math.random() * 20) * 100);
}




$(document).on("click","#btn여자",function(){ //최적화 needed
	var gender = "female";
	
	$.ajax({
 		url: '/jsonTest', //apicontrol에서 겟챠!!
 		type: 'GET',
 		data: {value : gender},
 		dataType: 'JSON',
 		success: function (output){
 		}

	var msg = "여자 아이입니다"
	var id ="user";
	insertMessage(msg,id);
	setDate();
});



$(document).on("click","#btn남자",function(){ //최적화 needed
	var gender = "male";
	var msg = "남자 아이입니다"
	var id ="user";
	insertMessage(msg,id);
	setDate();
});



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

