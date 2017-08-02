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

import java.io.File;
import java.io.IOException;
import java.util.Date;

import org.apache.commons.io.FileUtils;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.dangam.namu.api.mapper.HomeMapper;
import com.dangam.namu.core.utils.CommonUtils;
import com.dangam.namu.core.utils.DateExt;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

public class DbTests {

	@Autowired
	private HomeMapper mapper;
	
	@Before
	public void init() {
	}

	@Test
	public void testFormat() throws JsonParseException, JsonMappingException, IOException {
		System.out.println(mapper.getBook("베이비올 탄생"));
		
		
	}
}
