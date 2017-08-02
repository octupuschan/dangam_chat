package com.dangam.namu.core.utils;

import java.util.Arrays;
import java.util.List;

public class StringUtil {

  public static List<String> toList(String source) {
    return toList(source, ",");
  }

  public static List<String> toList(String source, String delimiter) {

    if (source == null || source.isEmpty()) {
      return null;
    }

    String[] arrSplited = source.split(delimiter);

    if (arrSplited == null) {
      return null;
    }

    for (int idx = 0; idx < arrSplited.length; idx++) {
      arrSplited[idx] = arrSplited[idx].trim();
    }

    return Arrays.asList(arrSplited);

  }
}
