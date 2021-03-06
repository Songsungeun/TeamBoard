package com.teamboard.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.teamboard.Exception.UserNotFoundException;
import com.teamboard.service.BoardService;
import com.teamboard.service.UserService;
import com.teamboard.vo.User;
import com.teamboard.vo.common.JsonResult;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping(value = "/user/")
@Slf4j
public class UserController {

	@Autowired
	UserService userService;
	
	@Autowired
	BoardService boardService;

	Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@RequestMapping(path="signUp")
	public Object signUpMember(User user) throws Exception {
		System.out.println("hello");
		try {
			User originUser = userService.checkID(user.getUserID());
			if (originUser != null) {
				return JsonResult.fail("이미 존재하는 ID입니다.");
			} else {
				
				// for 최초 admin
				if (user.getUserID().equals("admin")) {
					user.setAdmin(true);
					user.setPermission(true);
				}
				userService.signUpUser(user);
			}
			
		} catch (Exception e) {
			logger.error("{}", e);
			e.printStackTrace();
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}
	
	
	@RequestMapping(value = "/loginCheck")
	public Object loginCheck(HttpSession session) {
		User user = (User)session.getAttribute("user");
		
		if (user == null) {
			return JsonResult.fail("로그인이 필요합니다.");
		} 
		
		user.setPassword("");
		
		return JsonResult.success(user);
	}
	
	@RequestMapping(value = "/login")
	public Object login (
			HttpSession session,
			User userData) throws Exception {

		try {
			
			HashMap<String, Object> paramMap = new HashMap<>();
			paramMap.put("userID", userData.getUserID());
			paramMap.put("password", userData.getPassword());
			
			User user = userService.findOnebyIDandPW(paramMap);
			if (user != null) {
				if (user.isPermission() || user.getAdmin()) {
					session.setAttribute("user", user);
					return JsonResult.success("로그인", user);
				} else {
					return JsonResult.fail("승인되지 않은 회원입니다.");
				}
			} else {
				return JsonResult.fail("회원 정보가 없습니다.");
			}
			
		} catch (UserNotFoundException e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}	
	
	@RequestMapping(value = "/logout")
	public Object logOut(HttpSession session) throws Exception {
		try {
			session.invalidate();
			return JsonResult.success();
		} catch (Exception e) {
			return JsonResult.error(e.getMessage());
		}
	}

	@RequestMapping(value = "/updateinfo")
	public Object updateInfo(User user, String newPassword, HttpSession session) throws Exception {
		try {
			HashMap<String, Object> paramMap = new HashMap<>();
			paramMap.put("userID", user.getUserID());
			paramMap.put("password", user.getPassword());
		
			User originUser = userService.findOnebyIDandPW(paramMap); 
			
			if (originUser == null) {
				return JsonResult.fail("비밀번호를 확인하세요");
			}
			
			if (newPassword != null) {
				originUser.setPassword(newPassword);
			} else {
				originUser.setPassword(user.getPassword());
			}
			
			originUser.setDepartment(user.getDepartment());
			originUser.setPosition(user.getPosition());
			
			userService.updateUser(originUser);
			
			session.setAttribute("user", originUser);
			return JsonResult.success();
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail("비밀번호를 확인하세요");
		}
	}
	
	@RequestMapping(value = "/userList")
	public Object getUserList() {
		List<User> userList = new ArrayList<User>();
		
		try {
			userList = userService.findAll();
			for (int i = 0; i < userList.size(); i++) {
				User user = userList.get(i);
				user.setWriteCount(boardService.getWriteCount(user.getMemberNo()));
				
				// 부서 꽂기
				switch (user.getDepartment()) {
				case "1" : user.setDepartment("AV팀"); break;
				case "2" : user.setDepartment("TV팀"); break;
				case "3" : user.setDepartment("APP팀"); break;
				case "4" : user.setDepartment("LFD팀"); break;
				}
				
				// 직급 꽂기
				switch (user.getPosition()) {
				case "1" : user.setPosition("팀장"); break;
				case "2" : user.setPosition("수석"); break;
				case "3" : user.setPosition("책임"); break;
				case "4" : user.setPosition("선임"); break;
				case "5" : user.setPosition("주임"); break;
				case "6" : user.setPosition("사원"); break;
				}
				
				userList.set(i, user);
			}
			
			return JsonResult.success(userList);
		} catch (Exception e) {
			return JsonResult.error();
		}
		
	}
	
	@RequestMapping(value = "/approveUser") 
	public Object approveUser(int userNo) {
		
		try {
			userService.approveUser(userNo);
			return JsonResult.success();
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.error("해당 유저 정보가 없습니다.");
		}
	}
	
	@RequestMapping(value = "/setAdminUser")
	public Object setAdminUser(int userNo, boolean admin) {
		try {
			userService.updateAmin(userNo, admin);
			return JsonResult.success();
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.error("해당 유저 정보가 없습니다.");
		}
	}

}
