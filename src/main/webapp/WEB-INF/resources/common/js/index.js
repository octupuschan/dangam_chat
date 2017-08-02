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

function insertMessage() {
  parameter = $('.message-input').val();
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  WebSocket.sendMessage(msg);
  setDate();
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



$(function(){
   console.log('loading');
   WebSocket.init();
});
var WebSocket = {
      SERVER_SOCKET_API : "/websockethandler",
      stompClient : null,
      connect: function(){
         var socket = new SockJS(this.SERVER_SOCKET_API);
         var self = this;
         self.stompClient = Stomp.over(socket);
         self.stompClient.connect({},function(){
            self.stompClient.subscribe('/topic/roomId',function(msg){
               self.printMessage(msg.body);
            });
         });

      },
      printMessage : function(msg){
          $('<div class="message loading new"><figure class="avatar"><img src="/resources/common/robot.png"/></figure><span></span></div>').appendTo($('.mCSB_container'));
          $('.message.loading').remove(); 
          updateScrollbar();
           setTimeout(function() {
             if(check == true){
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
   
      },

      clear:function(input){
         $('.message-input').val('');
      },
      sendMessage:function(text){
         this.stompClient.send('/app/hello',{}, text);
         check = true;
         
      },
      init:function(){
         this.connect();
         var self = this;
         function chatKeyDownHandler(e){
            if(e.keyCode == 13 && $('.message-input').val() !==''){
               self.sendMessage($('.message-input').val());
               self.clear();
            }
         };
         $('.message-input').on('keydown',chatKeyDownHandler);
      }
      
      $('#chatting_input').keypress(function(e){
    	  if(e.keyCode == 13){
    		console.log(parameter);
    	 	var result = [];
			$.ajax({
				url: '/dbTest',
				type: 'GET',
				data: {value: parameter},
				dataType: 'JSON',
				success: function (output){
					$.each(output.contents, function (k, v){
						result.push(v);
					});
					
					$.each(result, function(k, v){
						var out = $('#chatting_out').val();
			            $('#chatting_out').val(result[k].codeName+'\n'+out);
					});
				}
			})
		}});

};