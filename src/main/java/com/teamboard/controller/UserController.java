package com.teamboard.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

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
			userService.signUpUser(user);
			
		} catch (Exception e) {
			logger.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}
	
	
//	@RequestMapping(value = "/login", method = RequestMethod.GET)
//	public Object login(
//		@RequestParam(value = "error", required = false) String error,
//		@RequestParam(value = "logout", required = false) String logout) {
//
//		if (error != null) {
//			return JsonResult.error("Invalid username and password!");
//		}
//
//		if (logout != null) {
//			return JsonResult.success("You've been logged out successfully.");
//		}
//
//		return JsonResult.success();
//
//	}
	
	@RequestMapping(value = "/login")
	public Object login (
			HttpSession session,
			User userData) throws Exception {

		try {
			
			User user = userService.findOnebyID(userData.getUserID());
			if (user != null) {
				if (user.getPassword() != userData.getPassword()) {
					return JsonResult.fail("Password를 확인하세요.");
				}
				
				session.setAttribute("user", user);
				
			} else {
				return JsonResult.fail("존재하지 않는 회원입니다.");
			}
			
		} catch (UserNotFoundException e) {
			return JsonResult.fail(e.getMessage());
		}
		

		return JsonResult.success();

	}	
	
	public Object logOut(HttpSession session) throws Exception {
		try {
			session.invalidate();
			return JsonResult.success();
		} catch (Exception e) {
			return JsonResult.error(e.getMessage());
		}
	}


}
