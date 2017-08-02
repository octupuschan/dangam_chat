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

package com.dangam.namu.utils;

import java.io.IOException;
import java.util.Date;

import org.junit.Before;
import org.junit.Test;

import com.dangam.namu.core.utils.CommonUtils;
import com.dangam.namu.core.utils.DateExt;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

public class DateExtTests {

	@Before
	public void init() {
	}

	@Test
	public void testFormat() throws JsonParseException, JsonMappingException, IOException {
		DateExt date = new DateExt(new Date());
		System.out.println(date.format("yyyy-MM-dd HH:mm:ss.SSS"));
		System.out.println(date.format("yyyyMMddHHmmss"));
	}

	@Test
	public void testAddMins() {
	  DateExt date = new DateExt();
	  System.out.println("0 min added -> " + date.format("yyyy-MM-dd HH:mm:ss.SSS"));
	  System.out.println("5 min added -> " + date.addMinutes(5).format("yyyy-MM-dd HH:mm:ss.SSS"));

	  System.out.println(CommonUtils.getEncoder().encodePassword("1111", null));
	}
}
