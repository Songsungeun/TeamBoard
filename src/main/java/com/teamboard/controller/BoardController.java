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

		try {
			User user = (User)session.getAttribute("user");
			board.setUserNo(user.getMemberNo());
			boardService.saveBoard(board);
		} catch (Exception e) {
			logger.error("{}", e);
			e.printStackTrace();
			return JsonResult.error(e.getMessage());
		}

		if (board.getCategory() != null) {
			return JsonResult.success(board.getCategory(), "category");
		} 
		
		return JsonResult.success(board.getBoardType(), "type");
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
			e.printStackTrace();
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}

	@RequestMapping(path = "detail")
	public Object detailBoard(int boardNo, HttpSession session) {
		try {
			BoardList board = boardService.findOne(boardNo);
			User user = (User)session.getAttribute("user");
			
			if (user == null) {
				throw new RuntimeException("회원정보가 없습니다.");
			}
			if (board == null) {
				throw new RuntimeException("해당 게시물이 존재하지 않습니다.");
			}
			return JsonResult.success(board, user);

		} catch (RuntimeException e) {
			logger.error("{}", e);
			return JsonResult.error(e.getMessage());
		}
	}

	@RequestMapping(path = "typeList")
	public Object typeList(String type, int pageNo, boolean no_name, HttpSession session) {
		
		User user = (User)session.getAttribute("user");
		
		List<BoardList> boardListByTypeAndRequired = new ArrayList<BoardList>();
		List<BoardList> boardListByType = new ArrayList<BoardList>();
		int count;
		Map<String, Object> maps = new HashMap<>();
		
		try {
			if (no_name) {
				// admin 인경우 익명게시판 모두 노출
				if (user.getAdmin()) {
					boardListByType = boardService.findBoardListbyType(type, pageNo, length, false);
					count = boardService.getCountBoardByType(type);
				} else {
					// 일반 유저인 경우 본인 익명 게시물만 노출
					boardListByType = boardService.findBoardListbyTypeForNoName(type, pageNo, length, user.getMemberNo());
					count = boardService.getCountBoardByNoName(type, user.getMemberNo());
				}
				
				// 이름 비공개 설정인 경우 이름 익명으로 변경
				for (int i = 0; i < boardListByType.size(); i++) {
					if(!boardListByType.get(i).isShowName()) {
						boardListByType.get(i).setUserName("익명");
					}
				}

				maps.put("noReq", boardListByType);
			} else {
				boardListByTypeAndRequired = boardService.findBoardListbyType(type, pageNo, 3, true);
				boardListByType = boardService.findBoardListbyType(type, pageNo, length, false);
				
				count = boardService.getCountBoardByType(type);
				
				maps.put("require", boardListByTypeAndRequired);
				maps.put("noReq", boardListByType);
				
				int startDisplayNo = count - ((pageNo - 1) * length);
				for (int i = 0; i < boardListByType.size(); i++) {
					boardListByType.get(i).setShowNo(startDisplayNo--);
				}
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
		List<BoardList> satIssueReq = new ArrayList<BoardList>();

		List<BoardList> mainTeamNoReq = new ArrayList<BoardList>();
		List<BoardList> mainWorkNoReq = new ArrayList<BoardList>();
		List<BoardList> satIssueNoReq = new ArrayList<BoardList>();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			// 필독 영역
			mainTeamReq = boardService.findBoardListbyCategoryForMain(category1, 3, true);
			mainWorkReq = boardService.findBoardListbyCategoryForMain(category2, 3, true);
			satIssueReq = boardService.findBoardListbyCategoryForMain("sat", 3, true);
			mainTeamNoReq = boardService.findBoardListbyCategoryForMain(category1, 5, false);
			mainWorkNoReq = boardService.findBoardListbyCategoryForMain(category2, 5, false);
			satIssueNoReq = boardService.findBoardListbyCategoryForMain("sat", 5, false);
			
			map.put("teamReq", mainTeamReq);
			map.put("workReq", mainWorkReq);
			map.put("productReq", satIssueReq);
			map.put("teamNoReq", mainTeamNoReq);
			map.put("workNoReq", mainWorkNoReq);
			map.put("productNoReq", satIssueNoReq);
			
		} catch (RuntimeException e) {
			logger.error("{}", e);
			e.printStackTrace();
			return JsonResult.error(e.getMessage());
		}
		
		return JsonResult.success(map);
	}
	
	@RequestMapping(path = "productList")
	public Object productList(String category) {
		List <BoardList> mainProductListReq = new ArrayList<BoardList>();
		List <BoardList> mainProductListNoReq = new ArrayList<BoardList>();

		Map<String, Object> map = new HashMap<String, Object>();
		
		try {
			mainProductListReq = boardService.findBoardListbyCategoryForMain(category, 3, true);
			mainProductListNoReq = boardService.findBoardListbyCategoryForMain(category, 5, false);
			
			map.put("productReq", mainProductListReq);
			map.put("productNoReq", mainProductListNoReq);
			
			if (mainProductListNoReq == null && mainProductListReq == null) {
				return JsonResult.fail("데이터가 없습니다.");
			}
		} catch (Exception e) {
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
			boardService.increaseCommentCount(comment.getBoardNo());
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
