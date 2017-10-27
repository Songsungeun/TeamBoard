package com.teamboard.service;

import com.teamboard.vo.Comment;

import java.util.List;

/**
 * @author : Songsungeun
 * @date : 2017. 6. 18.
 * @description : TODO
 */

public interface CommentService {
	
	public void insertComment(Comment comment) throws Exception;
	public void updateComment(Comment comment) throws Exception;
	public void deleteComment(int commentNo) throws Exception;
	
	public List<Comment> getCommentListbyBoardNo(int boardNo);
	
}
