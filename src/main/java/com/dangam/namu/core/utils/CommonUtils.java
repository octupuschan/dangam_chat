package com.dangam.namu.core.utils;

import java.lang.reflect.Array;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.binary.Base64;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;

public class CommonUtils {

  /**
   * Password 암호화
   * @return
   */
  public static ShaPasswordEncoder getEncoder() {
      ShaPasswordEncoder encoder = new ShaPasswordEncoder(256);

      return encoder;
  }

  /**
   *
   * @param sourceTS
   * @param day
   * @return
   * @throws Exception
   */
  public static Timestamp getTimestampWithSpan(Timestamp sourceTS, long day) throws Exception {
		Timestamp targetTS = null;

		if (sourceTS != null) {
			targetTS = new Timestamp(sourceTS.getTime() + (day * 1000 * 60 * 60 * 24));
		}

		return targetTS;
	}

  /**
   * String null check
   * @param value
   * @return
   */
  public static final String checkNull(Object value){
      String result = "";

      String str = String.valueOf(value);

      if (!(str==null || "".equals(str.toString().trim()) || "null".equals(str))) {
          result = str;
      }

      return result;
  }

  /**
   * String null check
   * value01이 null일 경우 value02 return
   * @param value01
   * @param value02
   * @return
   */
  public static final String checkNull(Object value01, Object value02){
      String result = "";

      String str01 = String.valueOf(value01);
      String str02 = String.valueOf(value02);

      if (!(str01==null || "".equals(str01.toString().trim()) || "null".equals(str01))) {
          result = str01;
      } else {
          if (!(str02==null || "".equals(str02.toString().trim()) || "null".equals(str02))) {
              result = str02;
          }//end if
      }//end if

      return result;
  }

  /**
   * myBatis empty 함수
   * @param obj
   * @return
   */
  @SuppressWarnings("rawtypes")
  public static boolean isEmpty(Object obj){
      boolean result = false;
      if( obj instanceof String ) result = obj==null || "".equals(obj.toString().trim());
      else if( obj instanceof List ) result = obj==null || ((List)obj).isEmpty();
      else if( obj instanceof Map ) result = obj==null || ((Map)obj).isEmpty();
      else if( obj instanceof Object[] ) result = obj==null || Array.getLength(obj)==0;
      else result = obj==null;

      return result;
  }

  public static boolean isNotEmpty(String s){
      return !isEmpty(s);
  }
}
