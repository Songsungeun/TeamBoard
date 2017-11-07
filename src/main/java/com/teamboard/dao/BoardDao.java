package com.teamboard.dao;

import java.util.List;
import java.util.Map;

import com.teamboard.vo.Board;
import com.teamboard.vo.BoardList;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */

public interface BoardDao {

	int insertBoard(Board board) throws Exception;
	int updateBoard(Board board) throws Exception;
	int deleteBoard(int boardNo);
	int countType(String type);
	int countCategory(String category);
	int countNoName(Map<String, Object> paramMap);
	int increaseCommentCount(int boardNo);
	int getWriteCount(int userNo);
	
	BoardList findOne(int boardNo);
	
	List<Board> findAll();
	List<BoardList> findAllbyType(Map<String, Object> paramMap);
	List<BoardList> findAllbyTypeForNoName(Map<String, Object> paramMap);
	List<BoardList> findAllbyCategory(Map<String, Object> paramMap);
	List<BoardList> findAllbyTypeForMain(String type);
	List<BoardList> findAllbyCategoryForMain(Map<String, Object> paramMap);
} 
