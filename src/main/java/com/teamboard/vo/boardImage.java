package com.teamboard.vo;

import java.io.Serializable;

/**
 * @author : Songsungeun
 * @date : 2017. 11. 14.
 * @description : TODO
 */

public class boardImage implements Serializable{

	private static final long serialVersionUID = 1L;
	
	int imageNo;
	int boardNo;
	String url;
	
	public int getImageNo() {
		return imageNo;
	}
	public void setImageNo(int imageNo) {
		this.imageNo = imageNo;
	}
	public int getBoardNo() {
		return boardNo;
	}
	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	
}
