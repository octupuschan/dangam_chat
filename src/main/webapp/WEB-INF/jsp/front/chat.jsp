<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>

<html>
   <head>
      <title>Front</title>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
      <script src="/resources/common/Simplify_Admin/HTML-reword/js/uncompressed/jquery-1.11.1.js"></script>
      <script src="/webjars/sockjs-client/1.1.2/sockjs.js"></script>
      <script src="/webjars/stomp-websocket/2.3.1/stomp.js"></script>
      <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
   </head>

   <body>
      <h1> 단감챗입니다.</h1>
      
      <div>
         <input id="chatting_input">
      </div>
      <div>
         <textarea id="chatting_out" rows="10" cols="50"></textarea>
      </div>
      <script>      
      
      
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
               var out = $('#chatting_out').val();
               $('#chatting_out').val(msg+'\n'+out);
            },
			
            clear:function(input){
            	parameter = $('#chatting_input').val();
                $('#chatting_input').val('');
             },
            
            sendMessage:function(text){
               this.stompClient.send('/app/hello',{}, text); // 서버측에 메세지 전송
            },
            init:function(){
               this.connect();
               var self = this;
               function chatKeyDownHandler(e){
                  if(e.keyCode == 13 && $('#chatting_input').val() !==''){
                     self.sendMessage($('#chatting_input').val());
                     self.clear();
                  }
               };
               $('#chatting_input').on('keydown',chatKeyDownHandler);
            }

      };
      
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
      </script>
    </body>


</body>
</html>