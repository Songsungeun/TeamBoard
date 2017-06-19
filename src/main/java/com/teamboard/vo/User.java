package com.teamboard.vo;

import lombok.Getter;
import lombok.Setter;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */
@Getter
@Setter
public class User {

	protected int memberNo;
	protected String userID;
	protected String password;
	protected String department;
	protected String position;
	protected String name;
	protected boolean admin;
	protected boolean permission;
	
}
