package com.teamboard.vo;

import java.io.Serializable;
import java.sql.Date;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */

public class Board implements Serializable{

	private static final long serialVersionUID = 1L;
	
	protected int boardNo;
	protected String title;
	protected String description;
	protected int userNo;
	protected String boardType;
	protected String category;
	protected Date date;
	protected boolean required;
	protected int commentCount;
	protected boolean file_status;
	protected boolean showName;
	
	public int getBoardNo() {
		return boardNo;
	}
	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String descripition) {
		this.description = descripition;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public String getBoardType() {
		return boardType;
	}
	public void setBoardType(String boardType) {
		this.boardType = boardType;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public boolean isRequired() {
		return required;
	}
	public void setRequired(boolean required) {
		this.required = required;
	}
	public int getCommentCount() {
		return commentCount;
	}
	public void setCommentCount(int commentCount) {
		this.commentCount = commentCount;
	}
	public boolean isShowName() {
		return showName;
	}
	public void setShowName(boolean showName) {
		this.showName = showName;
	}
	public boolean isFile_status() {
		return file_status;
	}
	public void setFile_status(boolean file_status) {
		this.file_status = file_status;
	}
	
	
	
}
