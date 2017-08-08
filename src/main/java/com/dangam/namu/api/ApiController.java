package com.dangam.namu.api;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dangam.namu.api.dto.Inbi;
import com.dangam.namu.api.dto.Sub;
import com.dangam.namu.api.dto.Test;
import com.dangam.namu.api.dto.User;
import com.dangam.namu.api.http.HttpClient;
import com.dangam.namu.api.service.ApiService;




/**
 *
 * Admin web controller
 */
@Controller
public class ApiController {
	
  @Autowired
  private ApiService apiService;
  
  @Autowired
  private HttpClient httpClient;
  
  @GetMapping("/arambooks")
  public ResponseEntity<Test> viewMain() {
	Sub sub = new Sub();
	sub.setProp01("��⵵");
	sub.setProp02("�����");
	
	Sub arr[] = new Sub[3];
	arr[0]=sub;
	  
    Test test = new Test();
    test.setProp01("38.999");
    test.setProp02("hihi");
    test.setProp03("�ܰ��ܰ�");
    test.setProp04(sub);
    test.setProp05(arr);
    
    return ResponseEntity.ok(test);
  }
  
  @GetMapping("/getId")
  @ResponseBody
  public ResponseEntity<Map<String, Object>> getId() throws Exception {
	  
	  Map<String, Object> result = new  HashMap<String, Object>();
	  result.put("contents", apiService.getId());
	  return ResponseEntity.ok(result);
  }
  
  @GetMapping("/getUid")
  @ResponseBody
  public ResponseEntity<Map<String, Object>> getUid() throws Exception {
	  
	  Map<String, Object> result = new  HashMap<String, Object>();
	  result.put("contents", apiService.getUid());
	  return ResponseEntity.ok(result);
  }
  
  @GetMapping("/getByAge")
  @ResponseBody
  public ResponseEntity<Map<String, Object>> getBookByAge(@RequestParam("value") Integer uid) throws Exception {
	  
	  Map<String, Object> result = new  HashMap<String, Object>();
	  result.put("contents", apiService.getBookByAge(uid));
	  return ResponseEntity.ok(result);
  }
  
  @GetMapping("/getByUid")
  @ResponseBody
  public ResponseEntity<Map<String, Object>> getIdByUid(@RequestParam("value") String uid) throws Exception {
	  
	  Map<String, Object> result = new  HashMap<String, Object>();
	  result.put("contents", apiService.getIdByUid(uid));
	  return ResponseEntity.ok(result);
  }
  
  @GetMapping("/getById")
  @ResponseBody
  public ResponseEntity<Map<String, Object>> getBookById(
		  @RequestParam("value_1") Integer age, @RequestParam("value_2") String id) throws Exception 
  {
	  Map<String, Object> map = new HashMap<String, Object>();
	  User user = new User(); 
	  user.setAge(age);
	  user.setId(id);
	  
	  map.put("user", user);
	  Map<String, Object> result = new  HashMap<String, Object>();
	  result.put("contents", apiService.getBookById(map));
	  return ResponseEntity.ok(result);
  }
  
  @GetMapping("/jsonTest")
  @ResponseBody
  public ResponseEntity<Map<String, Object>> getResoponse(@RequestParam("value") String input){
	  
	  Inbi response = null;
	  try {
		response = httpClient.sendGet(input);
	} catch (ClientProtocolException e) {
		e.printStackTrace();
	} catch (IOException e) {
		e.printStackTrace();
	}
	  
	  Map<String, Object> result = new HashMap<String, Object>(); //String - key Object- value 
	  //Object의 용도?? - 
	  result.put("contents", response); //접근하려면 contents로 접근...!! 
	  result.put("id", "bot");
	  
	  return ResponseEntity.ok(result);
  }

}
