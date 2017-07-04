package com.teamboard.service;

import com.teamboard.vo.Board;
import com.teamboard.vo.common.Category;
import com.teamboard.vo.common.Type;

import java.util.List;

/**
 * @author : Songsungeun
 * @date : 2017. 6. 17.
 * @description : 게시글 관련 서비스 인터페이스
 */

public interface BoardService {
	
	public void saveBoard(Board board) throws Exception;
	public void removeBoard(int boardNo) throws Exception;
	public void updateBoard(Board board) throws Exception;
	
	public Board findOne(int boardNo);
	public List<Board> findBoardListbyType(Type type);
	public List<Board> findBoardListbyCategory(Category category);
	
}
