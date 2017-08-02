package com.dangam.namu.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * Admin web controller
 */
@Controller
public class WebController {
  @GetMapping("/")
  public String viewMain() {
    return "front/index";
  }
  @GetMapping("/chat")
  public String viewChat() {
    return "front/chat";
  }
  
  @GetMapping("/test")
  public String viewTest() {
	  return "front/test";
  }
 
}
