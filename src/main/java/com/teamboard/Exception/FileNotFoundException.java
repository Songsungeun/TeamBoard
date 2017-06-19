package com.teamboard.Exception;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 17.
 * @description : TODO
 */

public class FileNotFoundException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;

	public FileNotFoundException() {super();}

    public FileNotFoundException(String message) {super(message);}

    public FileNotFoundException(String message, Throwable cause) {super(message, cause);}

    public FileNotFoundException(Throwable cause) {super(cause);}
}
