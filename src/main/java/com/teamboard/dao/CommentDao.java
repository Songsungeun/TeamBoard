package com.teamboard.dao;

import java.util.List;

import com.teamboard.vo.Comment;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 17.
 * @description : TODO
 */

public interface CommentDao {

	int insert(Comment comment) throws Exception;
	int update(Comment comment, int commentNo) throws Exception;
	int delete(int commentNo);
	
	List<Comment>getCommentListbyBoardNo(int boardNo);
	
}
