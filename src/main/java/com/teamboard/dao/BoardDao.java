package com.teamboard.dao;

import java.util.List;

import com.teamboard.vo.Board;
import com.teamboard.vo.BoardList;
import com.teamboard.vo.common.Category;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */

public interface BoardDao {

	int insertBoard(Board board) throws Exception;
	int updateBoard(Board board) throws Exception;
	int deleteBoard(int boardNo);
	BoardList findOne(int boardNo);
	
	List<Board> findAll();
	List<BoardList> findAllbyType(String type);
	List<BoardList> findAllbyCategory(String category);
} 
