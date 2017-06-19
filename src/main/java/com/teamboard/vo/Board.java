package com.teamboard.vo;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */

@Getter
@Setter
public class Board {

	protected int boardNo;
	protected String title;
	protected String descripition;
	protected int userNo;
	protected String boardType;
	protected String category;
	protected Date date;
	
}
