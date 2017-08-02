package com.dangam.namu.core.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateExt {
	Date date;
	
	public DateExt() {
		this.date = new Date();
	}
	
	public DateExt(Date date) {
		this.date = date;
	}
	
	public void setDate(Date date) {
		this.date = date;
	}
	
	public int getYear() {
		return getCalendar().get(Calendar.YEAR);
	}
	
	public int getMonth() {
		return getCalendar().get(Calendar.MONTH);
	}
	
	/**
	 * 날짜 2016-11-07 중에 7을 반환
	 * @return
	 */
	public int getDayOfMonth() {
		return getCalendar().get(Calendar.DAY_OF_MONTH);
	}
	
	public Calendar getCalendar() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(this.date);
		return cal;
	}
	
	public Date getTime() {
	  return this.date;
	}
	
	public DateExt addHours(int hours) {
	  Calendar cal = getCalendar();
	  cal.add(Calendar.HOUR_OF_DAY, hours);
	  this.setDate(cal.getTime());
      return this;
    }
	
	public DateExt addMinutes(int mins) {
	  Calendar cal = getCalendar();
	  cal.add(Calendar.MINUTE, mins);
	  this.setDate(cal.getTime());
	  return this;
	}
	
	public DateExt addSeconds(int seconds) {
      Calendar cal = getCalendar();
      cal.add(Calendar.SECOND, seconds);
      this.setDate(cal.getTime());
      return this;
    }
	
	public String format(String pattern) {
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		return sdf.format(this.date);
	}
}
