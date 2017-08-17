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
var age;
var temp1 = new Array();
var recommendType;
var useLater;
var useLater2;



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

function makeButtonByDB(param) { //현재 이용x

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
  updateScrollbar();}


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
	var genderMsg ="남자 아이입니다.";
	var gender = "Male";
	setGender(genderMsg,gender);
})

$(document).on('click', '#btn1' , function(){ 
	var genderMsg = "여자 아이입니다.";
	var gender = "Female";
	setGender(genderMsg,gender);
})

$(document).on('click','#btn2',function(){
	age=0;
	setAge(age);
})

$(document).on('click','#btn3',function(){
	age=1;
	setAge(age);
})

$(document).on('click','#btn4',function(){
	age=2;
	setAge(age);
})
$(document).on('click','#btn5',function(){
	age=3;
	setAge(age);
 		
})
$(document).on('click','#btn6',function(){
	age=4;
	setAge(age);
})
$(document).on('click','#btn7',function(){
	age=5;
	setAge(age);
})
$(document).on('click','#btn8',function(){
	age=6;
	setAge(age);
})
$(document).on('click','#btn9',function(){
	age=7;
	setAge(age);
})
$(document).on('click','#btn10',function(){
	age=8;
	setAge(age);
})
$(document).on('click','#btn11',function(){
	age=9;
	setAge(age);
})
$(document).on('click','#btn12',function(){
	age=10;
	setAge(age);
})
$(document).on('click','#btn13',function(){
		var input = "연령에 맞는 책을 읽히고 싶어요."
		printMessage(input,"user"); //user가 버튼 눌렀을 때
		$.ajax({
		 	url: '/getByAge', 
		 	type: 'GET',
		 	data: {value :age},
			success:function(output){
					for(var i =0;i<output.contents.length;i++){
						 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].bookName+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].component+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].feature+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].minAge+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].maxAge+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].pen+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].price+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].prize+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].qrcode+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].summary+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].url+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].video+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].writer+ '</div>').appendTo($('.mCSB_container')).addClass('new');
						 updateScrollbar();
					}
				}				
		})		
})

$(document).on('click','#btn14',function(){
		var input = "아이가 원하는 책을 읽히고 싶어요. "
		printMessage(input,"user"); 
		var no="test";
		$.ajax({
	    	url: '/getId',
	    	type:'GET',
	    	data:{value:no},
	    	dataType: 'JSON',
	 		success: function (output){
	 			var jj=0			
	 			useLater = output;
	 			$.each(output.contents, function(k,v){
	 			var dynamicTag = "<div class='list'><input type='button' id='tmpButton"+ jj +"' value='" + output.contents[k].codeName + "'/></div>";
	 			$(dynamicTag).appendTo($('.mCSB_container'));
	 			 updateScrollbar();
				jj++;
	 			})
	 		}
	})		
	

	$(document).on('click','#tmpButton0',function(){
		preferenceEvent(0);
	})
	$(document).on('click','#tmpButton1',function(){
		preferenceEvent(1);
	})
	$(document).on('click','#tmpButton2',function(){
		preferenceEvent(2);
	})
	$(document).on('click','#tmpButton3',function(){
		preferenceEvent(3);
	})
	$(document).on('click','#tmpButton4',function(){
		preferenceEvent(4);
	})
	$(document).on('click','#tmpButton5',function(){
		preferenceEvent(5);
	})
	$(document).on('click','#tmpButton6',function(){
		preferenceEvent(6);
	})
	$(document).on('click','#tmpButton7',function(){
		preferenceEvent(7);
	})
	$(document).on('click','#tmpButton8',function(){
		preferenceEvent(8);
	})
	$(document).on('click','#tmpButton9',function(){
		preferenceEvent(9);
	})
	$(document).on('click','#tmpButton10',function(){
		preferenceEvent(10);
	})

})


$(document).on('click','#btn15',function(){
	
	var input = "학부모가 원하는 책을 읽히고 싶어요."
	printMessage(input,"user");
	var test="NULL";
	$.ajax({
 		url: '/getUid', 
 		type: 'GET',
 		data: {value:test},
 		dataType: 'JSON',
 		success: function (output){
 			var jj=0			
 			useLater2 = output;
 			$.each(output.contents, function(k,v){
 			var dynamicTag = "<div class='list'><input type='button' id='tmpButton2"+ jj +"' value='" + output.contents[k].codeName + "'/></div>";
 			$(dynamicTag).appendTo($('.mCSB_container'));
 			 updateScrollbar();
			jj++;
 			})
 		}
	})
	
	$(document).on('click','#tmpButton20',function(){
		parentPreferenceEvent(0);
	})
	$(document).on('click','#tmpButton21',function(){
		parentPreferenceEvent(1);
	})
	$(document).on('click','#tmpButton22',function(){
		parentPreferenceEvent(2);
	})
	$(document).on('click','#tmpButton23',function(){
		parentPreferenceEvent(3);
	})
	$(document).on('click','#tmpButton24',function(){
		parentPreferenceEvent(4);
	})
	
	
	
	
	
	
})

function parentPreferenceEvent(x){
	var sendMessage;
	var temp = useLater2.contents[x].codeName;
	sendMessage = temp+ "에 관심 있습니다.";
	var selectedId = useLater2.contents[x].codeId;
	printMessage(sendMessage,"user");
	var allData={"value_1":age,"value_2":selectedId};
		$.ajax({
			url:'/getBookByAgeAndUid',
			type:'GET',
			data:allData,
			success:function(output){
				if(output.contents.length==0){
					 var error = "선택한 나이에 맞는 아동이 원하는 아람 북스의 도서가 없습니다 ㅠㅠㅠ!";
					 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+error+ '</div>').appendTo($('.mCSB_container')).addClass('new');
					 updateScrollbar();
				}
				else{
					for(var i =0;i<output.contents.length;i++){
						 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].bookName+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].component+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].feature+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].minAge+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].maxAge+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].pen+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].price+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].prize+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].qrcode+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].summary+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].url+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].video+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].writer+ '</div>').appendTo($('.mCSB_container')).addClass('new');
						 updateScrollbar();
					}
					updateScrollbar();
				}
			}
		})
		
		
		
		
		
		
		
}





function preferenceEvent(x) {
		var sendMessage;
		var temp = useLater.contents[x].codeName;
		sendMessage = temp+ "에 관심 있습니다.";
		var selectedId = useLater.contents[x].codeId;
		printMessage(sendMessage,"user");
		var allData={"value_1":age,"value_2":selectedId};
			$.ajax({
				url: '/getById',
				type:'GET',
				data:allData,
				dataType: 'JSON',
				success: function (output){
					if(output.contents.length==0){
						 var error = "선택한 나이에 맞는 아동이 원하는 아람 북스의 도서가 없습니다 ㅠㅠㅠ!";
						 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+error+ '</div>').appendTo($('.mCSB_container')).addClass('new');
						 updateScrollbar();
					}
					else{
					for(var i =0;i<output.contents.length;i++){
						 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].bookName+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].component+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].feature+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].minAge+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].maxAge+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].pen+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].price+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].prize+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].qrcode+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].summary+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].url+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].video+ '</div>').appendTo($('.mCSB_container')).addClass('new');
			 			 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+output.contents[i].writer+ '</div>').appendTo($('.mCSB_container')).addClass('new');
						 updateScrollbar();
					}
				  }
				}
			})
}

function setGender(genderMsg,gender){
	var genderMale = "남자 아이입니다.";
	var gender = "Male";
	$.ajax({
 		url: '/setGender', 
 		type: 'GET',
 		data: {value :gender }
	})
	printMessage(genderMsg,"user"); //user가 버튼 눌렀을 때
	getJsonFromInbi(genderMsg,"bot"); //버튼에 대한응답. 
}

function setAge(age){
	var input = age+" 살입니다.";
		$.ajax({
	 		url: '/setAge', 
	 		type: 'GET',
	 		data: {value:age}
		})
		printMessage(input,"user"); //user가 버튼 눌렀을 때
		getJsonFromInbi(input,"bot"); //버튼에 대한응답. 
}







