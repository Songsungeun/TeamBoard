package com.teamboard.Util;

public class FileUploadUtil {
	static int count = 0;
	  public static String getNewFilename(String originFilename) {
	    if (count > 100) {
	      count = 0;
	    }
	    return "(" + (++count) + ")" + originFilename;
	  }
	  
//	  public static String extractFileExt(String filename) {
//	    return filename.substring(filename.lastIndexOf("."));
//	  }
}
