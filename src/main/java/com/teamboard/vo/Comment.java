package com.teamboard.vo;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Comment {

	protected int commentNo;
	protected String commentDescription;
	protected int userNo;
	protected int boardNo;
	protected Date cre_dt;
	
}
