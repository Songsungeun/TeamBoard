package com.teamboard.dao;

import java.util.List;

import com.teamboard.vo.Board;
import com.teamboard.vo.CategoryType;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */

public interface BoardDao {

	int insertBoard(Board board) throws Exception;
	int updateBoard(int boardNo) throws Exception;
	int deleteBoard(int boardNo);
	Board findOne(int boardNo);
	
	List<Board> findAll();
	List<Board> findAllbyType(CategoryType categoryType);
	List<Board> findAllbyCategory(CategoryType categoryType);
} 
