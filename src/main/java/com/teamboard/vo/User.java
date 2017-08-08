package com.teamboard.vo;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */
@Getter
@Setter
public class User implements Serializable{

	
	private static final long serialVersionUID = 1L;
	
	protected int memberNo;
	protected String userID;
	protected String password;
	protected String department;
	protected String position;
	protected String name;
	protected String admin;
	protected boolean permission;
	
}
