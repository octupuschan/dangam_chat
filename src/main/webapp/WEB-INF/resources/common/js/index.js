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
var index = 100;


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
		  var initMessage = "안녕하세요.아람 북스의 전집을 추천하고,소개해주는 아람봇이라고 합니다. 책을 추천하기 위해 몇가지 질문을 드리겠습니다.책 추천을 받기 원하신다면 <시작>이라고 입력해주세요! 또 중간에 처음으로 돌아가고 싶으시다면 언제나 <시작>이라고 입력해 주세요!";
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
	if(msg=="시작"){
		j=0;
		$('.message.new').remove();
		$('.list').remove();
		$('.message.message-personal.new').remove();
	}

	var id = "user";
	printMessage(msg,id);
	getJsonFromInbi(msg,id);
  
 
	$('.message-input').val(null);
	updateScrollbar();
 }

function getLocation() {
	  if (navigator.geolocation) { //
	    navigator.geolocation.getCurrentPosition(function(position) {
	    	getAddress(position.coords.latitude,position.coords.longitude);
	    }, function(error) {
	      console.error(error);
	    }, {
	      enableHighAccuracy: false,
	      maximumAge: 0,
	      timeout: Infinity
	    });
	  } else {
	    alert('GPS를 켜주세요.');
	  }
}


function getAddress(lat, lgt){
	var key = "0cb38252985b6cd1aeb88b334813925c";
	$.ajax({
    	url: 'https://dapi.kakao.com/v2/local/geo/coord2address.json',
    	type:'GET',
    	data:{y : lat, x : lgt, appkey : key},
    	dataType: 'JSON',
 		success: function (output){
 			//var mainCity = output.documents[0].address.region_1depth_name;
 			//var subCity = output.documents[0].address.region_1depth_name;
 			var mainCity = "서울";
 			var subCity = "강북구";
 			
 			$.ajax({
 				url: '/getBranchInfo',
 				type: 'GET',
 				data:{value_1 : mainCity, value_2 : subCity},
 				dataType: 'JSON',
 				success: function (output){ 
 					var dynamicTag = 
 						"<div class='list'>" +
 							"<table>" +
 								"<tr>" +
 									"<th>지점명</th><th>주소</th><th>연락처</th>" +
 									"<tr>" +
 										"<td>"+output.contents[0].branchName+"</td>" +
 										"<td>"+output.contents[0].branchAddrs+"</td>" +
 										"<td>0"+output.contents[0].branchTelFront+"-"+output.contents[0].branchTelMid+"-"+output.contents[0].branchTelLast+"</td>" +
 									"</tr>"+
 								"</tr>" +
 							"</table>" +
 						"</div>";
 					$(dynamicTag).appendTo($('.mCSB_container'));
 					updateScrollbar();
 					j++;
 				}
 			})
 		}
	})		
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
	var genderMsg ="남자 아이입니다.";
	var gender = "Male";
	setGender(genderMsg,gender);
	disableGender();

})

$(document).on('click', '#btn1' , function(){ 
	var genderMsg = "여자 아이입니다.";
	var gender = "Female";
	setGender(genderMsg,gender);
	disableGender();
})

$(document).on('click','#btn2',function(){
	age=0;
	setAge(age);
	disableAge();
})

$(document).on('click','#btn3',function(){
	age=1;
	setAge(age);
	disableAge();
})

$(document).on('click','#btn4',function(){
	age=2;
	setAge(age);
	disableAge();
})
$(document).on('click','#btn5',function(){
	age=3;
	setAge(age);
	disableAge();
 		
})
$(document).on('click','#btn6',function(){
	age=4;
	setAge(age);
	disableAge();
})
$(document).on('click','#btn7',function(){
	age=5;
	setAge(age);
	disableAge();
})
$(document).on('click','#btn8',function(){
	age=6;
	setAge(age);
	disableAge();
})
$(document).on('click','#btn9',function(){
	age=7;
	setAge(age);
	disableAge();
})
$(document).on('click','#btn10',function(){
	age=8;
	setAge(age);
	disableAge();
})
$(document).on('click','#btn11',function(){
	age=9;
	setAge(age);
	disableAge();
})
$(document).on('click','#btn12',function(){
	age=10;
	setAge(age);
	disableAge();
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
						var bookName = output.contents[i].bookName;
						var component = output.contents[i].component;
						var feature = output.contents[i].feature;
						var minAge = output.contents[i].minAge;
						var maxAge = output.contents[i].maxAge;
						var imgUrl = output.contents[i].imgurl;
						
						var pen;
						if(output.contents[i].pen=="1")
							pen = "제공 됨.";
						else
							pen = "제공되지 않음.";
						
						var prize;
						if(output.contents[i].prize=="1")
							prize = "수상 기록 있음.";
						else
							prize = "";
						
						var qrCode;
						if(output.contents[i].qrcode)
							qrCode="제공 됨.";
						else
							qrCode="제공되지 않음."; 
						
						var summary = output.contents[i].summary;
						
						var url;
						if(output.contents[i].url=="NULL")
							url = "제공되지 않음.";
						else
							url = output.contents[i].url;
						
						var video;
						if(output.contents[i].video=="1")
							video = "제공 됨";
						else
							video = "제공되지 않음.";
						
						var writer;
						if(output.contents[i].writer=="1")
							writer = "수상 기록 있음.";
						else 
							writer ="";
						
						var price = output.contents[i].price;
						
						var details_1 = "1.책 구성 요소 :" +component +"&#10;"+ "2.책 특징 :"+feature+"&#10;"+"3.책 가격 :"+price ;
						
						var details_2 = "1.세이펜 제공 여부:"+pen+"&#10;"+"2.전집 수상 여부"+prize+"&#10;"+"3.Qrcode 제공 여부:"+qrCode+"&#10;"+"4.비디오 제공 여부:"+video;
						
						 //$('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+details+ '</div>').appendTo($('.mCSB_container')).addClass('new'); 
						
						if(imgUrl != null){
							$('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure><img src="'+imgUrl+'" style="max-width: 100%; height: auto;"></div>').appendTo($('.mCSB_container')).addClass('new');
						}
						printMessage("1.책 이름 :"+bookName + "2.책 요약 :" + summary + "3.대상 연령 :"+minAge+"~"+maxAge,"bot");
						
						var dynamicTag = "<div class='list'><input type='button' id='tmpButton"+ index +"' value='구성 및 가격'/></div>";
			 			$(dynamicTag).appendTo($('.mCSB_container'));
			 			$(document).on('click','#tmpButton'+ index,function(){
			 				printMessage(details_1,"bot");
			 			})
			 			index ++;
			 			
			 			var dynamicTag = "<div class='list'><input type='button' id='tmpButton"+ index +"' value='추가 정보'/></div>";
			 			$(dynamicTag).appendTo($('.mCSB_container'));
			 			$(document).on('click','#tmpButton'+ index,function(){
			 				printMessage(details_2,"bot");
			 			})
			 			index++;
			 			
			 			getLocation();
			 			
			 			updateScrollbar();
					}
				}				
		})		
		disablePreference();
		
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
	
	disablePreference();
	
	

	$(document).on('click','#tmpButton0',function(){
		preferenceEvent(0);
		disableChild();
	})
	$(document).on('click','#tmpButton1',function(){
		preferenceEvent(1);
		disableChild();
	})
	$(document).on('click','#tmpButton2',function(){
		preferenceEvent(2);
		disableChild();
	})
	$(document).on('click','#tmpButton3',function(){
		preferenceEvent(3);
		disableChild();
	})
	$(document).on('click','#tmpButton4',function(){
		preferenceEvent(4);
		disableChild();
	})
	$(document).on('click','#tmpButton5',function(){
		preferenceEvent(5);
		disableChild();
	})
	$(document).on('click','#tmpButton6',function(){
		preferenceEvent(6);
		disableChild();
	})
	$(document).on('click','#tmpButton7',function(){
		preferenceEvent(7);
		disableChild();

	})
	$(document).on('click','#tmpButton8',function(){
		preferenceEvent(8);
		disableChild();
	})
	$(document).on('click','#tmpButton9',function(){
		preferenceEvent(9);
		disableChild();
	})
	$(document).on('click','#tmpButton10',function(){
		preferenceEvent(10);
		disableChild();
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
	
	disablePreference();
	
	$(document).on('click','#tmpButton20',function(){
		parentPreferenceEvent(0);
		disableParent();
	})
	$(document).on('click','#tmpButton21',function(){
		parentPreferenceEvent(1);
		disableParent();
	})
	$(document).on('click','#tmpButton22',function(){
		parentPreferenceEvent(2);
		disableParent();
	})
	$(document).on('click','#tmpButton23',function(){
		parentPreferenceEvent(3);
		disableParent();
	})
	$(document).on('click','#tmpButton24',function(){
		parentPreferenceEvent(4);
		disableParent();
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
						var bookName = output.contents[i].bookName;
						var component = output.contents[i].component;
						var feature = output.contents[i].feature;
						var minAge = output.contents[i].minAge;
						var maxAge = output.contents[i].maxAge;
						var imgUrl = output.contents[i].imgurl;
						
						var pen;
						if(output.contents[i].pen=="1")
							pen = "제공 됨.";
						else
							pen = "제공되지 않음.";
						
						var prize;
						if(output.contents[i].prize=="1")
							prize = "수상 기록 있음.";
						else
							prize = "";
						
						var qrCode;
						if(output.contents[i].qrcode)
							qrCode="제공 됨.";
						else
							qrCode="제공되지 않음."; 
						
						var summary = output.contents[i].summary;
						
						var url;
						if(output.contents[i].url=="NULL")
							url = "제공되지 않음.";
						else
							url = output.contents[i].url;
						
						var video;
						if(output.contents[i].video=="1")
							video = "제공 됨";
						else
							video = "제공되지 않음.";
						
						var writer;
						if(output.contents[i].writer=="1")
							writer = "수상 기록 있음.";
						else 
							writer ="";
						
						var price = output.contents[i].price;
						
						var details_1 = "1.책 구성 요소 :" +component +"&#10;"+ "2.책 특징 :"+feature+"&#10;"+"3.책 가격 :"+price ;
						
						var details_2 = "1.세이펜 제공 여부:"+pen+"&#10;"+"2.전집 수상 여부"+prize+"&#10;"+"3.Qrcode 제공 여부:"+qrCode+"&#10;"+"4.비디오 제공 여부:"+video;
						
						 //$('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+details+ '</div>').appendTo($('.mCSB_container')).addClass('new'); 
						
						if(imgUrl != null){
							$('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure><img src="'+imgUrl+'" style="max-width: 100%; height: auto;"></div>').appendTo($('.mCSB_container')).addClass('new');
						}
						printMessage("1.책 이름 :"+bookName + "2.책 요약 :" + summary + "3.대상 연령 :"+minAge+"~"+maxAge,"bot");
						
						var dynamicTag = "<div class='list'><input type='button' id='tmpButton"+ index +"' value='구성 및 가격'/></div>";
			 			$(dynamicTag).appendTo($('.mCSB_container'));
			 			$(document).on('click','#tmpButton'+ index,function(){
			 				printMessage(details_1,"bot");
			 			})
			 			index ++;
			 			
			 			var dynamicTag = "<div class='list'><input type='button' id='tmpButton"+ index +"' value='추가 정보'/></div>";
			 			$(dynamicTag).appendTo($('.mCSB_container'));
			 			$(document).on('click','#tmpButton'+ index,function(){
			 				printMessage(details_2,"bot");
			 			})
			 			index++;
						
			 			getLocation();
			 			
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
					console.log(output);
					if(output.contents.length==0){
						 var error = "선택한 나이에 맞는 아동이 원하는 아람 북스의 도서가 없습니다 ㅠㅠㅠ!";
						 $('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+error+ '</div>').appendTo($('.mCSB_container')).addClass('new');
						 updateScrollbar();
					}
					else{
					for(var i =0;i<output.contents.length;i++){
						var imgUrl = output.contents[i].imgurl;
						var bookName = output.contents[i].bookName;
						var component = output.contents[i].component;
						var feature = output.contents[i].feature;
						var minAge = output.contents[i].minAge;
						var maxAge = output.contents[i].maxAge;
						var price = output.contents[i].price;
						
						var pen;
						if(output.contents[i].pen=="1")
							pen = "제공 됨.";
						else
							pen = "제공되지 않음.";
						
						var prize;
						if(output.contents[i].prize=="1")
							prize = "수상 기록 있음.";
						else
							prize = "";
						
						var qrCode;
						if(output.contents[i].qrcode)
							qrCode="제공 됨.";
						else
							qrCode="제공되지 않음."; 
						
						var summary = output.contents[i].summary;
						
						var url;
						if(output.contents[i].url=="NULL")
							url = "제공되지 않음.";
						else
							url = output.contents[i].url;
						
						var video;
						if(output.contents[i].video=="1")
							video = "제공 됨";
						else
							video = "제공되지 않음.";
						
						var writer;
						if(output.contents[i].writer=="1")
							writer = "수상 기록 있음.";
						else 
							writer ="";
						
						var details_1 = "1.책 구성 요소 :" +component +"&#10;"+ "2.책 특징 :"+feature+"&#10;"+"3.책 가격 :"+price ;
						
						var details_2 = "1.세이펜 제공 여부:"+pen+"&#10;"+"2.전집 수상 여부"+prize+"&#10;"+"3.Qrcode 제공 여부:"+qrCode+"&#10;"+"4.비디오 제공 여부:"+video;
						
						 //$('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure>'+details+ '</div>').appendTo($('.mCSB_container')).addClass('new'); 

						if(imgUrl != null){
							$('<div class="message new"><figure class="avatar"><img src="/resources/common/mosaLiS2uB.jpg" /></figure><img src="'+imgUrl+'" style="max-width: 100%; height: auto;"></div>').appendTo($('.mCSB_container')).addClass('new');
						}
						printMessage("1.책 이름 :"+bookName + "2.책 요약 :" + summary + "3.대상 연령 :"+minAge+"~"+maxAge,"bot");
						
						var dynamicTag = "<div class='list'><input type='button' id='tmpButton"+ index +"' value='구성 및 가격'/></div>";
			 			$(dynamicTag).appendTo($('.mCSB_container'));
			 			$(document).on('click','#tmpButton'+ index,function(){
			 				printMessage(details_1,"bot");
			 			})
			 			index ++;
			 			
			 			var dynamicTag = "<div class='list'><input type='button' id='tmpButton"+ index +"' value='추가 정보'/></div>";
			 			$(dynamicTag).appendTo($('.mCSB_container'));
			 			$(document).on('click','#tmpButton'+ index,function(){
			 				printMessage(details_2,"bot");
			 			})
			 			index++;
			 			
					    updateScrollbar();

					    getLocation();
					    
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

function disableGender(){
	$("#btn0").prop("disabled",true);
	$("#btn1").prop("disabled",true);
}
function disableAge(){
	$("#btn2").prop("disabled",true);
	$("#btn3").prop("disabled",true);
	$("#btn4").prop("disabled",true);
	$("#btn5").prop("disabled",true);
	$("#btn6").prop("disabled",true);
	$("#btn7").prop("disabled",true);
	$("#btn8").prop("disabled",true);
	$("#btn9").prop("disabled",true);
	$("#btn10").prop("disabled",true);
	$("#btn11").prop("disabled",true);
	$("#btn12").prop("disabled",true);
}
function disablePreference(){
	$("#btn13").prop("disabled",true);
	$("#btn14").prop("disabled",true);
	$("#btn15").prop("disabled",true);
}
function disableChild(){		
	$("#tmpButton0").prop("disabled",true);
	$("#tmpButton1").prop("disabled",true);
	$("#tmpButton2").prop("disabled",true);
	$("#tmpButton3").prop("disabled",true);
	$("#tmpButton4").prop("disabled",true);
	$("#tmpButton5").prop("disabled",true);
	$("#tmpButton6").prop("disabled",true);
	$("#tmpButton7").prop("disabled",true);
	$("#tmpButton8").prop("disabled",true);
	$("#tmpButton9").prop("disabled",true);
	$("#tmpButton10").prop("disabled",true);
}
function disableParent(){
	$("#tmpButton20").prop("disabled",true);
	$("#tmpButton21").prop("disabled",true);
	$("#tmpButton22").prop("disabled",true);
	$("#tmpButton23").prop("disabled",true);
	$("#tmpButton24").prop("disabled",true);
}


