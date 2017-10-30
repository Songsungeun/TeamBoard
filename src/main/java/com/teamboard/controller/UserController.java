package com.teamboard.controller;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.teamboard.Exception.UserNotFoundException;
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

	Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@RequestMapping(path="signUp")
	public Object signUpMember(User user) throws Exception {
		System.out.println("hello");
		try {
			User originUser = userService.checkID(user.getUserID());
			if (originUser != null) {
				return JsonResult.fail("이미 존재하는 ID입니다.");
			} else {
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
				session.setAttribute("user", user);
			} else {
				return JsonResult.fail();
			}
			
		} catch (UserNotFoundException e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
		

		return JsonResult.success("로그인");

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


}
