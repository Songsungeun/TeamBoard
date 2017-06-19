package com.teamboard.Exception;



/**
 * @author : Songsungeuns
 * @date : 2017. 6. 17.
 * @description : TODO
 */

public class UserNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public UserNotFoundException() {super();}

    public UserNotFoundException(String message) {super(message);}

    public UserNotFoundException(String message, Throwable cause) {super(message, cause);}

    public UserNotFoundException(Throwable cause) {super(cause);}

}
