package com.teamboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.teamboard.dao.BoardDao;
import com.teamboard.vo.Board;
import com.teamboard.vo.CategoryType;

public class BoardServiceImpl implements BoardService{

	@Autowired
	BoardDao boardDao;
	
	@Override
	public void saveBoard(Board board) throws Exception {
		boardDao.insertBoard(board);
	}

	@Override
	public void removeBoard(int boardNo) throws Exception {
		boardDao.deleteBoard(boardNo);
	}

	@Override
	public void updateBoard(int boardNo) throws Exception {
		boardDao.updateBoard(boardNo);
	}

	@Override
	public Board findOne(int boardNo) {
		Board board = boardDao.findOne(boardNo);
		return board;
	}

	@Override
	public List<Board> findBoardListbyType(CategoryType categoryType) {
		List<Board> boardList = boardDao.findAllbyType(categoryType);
		return boardList;
	}

	@Override
	public List<Board> findBoardListbyCategory(CategoryType category) {
		List<Board> boardList = boardDao.findAllbyCategory(category);
		return boardList;
	}

}
