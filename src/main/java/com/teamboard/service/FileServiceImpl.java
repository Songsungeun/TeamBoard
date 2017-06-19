package com.teamboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.teamboard.Exception.FileNotFoundException;
import com.teamboard.dao.FileDao;
import com.teamboard.vo.AttachFile;

/**
 * @author : Songsungeun
 * @date : 2017. 6. 18.
 * @description : TODO
 */

public class FileServiceImpl implements FileService {

	@Autowired
	FileDao fileDao;
	
	@Override
	public void insertFile(AttachFile file) throws Exception {
		fileDao.insertFile(file);
	}

	@Override
	public void deleteFile(int fileNo) throws FileNotFoundException {
		fileDao.deleteFile(fileNo);
	}

	@Override
	public List<AttachFile> getFileList(int boardNo) {
		List<AttachFile> attachfileList = fileDao.getAttachFileListbyBoardNo(boardNo);
		return attachfileList;
	}

	
}
