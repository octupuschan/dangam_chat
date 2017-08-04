package com.dangam.namu.api.http;

import java.io.IOException;
import java.net.URLEncoder;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import com.dangam.namu.api.dto.Inbi;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class HttpClient {
	 private static final String fid = "BB-b10-20170727165651-YyjwqbA2j5";
	    private static final String bid = "8qcGTxZU1vgGNA8T4xYAvmPJWPH2";
		private static final String base_url = 
				"http://35.186.253.168:8080/Sarah/chat?"
				+ "userID="+bid+"&"
				+ "botID="+fid+"&"
				+ "providerID=facebook&"
				+ "lang=KO&"
				+ "userKey="+bid+"&";
		private static final String test_url =
				"https://www.naver.com/";
		
	    
	    public String sendGet(String input) throws ClientProtocolException, IOException {
	    	
	    	
	    	String encodeResult = URLEncoder.encode(input, "UTF-8");
	    	
	        //http client 생성
	        CloseableHttpClient httpClient = HttpClients.createDefault();
	        
	        //get 메서드와 URL 설정
	        HttpGet httpGet_start = new HttpGet(base_url+"run=init&question="+encodeResult);
	        HttpGet httpGet_send = new HttpGet(base_url+"question="+ encodeResult); 
	        
	        //agent 정보 설정
	        httpGet_start.addHeader("content-type", "application/json");
	        httpGet_send.addHeader("content-type", "application/json");
	        
	        //get 요청
	        CloseableHttpResponse httpResponse_start = httpClient.execute(httpGet_start);
	        CloseableHttpResponse httpResponse_send = httpClient.execute(httpGet_send);
	        
	        String json_2 = EntityUtils.toString(httpResponse_send.getEntity(), "UTF-8");
	        
	    
	        httpClient.close();
	        
	        ObjectMapper mapper = new ObjectMapper();
	        Inbi obj = mapper.readValue(json_2, Inbi.class);
	        
	        
	        return obj.getData().getMessage();
	    }
}
