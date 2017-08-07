<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
  		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
  		<link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.min.css'>
      	<link rel="stylesheet" href="<c:url value='../resources/common/css/style.css'/>">
		<script src="/webjars/sockjs-client/1.1.2/sockjs.js"></script>
		<script src="/webjars/stomp-websocket/2.3.1/stomp.js"></script>
		<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>

<title>test</title>
</head>
<body>

<section class="avenue-messenger">
  <div class="menu">
   <div class="items">
   <span>
     <a href="#" title="Minimize">&mdash;</a><br>
					<!--     
					     <a href="">enter email</a><br>
					     <a href="">email transcript</a><br>-->
     <a href="#" title="End Chat">&#10005;</a>
     </span>
     </div>
    <div class="button">...</div>
  </div>
  
  <div class="agent-face">
    <div class="half">
     <img class="agent circle" src="../resources/common/mosaLiS2uB.jpg" alt="aram image">
    </div>
  </div>
	<div class="chat">
  	<div class="chat-title">
    	<h1>ARAMBOT</h1>
    	<h2>아람북스의 전집을 추천해주는 챗봇 아람봇입니다.</h2>
  </div>
  <div class="messages">
    <div class="messages-content"></div>
  </div>
  <div class="message-box">
    <textarea type="text" class="message-input" placeholder="Type message..."></textarea>
    <button type="submit" class="message-submit">Send</button>
  </div>
</div>
  </div>
<!--<div class="bg"></div>-->

  <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js'></script>

    <script src="<c:url value='../resources/common/js/index.js'/>"></script>

</body>
</html>