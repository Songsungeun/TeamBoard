package com.teamboard.vo;

import lombok.Getter;
import lombok.Setter;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */

public class AttachFile {

	protected int fileNo;
	protected String originName;
	protected String fileName;
	protected int boardNo;
	protected String fileUrl;
	
	public int getFileNo() {
		return fileNo;
	}
	public void setFileNo(int fileNo) {
		this.fileNo = fileNo;
	}
	public String getOriginName() {
		return originName;
	}
	public void setOriginName(String originName) {
		this.originName = originName;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public int getBoardNo() {
		return boardNo;
	}
	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}
	public String getFileUrl() {
		return fileUrl;
	}
	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}
	
	
}
