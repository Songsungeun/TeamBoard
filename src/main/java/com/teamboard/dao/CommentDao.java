package com.teamboard.dao;

import com.teamboard.vo.Comment;

import java.util.List;
import java.util.Map;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 17.
 * @description : TODO
 */

public interface CommentDao {

	int insertComment(Comment comment) throws Exception;
	int updateComment(Comment comment) throws Exception;
	int deleteComment(int commentNo);
	
	List<Comment>getCommentListbyBoardNo(Map<String, Object> commentMap);
	
}
