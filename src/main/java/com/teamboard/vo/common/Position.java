package com.teamboard.vo.common;

public enum Position {

	TeamLeader("팀장"),
	PrincipleResearchEngineer("수석"),
	SeniorResearchEngineer("책임"),
	ResearchEngineer("선임"),
	AssociateResearchEngineer("주임"),
	Engineer("사원");
	
	final private String positionName;
	
	private Position(String positionName) {
		this.positionName = positionName;
	}
	
	public String getPositionName() {
		return this.positionName;
	}
}
