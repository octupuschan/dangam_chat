package com.dangam.namu.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dangam.namu.api.dto.Sub;
import com.dangam.namu.api.dto.Test;
import com.dangam.namu.api.service.ApiService;




/**
 *
 * Admin web controller
 */
@Controller
public class ApiController {
	
  @Autowired
  private ApiService apiService;
  
  @GetMapping("/arambooks")
  public ResponseEntity<Test> viewMain() {
	Sub sub = new Sub();
	sub.setProp01("경기도");
	sub.setProp02("시흥시");
	
	Sub arr[] = new Sub[3];
	arr[0]=sub;
	  
    Test test = new Test();
    test.setProp01("38.999");
    test.setProp02("hihi");
    test.setProp03("단감단감");
    test.setProp04(sub);
    test.setProp05(arr);
    
    return ResponseEntity.ok(test);
  }
  
  @RequestMapping(value = "/dbTest", method = RequestMethod.GET)
  @ResponseBody
  public ResponseEntity<Map<String, Object>> bname(@RequestParam("value") String uid) throws Exception {
	  
	  Map<String, Object> result = new  HashMap<String, Object>();
	  result.put("contents", apiService.getIdByUid(uid));
	  return ResponseEntity.ok(result);
	  //return ResponseEntity.ok(apiService.getBookByAge(7));
	  //return ResponseEntity.ok(mapper.getBookByAge(7));
	  //return ResponseEntity.ok(mapper.getBookByAge(7));
	  //return ResponseEntity.ok(mapper.getBook("베이비올 탄생"));
  }
  
  

}
