package com.teamboard.service;

import com.teamboard.dao.CommentDao;
import com.teamboard.vo.Comment;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;

/**
 * @author : Songsungeun
 * @date : 2017. 6. 18.
 * @description : TODO
 */

public class CommentServiceImpl implements CommentService {

	@Autowired
	CommentDao commentDao;
	
	@Override
	public void insertComment(Comment comment) throws Exception {
		commentDao.insertComment(comment);
	}

	@Override
	public void updateComment(Comment comment) throws Exception {
		commentDao.updateComment(comment);
	}

	@Override
	public void deleteComment(int commentNo) throws Exception {
		commentDao.deleteComment(commentNo);
	}

	@Override
	public List<Comment> getCommentListbyBoardNo(int boardNo, int pageNo, int length) {
		HashMap<String, Object> commentMap = new HashMap<>();

		commentMap.put("startIndex", (pageNo - 1) * length);
		commentMap.put("length", length);
		commentMap.put("boardNo", boardNo);
		return commentDao.getCommentListbyBoardNo(commentMap);
	}

}
