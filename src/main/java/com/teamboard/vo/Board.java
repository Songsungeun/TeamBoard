package com.teamboard.vo;

import com.teamboard.vo.common.Category;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


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
	protected Category category;
	protected Date date;
	
}
