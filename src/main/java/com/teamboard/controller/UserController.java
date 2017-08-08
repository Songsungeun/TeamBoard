package com.teamboard.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

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
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public Object login(
		@RequestParam(value = "error", required = false) String error,
		@RequestParam(value = "logout", required = false) String logout) {

		if (error != null) {
			return JsonResult.error("Invalid username and password!");
		}

		if (logout != null) {
			return JsonResult.success("You've been logged out successfully.");
		}

		return JsonResult.success();

	}	


}
