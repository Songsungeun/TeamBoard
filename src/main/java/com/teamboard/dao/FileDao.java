package com.teamboard.dao;

import java.util.List;

import com.teamboard.vo.AttachFile;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 17.
 * @description : TODO
 */

public interface FileDao {

	int addAttachFile(AttachFile file) throws Exception;
	int deleteFile(int fileNo);
	
	List<AttachFile> getAttachFileListbyBoardNo(int boardNo);
}
