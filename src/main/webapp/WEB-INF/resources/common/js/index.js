
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
	  var initMessage = "안녕하세요.아람 북스의 전집을 추천하고,소개해주는 아람봇이라고 합니다.책을 추천하기 위해 몇가지 질문을 드리겠습니다.책 추천을 받기 원하신다면 <시작>이라고 입력해주세요!";
	  setTimeout(function() {
	    $('.message.loading').remove();
	    $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+initMessage+ '</div>').appendTo($('.mCSB_container')).addClass('new');
	    setDate();
	    updateScrollbar();
	    i++;
	  }, 1000 + (Math.random() * 20) * 100);

	}


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
    	setTimeout(function() {
    	var sendMessage = msg.message;
    	$('<div class="message loading new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg"/></figure><span></span></div>').appendTo($('.mCSB_container'));
    	updateScrollbar();
        $('.message.loading').remove(); 
        
    	if(msg.uiScript!=null)
    		{
    		for(var i=0;i<msg.uiScript.uiScript.optionsLength;i++)
    			{
    			$(function(){
    			    $('button').on('click',function(){
    			    	var buttonValue = msg.uiScript.uiScript.options[i].text;
    			        var r= $('<input type="button" value="buttonValue"/>');
    			        $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg"/></figure>' + r + '</div>').appendTo($('.mCSB_container')).addClass('new');
    			    });
    			});
    			}
    		
    		}
    	else{
        //if(msg.out)
        $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg"/></figure>' + sendMessage + '</div>').appendTo($('.mCSB_container')).addClass('new');
    	}
        setDate();
        updateScrollbar();
        i++;
         }, 1000 + (Math.random() * 20) * 100);
    	
    }
}

function insertMessage() {
  msg = $('.message-input').val();
  console.log(msg);
  if ($.trim(msg) == '') {
    return false;
  }
  var id = "user";
  printMessage(msg,id);
  setDate();
  
  var result;
  
  $.ajax({
 		url: '/jsonTest', //apicontrol에서 겟챠!!
 		type: 'GET',
 		data: {value : msg},
 		dataType: 'JSON',
 		success: function (output){
 			result = output;
 			//printMessage(output.contents.data.message, output.id);
 			printMessage(output.contents.data, output.id);
 			console.log(result);
 		}
   })
   
 
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
  }, 1000 + (Math.random() * 20) * 100);
}

function category(){}

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
