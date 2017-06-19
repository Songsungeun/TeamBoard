package com.teamboard.service;

import java.util.List;

import com.teamboard.Exception.FileNotFoundException;
import com.teamboard.vo.AttachFile;

/**
 * @author : Songsungeun
 * @date : 2017. 6. 18.
 * @description : TODO
 */

public interface FileService {

	public void insertFile(AttachFile file) throws Exception;
	public void deleteFile(int fileNo) throws FileNotFoundException;
	
	public List<AttachFile> getFileList(int boardNo); 
}
