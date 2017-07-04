package com.teamboard.controller;

import com.teamboard.service.BoardService;
import com.teamboard.service.CommentService;
import com.teamboard.vo.Board;
import com.teamboard.vo.Comment;
import com.teamboard.vo.common.Category;
import com.teamboard.vo.common.JsonResult;
import com.teamboard.vo.common.Type;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by SSE on 2017-07-04.
 */

@Controller
@RequestMapping(value = "/board/*/")
@Slf4j
public class BoardController {

	@Autowired
	BoardService boardService;

	@Autowired
	CommentService commentService;

	@RequestMapping(path = "add")
	public Object insertBoard(Board board) {

		try {
			/*Spring Security 적용 후 사용
			board.setUserNo(((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getMemberNo());*/
			boardService.saveBoard(board);
		} catch (Exception e) {
			log.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}

	@RequestMapping(path = "update")
	public Object updateBoard(Board board) {

		try {
			boardService.updateBoard(board);
		} catch (Exception e) {
			log.error("{}", e);
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
			log.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}

	@RequestMapping(path = "detail")
	public Object detailBoard(int boardNo) {

		try {
			Board board = boardService.findOne(boardNo);

			if (board == null) {
				throw new RuntimeException("해당 게시물이 존재하지 않습니다.");
			}
			return JsonResult.success(board);

		} catch (RuntimeException e) {
			log.error("{}", e);
			return JsonResult.error(e.getMessage());
		}
	}

	@RequestMapping(path = "categoryList")
	public Object categoryList(Category category) {

		List<Board> boardListByCategory = new ArrayList<Board>();

		try {
			boardListByCategory = boardService.findBoardListbyCategory(category);

		} catch (RuntimeException e) {
			log.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success(boardListByCategory);
	}

	@RequestMapping(path = "typeList")
	public Object typeList(Type type) {

		List<Board> boardListByType = new ArrayList<Board>();

		try {
			boardListByType = boardService.findBoardListbyType(type);

		} catch (RuntimeException e) {
			log.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success(boardListByType);
	}


	// 댓글 영역
	@RequestMapping(path = "getComment")
	public Object commentList(int boardNo,
							  @RequestParam(defaultValue = "1") int pageNo,
							  @RequestParam(defaultValue = "20") int length) {

		List<Comment> commentList = commentService.getCommentListbyBoardNo(boardNo, pageNo, length);

		return JsonResult.success(commentList);
	}

	@RequestMapping(path = "inserComment")
	public Object insertComment(Comment comment) {
		// Front 에서 넘겨줄 때 boardNo, memberNo 꽂힌채로 넘어와야 함

		try {
			commentService.insertComment(comment);
		} catch (Exception e) {
			log.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}

	@RequestMapping(path = "updateComment")
	public Object updateComment(Comment comment) {
		try {
			commentService.updateComment(comment);
		} catch (Exception e) {
			log.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}

	@RequestMapping(value = "deleteComment")
	public Object deleteComment(int commentNo) {
		try {
			commentService.deleteComment(commentNo);
		} catch (Exception e) {
			log.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}

}
