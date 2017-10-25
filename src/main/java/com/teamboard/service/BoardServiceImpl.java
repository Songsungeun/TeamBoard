package com.teamboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamboard.dao.BoardDao;
import com.teamboard.vo.Board;
import com.teamboard.vo.BoardList;
import com.teamboard.vo.common.Category;

@Service
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
	public void updateBoard(Board board) throws Exception {
		boardDao.updateBoard(board);
	}

	@Override
	public BoardList findOne(int boardNo) {
		BoardList board = boardDao.findOne(boardNo);
		return board;
	}

	@Override
	public List<BoardList> findBoardListbyType(String type) {
		List<BoardList> boardList = boardDao.findAllbyType(type);
		return boardList;
	}

	@Override
	public List<BoardList> findBoardListbyCategory(String category) {
		List<BoardList> boardList = boardDao.findAllbyCategory(category);
		return boardList;
	}

	@Override
	public List<BoardList> findBoardListbyTypeForMain(String type) {
		List<BoardList> boardList = boardDao.findAllbyTypeForMain(type);
		return boardList;
	}

	@Override
	public List<BoardList> findBoardListbyCategoryForMain(String category) {
		List<BoardList> boardList = boardDao.findAllbyCategoryForMain(category);
		return boardList;
	}

	
}
