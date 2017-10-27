package com.teamboard.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.teamboard.service.BoardService;
import com.teamboard.service.CommentService;
import com.teamboard.vo.Board;
import com.teamboard.vo.BoardList;
import com.teamboard.vo.Comment;
import com.teamboard.vo.User;
import com.teamboard.vo.common.JsonResult;

import lombok.extern.slf4j.Slf4j;

/**
 * Created by SSE on 2017-07-04.
 */

@Controller
@RequestMapping(value = "/board/")
@Slf4j
public class BoardController {

	@Autowired
	BoardService boardService;

	@Autowired
	CommentService commentService;

	Logger logger = LoggerFactory.getLogger(UserController.class);
	
	int length = 10;
	
	@RequestMapping(path = "add")
	public Object insertBoard(Board board, HttpSession session) {

		System.out.println("please");
		try {
			System.out.println("hello");
			User user = (User)session.getAttribute("user");
			System.out.println("no: " + user.getMemberNo());
			board.setUserNo(user.getMemberNo());
			boardService.saveBoard(board);
		} catch (Exception e) {
			logger.error("{}", e);
			e.printStackTrace();
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}

	@RequestMapping(path = "update")
	public Object updateBoard(Board board) {

		try {
			boardService.updateBoard(board);
		} catch (Exception e) {
			logger.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}

	@RequestMapping(path = "delete")
	public Object deleteBoard(int boardNo) {

		try {

			if (boardService.findOne(boardNo) == null) {
				throw new RuntimeException("해당 게시물이 존재하지 않습니다.");
			}

			boardService.removeBoard(boardNo);

		} catch (Exception e ) {
			logger.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}

	@RequestMapping(path = "detail")
	public Object detailBoard(int boardNo) {
		try {
			BoardList board = boardService.findOne(boardNo);

			if (board == null) {
				throw new RuntimeException("해당 게시물이 존재하지 않습니다.");
			}
			return JsonResult.success(board);

		} catch (RuntimeException e) {
			logger.error("{}", e);
			return JsonResult.error(e.getMessage());
		}
	}

	@RequestMapping(path = "typeList")
	public Object typeList(String type, int pageNo) {
		
		List<BoardList> boardListByTypeAndRequired = new ArrayList<BoardList>();
		List<BoardList> boardListByType = new ArrayList<BoardList>();
		int count;
		Map<String, Object> maps = new HashMap<>();
		
		try {
			boardListByTypeAndRequired = boardService.findBoardListbyType(type, pageNo, 3, true);
			boardListByType = boardService.findBoardListbyType(type, pageNo, length, false);
			
			count = boardService.getCountBoardByType(type);
			
			maps.put("require", boardListByTypeAndRequired);
			maps.put("noReq", boardListByType);
			
			int startDisplayNo = count - ((pageNo - 1) * length);
			for (int i = 0; i < boardListByType.size(); i++) {
				boardListByType.get(i).setShowNo(startDisplayNo--);
			}
		} catch (RuntimeException e) {
			logger.error("{}", e);
			e.printStackTrace();
			return JsonResult.error(e.getMessage());
		}
		
		return JsonResult.success(maps, count);
	}

	@RequestMapping(path = "categoryList")
	public Object categoryList(String category, int pageNo) {

		List<BoardList> boardListByCategoryAndRequired = new ArrayList<BoardList>();
		List<BoardList> boardListByCategory = new ArrayList<BoardList>();
		int count;
		Map<String, Object> maps = new HashMap<>();
		
		try {
			boardListByCategoryAndRequired = boardService.findBoardListbyCategory(category, pageNo, 3, true);
			boardListByCategory = boardService.findBoardListbyCategory(category, pageNo, length, false);
			
			count = boardService.getCountBoardByCategory(category);
			
			maps.put("require", boardListByCategoryAndRequired);
			maps.put("noReq", boardListByCategory);
			
		} catch (RuntimeException e) {
			logger.error("{}", e);
			e.printStackTrace();
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success(maps, count);
	}
	
	@RequestMapping(path = "mainList")
	public Object mainList(String category1, String category2) {
		
		List<BoardList> mainTeamReq = new ArrayList<BoardList>();
		List<BoardList> mainWorkReq = new ArrayList<BoardList>();

		List<BoardList> mainTeamNoReq = new ArrayList<BoardList>();
		List<BoardList> mainWorkNoReq = new ArrayList<BoardList>();
		List<BoardList> satIssue = new ArrayList<BoardList>();
		List<BoardList> roomSPKIssue = new ArrayList<BoardList>();
		List<BoardList> multiRoomIssue = new ArrayList<BoardList>();
		List<BoardList> bandIssue = new ArrayList<BoardList>();
		List<BoardList> bdHesIssue = new ArrayList<BoardList>();
		List<BoardList> pvrIssue = new ArrayList<BoardList>();
		List<BoardList> ssConnectIssue = new ArrayList<BoardList>();
		List<BoardList> convergenceIssue = new ArrayList<BoardList>();
		List<BoardList> alexaIssue = new ArrayList<BoardList>();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			// 필독 영역
			mainTeamReq = boardService.findBoardListbyCategoryForMain(category1, 3, true);
			mainWorkReq = boardService.findBoardListbyCategoryForMain(category2, 3, true);
			mainTeamNoReq = boardService.findBoardListbyCategoryForMain(category1, 5, false);
			mainWorkNoReq = boardService.findBoardListbyCategoryForMain(category2, 5, false);
//			satIssue = boardService.findBoardListbyCategoryForMain("sat", 5, false);
//			satIssue = boardService.findBoardListbyCategoryForMain("sat", 5, false);
//			satIssue = boardService.findBoardListbyCategoryForMain("sat", 5, false);
//			satIssue = boardService.findBoardListbyCategoryForMain("sat", 5, false);
//			satIssue = boardService.findBoardListbyCategoryForMain("sat", 5, false);
//			satIssue = boardService.findBoardListbyCategoryForMain("sat", 5, false);
//			satIssue = boardService.findBoardListbyCategoryForMain("sat", 5, false);
//			satIssue = boardService.findBoardListbyCategoryForMain("sat", 5, false);
//			satIssue = boardService.findBoardListbyCategoryForMain("sat", 5, false);
			
			map.put("teamReq", mainTeamReq);
			map.put("workReq", mainWorkReq);
			map.put("teamNoReq", mainTeamNoReq);
			map.put("workNoReq", mainWorkNoReq);
			map.put("sat", satIssue);
			
		} catch (RuntimeException e) {
			logger.error("{}", e);
			e.printStackTrace();
			return JsonResult.error(e.getMessage());
		}
		
		return JsonResult.success(map);
	}
	
	// 댓글 영역
	@RequestMapping(path = "getComment")
	public Object commentList(int boardNo) {

		List<Comment> commentList = commentService.getCommentListbyBoardNo(boardNo);

		return JsonResult.success(commentList);
	}

	@RequestMapping(path = "inserComment")
	public Object insertComment(Comment comment, HttpSession session) {
		User user = (User)session.getAttribute("user");
		comment.setUserNo(user.getMemberNo());
		try {
			commentService.insertComment(comment);
		} catch (Exception e) {
			logger.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}

	@RequestMapping(path = "updateComment")
	public Object updateComment(Comment comment) {
		try {
			commentService.updateComment(comment);
		} catch (Exception e) {
			logger.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}

	@RequestMapping(value = "deleteComment")
	public Object deleteComment(int commentNo) {
		try {
			commentService.deleteComment(commentNo);
		} catch (Exception e) {
			logger.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}

}
