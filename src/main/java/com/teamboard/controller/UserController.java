package com.teamboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.teamboard.service.UserService;

@Controller
@RequestMapping(value = "/user/")
public class UserController {

	@Autowired
	UserService userService;
	
}
