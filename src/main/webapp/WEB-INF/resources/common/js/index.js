/*
 * settimeout(function,second) -> second만큼의 시간 지난 후 function 실행. 
 * 
 * 
 * */
var $messages = $('.messages-content'),
    d, h, m,
    i = 0;
var j = 0; //j를 전역으로 선언해서 btn들이 구분 가능(버튼 제어 변수)

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
	    updateScrollbar();
	  }, 1000 + (Math.random() * 20) * 100);

	}

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function printMessage(msg, id){
    if(id==="user"){
      $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new'); 
     //setDate();
      updateScrollbar();
    }
    else{
    	
    	$('<div class="message loading new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg"/></figure><span></span></div>').appendTo($('.mCSB_container'));
    	updateScrollbar();
        $('.message.loading').remove(); 
        $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg"/></figure>' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
        updateScrollbar();
    }
}


function makeButton(param) {
	
	var result = [];
	
	$.each(param.contents.data.uiScript.uiScript.options, function (k, v){
		result.push(v);
	});
	console.log(result);
	

	
	$.each(result, function(k,v){//반복문 한번 돌때마다 실행할 함수. 
		
		var dynamicTag = "<div class='list'><input type='button' id='btn"+ j +"' value='" + result[k].text + "'/></div>";
		$(dynamicTag).appendTo($('.mCSB_container'));
	    updateScrollbar();
		
		$(document).on('click', '#btn'+j , function(){
			printMessage(result[k].id,"user");
			getJsonFromInbi(result[k].id,"bot");
		})
		
		j++;
		
	});
}

function makeButtonByDB(param) { //일단 이건 나중에 이해. 
	$.ajax({
		url: '/'+param.contents.data.uiScript.name,
		type: 'GET',
		data: {value : "not"},
		dataType: 'JSON',
		success: function (output){
			console.log(param);
			var index = 0;
			setTimeout(function(){
				$.each(output.contents, function(k,v){
					
					var dynamicTag = "<div class='list'><input type='button' id='btn"
						+ j 
						+"'value='" 
						+ output.contents[k].codeName + "'/></div>";
					
					$(dynamicTag).appendTo($('.mCSB_container'));
				    updateScrollbar();
					
					console.log(index);
					$(document).on('click', '#btn'+j , function(){
						printMessage(param.contents.data.uiScript.uiScript.options[index].id,"user");
						getJsonFromInbi(param.contents.data.uiScript.uiScript.options[index].id,"bot");
					})
					index++;
					j++;
				})
				
			}, 1000 );
		}
	});
}


function getJsonFromInbi(msg,id){
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
}

function insertMessage() {
  msg = $('.message-input').val();
  console.log(msg);
  if ($.trim(msg) == '') {
    return false;
  }
  var id = "user";
  printMessage(msg,id);
  getJsonFromInbi(msg,id);
  
 
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


