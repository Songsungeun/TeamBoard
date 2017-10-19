package com.teamboard.vo;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */
public class User implements Serializable{

	
	private static final long serialVersionUID = 1L;
	
	protected int memberNo;
	protected String userID;
	protected String password;
	protected String department;
	protected String position;
	protected String name;
	protected boolean admin;
	protected boolean permission;
	public int getMemberNo() {
		return memberNo;
	}
	public void setMemberNo(int memberNo) {
		this.memberNo = memberNo;
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean getAdmin() {
		return admin;
	}
	public void setAdmin(boolean admin) {
		this.admin = admin;
	}
	public boolean isPermission() {
		return permission;
	}
	public void setPermission(boolean permission) {
		this.permission = permission;
	}
	
	
}
