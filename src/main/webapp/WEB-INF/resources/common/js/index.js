/*
 * settimeout(function,second) -> second만큼의 시간 지난 후 function 실행. 
 * 
 * 
 * */
var $messages = $('.messages-content'),
    d, h, m,
    i = 0;
var j = 0; //j를 전역으로 선언해서 btn들이 구분 가능(버튼 제어 변수)
var p=0;

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
	    $('.message.loading').remove();
	    $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+initMessage+ '</div>').appendTo($('.mCSB_container')).addClass('new');
	    updateScrollbar();
	}

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function printMessage(msg, id){ //그냥 inbi의 텍스트(not uiScript) 와 user의 인풋만 처리. 
    if(id==="user"){
      $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new'); 
      updateScrollbar();
    }
    else{
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
		j++;
	});
}

function makeButtonByDB(param) { //일단 이건 나중에 이해. (needtofix)
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
 
 			
 			printMessage(output.contents.data.message, output.id); //그냥 inbi의 텍스트(not uiScript)
 			if(output.contents.data.uiScript != null){
 				if(output.contents.data.uiScript.uiScript.options[0].id == "DB"){ //db에서 데이터 꿀어와야할지말지?? 
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

$(document).on('click', '#btn0' , function(){ 
	var genderMale = "남자 아이입니다.";
	var gender = "Male";
	$.ajax({
 		url: '/setGender', 
 		type: 'GET',
 		data: {value :gender }
	})
	printMessage(genderMale,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(genderMale,"bot"); //버튼에 대한응답. 
})

$(document).on('click', '#btn1' , function(){ 
	var genderMale = "여자 아이입니다.";
	var gender = "Female";
	$.ajax({
 		url: '/setGender', 
 		type: 'GET',
 		data: {value :gender }
	})
	printMessage(genderMale,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(genderMale,"bot"); //버튼에 대한응답. 
})

$(document).on('click','#btn2',function(){
	var input = "0 살입니다."
	var age = 0;
	$.ajax({
 		url: '/setAge', 
 		type: 'GET',
 		data: {value :age }
	})
	printMessage(input,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})

$(document).on('click','#btn3',function(){
	var input = "1 살입니다."
	var age = 1;
	$.ajax({
 		url: '/setAge', 
 		type: 'GET',
 		data: {value :age }
	})
	printMessage(input,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})

$(document).on('click','#btn4',function(){
	var input = "2 살입니다."
	var age = 2;
	$.ajax({
 		url: '/setAge', 
 		type: 'GET',
 		data: {value :age }
	})
	printMessage(input,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})
$(document).on('click','#btn5',function(){
	var input = "3 살입니다."
	var age = 3;
	$.ajax({
 		url: '/setAge', 
 		type: 'GET',
 		data: {value :age }
	})
	printMessage(input,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})
$(document).on('click','#btn6',function(){
	var input = "4 살입니다."
	var age = 4;
	$.ajax({
 		url: '/setAge', 
 		type: 'GET',
 		data: {value :age }
	})
	printMessage(input,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})
$(document).on('click','#btn7',function(){
	var input = "5 살입니다."
	var age = 5;
	$.ajax({
 		url: '/setAge', 
 		type: 'GET',
 		data: {value :age }
	})
	printMessage(input,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})
$(document).on('click','#btn8',function(){
	var input = "6 살입니다."
	var age = 6;
	$.ajax({
 		url: '/setAge', 
 		type: 'GET',
 		data: {value :age }
	})
	printMessage(input,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})
$(document).on('click','#btn9',function(){
	var input = "7 살입니다."
	var age = 7;
	$.ajax({
 		url: '/setAge', 
 		type: 'GET',
 		data: {value :age }
	})
	printMessage(input,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})
$(document).on('click','#btn10',function(){
	var input = "8 살입니다."
	var age = 8;
	$.ajax({
 		url: '/setAge', 
 		type: 'GET',
 		data: {value :age }
	})
	printMessage(input,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})
$(document).on('click','#btn11',function(){
	var input = "9 살입니다."
	var age = 9;
	$.ajax({
	 	url: '/setAge', 
	 	type: 'GET',
	 	data: {value :age }
	})
	printMessage(input,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})
$(document).on('click','#btn12',function(){
		var input = "10 살입니다."
		var age = 10;
		$.ajax({
		 	url: '/setAge', 
		 	type: 'GET',
		 	data: {value :age }
		})
		printMessage(input,"user"); //user가 버튼 눌렀을 때
		getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})
$(document).on('click','#btn13',function(){
		var input = "연령에 맞는 책을 읽히고 싶어요."
		var preference = "byAge"
		$.ajax({
		 	url: '/setPreference', 
		 	type: 'GET',
		 	data: {value :preference }
		})
		printMessage(input,"user"); //user가 버튼 눌렀을 때
		getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})
$(document).on('click','#btn14',function(){
		var input = "아이가 원하는 책을 읽히고 싶어요. "
		var preference ="byChild";
		$.ajax({
		 	url: '/setPreference', 
		 	type: 'GET',
		 	data: {value :preference }
		})
		printMessage(input,"user"); //user가 버튼 눌렀을 때
		getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})
$(document).on('click','#btn15',function(){
		var input = "학부모가 원하는 책을 읽히고 싶어요."
		var preference ="byParent"
		$.ajax({
		 	url: '/setPreference', 
		 	type: 'GET',
		 	data: {value :preference }
		})
		printMessage(input,"user"); //user가 버튼 눌렀을 때
		getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
})




