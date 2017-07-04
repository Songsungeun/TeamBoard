package com.teamboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamboard.dao.BoardDao;
import com.teamboard.vo.Board;
import com.teamboard.vo.common.Category;
import com.teamboard.vo.common.Type;

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
	public Board findOne(int boardNo) {
		Board board = boardDao.findOne(boardNo);
		return board;
	}

	@Override
	public List<Board> findBoardListbyType(Type type) {
		List<Board> boardList = boardDao.findAllbyType(type);
		return boardList;
	}

	@Override
	public List<Board> findBoardListbyCategory(Category category) {
		List<Board> boardList = boardDao.findAllbyCategory(category);
		return boardList;
	}

}
