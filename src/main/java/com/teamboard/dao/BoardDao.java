package com.teamboard.dao;

import com.teamboard.vo.Board;
import com.teamboard.vo.common.Category;
import com.teamboard.vo.common.Type;

import java.util.List;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */

public interface BoardDao {

	int insertBoard(Board board) throws Exception;
	int updateBoard(Board board) throws Exception;
	int deleteBoard(int boardNo);
	Board findOne(int boardNo);
	
	List<Board> findAll();
	List<Board> findAllbyType(Type type);
	List<Board> findAllbyCategory(Category category);
} 
