package com.teamboard.vo.common;

public enum Department {

	AVTeam("AV Team"),
	TVTeam("TV Team"),
	AppTeam("App Team"),
	LFDTeam("LFD Team");
	
	final private String departmentName;
	
	private Department(String departmentName) {
		this.departmentName = departmentName;
	}
	
	public String getDepartmentName() {
		return this.departmentName;
	}
}
