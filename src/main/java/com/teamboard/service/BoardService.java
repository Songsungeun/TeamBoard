package com.teamboard.service;

import java.util.List;

import com.teamboard.vo.Board;
import com.teamboard.vo.BoardList;
import com.teamboard.vo.common.Category;

/**
 * @author : Songsungeun
 * @date : 2017. 6. 17.
 * @description : 게시글 관련 서비스 인터페이스
 */

public interface BoardService {
	
	public void saveBoard(Board board) throws Exception;
	public void removeBoard(int boardNo) throws Exception;
	public void updateBoard(Board board) throws Exception;
	
	public int getCountBoardByType(String type);
	public int getCountBoardByCategory(String category);
	
	public BoardList findOne(int boardNo);
	public List<BoardList> findBoardListbyType(String type, int pageNo, int length, boolean required);
	public List<BoardList> findBoardListbyCategory(String category, int pageNo, int length, boolean required);
	public List<BoardList> findBoardListbyTypeForMain(String type);
	public List<BoardList> findBoardListbyCategoryForMain(String category, int length, boolean required);
}
