/*
 * Copyright 2012-2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.dangam.namu;

import java.io.IOException;
import java.net.URLEncoder;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.junit.Test;


public class HttpClientTests {
	
	private static final String fid = "BB-b10-20170706144205-TqkueT0tyY";
    private static final String bid = "9Zt3tpIBVGfFbZqO9iWbX3ACQ2j1";

	private static final String base_url = 
			"http://35.186.253.168:8080/Sarah/chat?"
			+ "userID="+bid+"&"
			+ "botID="+fid+"&"
			+ "providerID=facebook&"
			+ "lang=KO&"
			+ "userKey="+bid+"&";
	private static final String test_url =
			"https://www.naver.com/";
	
    @Test
    public void sendGet() throws ClientProtocolException, IOException {
    	
    	
    	String encodeResult = URLEncoder.encode("�кθ� ���ϴ� å�� ������ �;��", "UTF-8");
    	
        //http client ����
        CloseableHttpClient httpClient = HttpClients.createDefault();
        
        //get �޼���� URL ����
        HttpGet httpGet_start = new HttpGet(base_url+"run=init&question="+encodeResult);
        HttpGet httpGet_send = new HttpGet(base_url+"question="+ encodeResult); 
        
        //agent ���� ����
        httpGet_start.addHeader("content-type", "application/json");
        httpGet_send.addHeader("content-type", "application/json");
        
        //get ��û
        CloseableHttpResponse httpResponse_start = httpClient.execute(httpGet_start);
        CloseableHttpResponse httpResponse_send = httpClient.execute(httpGet_send);
        
        System.out.println("GET Response Status");
        
        System.out.println(httpResponse_start.getStatusLine().getStatusCode());
        String json_1 = EntityUtils.toString(httpResponse_start.getEntity(), "UTF-8");
        
        System.out.println(httpResponse_send.getStatusLine().getStatusCode());
        String json_2 = EntityUtils.toString(httpResponse_send.getEntity(), "UTF-8");
        json_2 = json_2.replace("\\", "");
        json_2 = json_2.replace("\"{","{");
        json_2 = json_2.replace("}\"", "}");
        json_2 = json_2.replace("\"teyp\":\"MESSAGE\",", "");
        
        System.out.println(json_1);
        System.out.println(json_2);
        
        httpClient.close();
    }
    
    
}
