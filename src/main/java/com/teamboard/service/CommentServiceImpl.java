package com.teamboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.teamboard.dao.CommentDao;
import com.teamboard.vo.Comment;

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
	public void updateComment(Comment comment, int commentNo) throws Exception {
		commentDao.updateComment(comment, commentNo);
	}

	@Override
	public void deleteComment(int commentNo) throws Exception {
		commentDao.deleteComment(commentNo);
	}

	@Override
	public List<Comment> getCommentListbyBoardNo(int boardNo) {
		List<Comment> commentList = commentDao.getCommentListbyBoardNo(boardNo);
		return commentList;
	}

}
