package com.teamboard.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamboard.dao.BoardDao;
import com.teamboard.vo.Board;
import com.teamboard.vo.BoardList;

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
	public List<BoardList> findBoardListbyType(String type, int pageNo, int length, boolean required) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("type",	type);
		map.put("startIndex", (pageNo - 1) * length);
		map.put("length", length);
		map.put("required", required);
		List<BoardList> boardList = boardDao.findAllbyType(map);
		return boardList;
	}

	@Override
	public List<BoardList> findBoardListbyCategory(String category, int pageNo, int length, boolean required) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("category",	category);
		map.put("startIndex", (pageNo - 1) * length);
		map.put("length", length);
		map.put("required", required);
		List<BoardList> boardList = boardDao.findAllbyCategory(map);
		return boardList;
	}

	@Override
	public List<BoardList> findBoardListbyTypeForMain(String type) {
		List<BoardList> boardList = boardDao.findAllbyTypeForMain(type);
		return boardList;
	}

	@Override
	public List<BoardList> findBoardListbyCategoryForMain(String category, int length, boolean required) {
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("category",	category);
		map.put("length", length);
		map.put("required", required);
		List<BoardList> boardList = boardDao.findAllbyCategoryForMain(map);
		return boardList;
	}

	@Override
	public int getCountBoardByType(String type) {
		return boardDao.countType(type);
	}

	@Override
	public int getCountBoardByCategory(String category) {
		return boardDao.countCategory(category);
	}

	@Override
	public void increaseCommentCount(int boardNo) {
		boardDao.increaseCommentCount(boardNo);
	}

	
}
