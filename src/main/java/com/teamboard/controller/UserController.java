package com.teamboard.controller;

import com.teamboard.service.UserService;
import com.teamboard.vo.User;
import com.teamboard.vo.common.JsonResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/user/")
@Slf4j
public class UserController {

	@Autowired
	UserService userService;

	@RequestMapping(path="signUp")
	public Object signUpMember(User user) throws Exception {

		try {
			userService.signUpUser(user);
		} catch (Exception e) {
			log.error("{}", e);
			return JsonResult.error(e.getMessage());
		}

		return JsonResult.success();
	}
}
