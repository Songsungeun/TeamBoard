package com.teamboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamboard.Exception.UserNotFoundException;
import com.teamboard.dao.UserDao;
import com.teamboard.vo.User;

/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserDao userDao;
	
	@Override
	public void signUpUser(User user) throws Exception {
		userDao.signUpUser(user);
	}

	@Override
	public void unregister(int userNo) throws Exception {
		userDao.unRegistUser(userNo);
	}

	@Override
	public User findOne(int userNo) throws UserNotFoundException {
		User user = new User();
		user = userDao.findOnebyUserNo(userNo);
		
		if (user != null) {
			return user;
		} else {
			return null;
		}
	}

	@Override
	public User findOnebyID(String userId) throws UserNotFoundException {
		User user = new User();
		user = userDao.findOnebyID(userId);
		
		if (user != null) {
			return user;
		} else {
			return null;
		}
	}

	@Override
	public List<User> findAll() {
		List<User> userList = userDao.findAll();
		return userList;
	}

	@Override
	public User checkID(String userId) {
		User user = userDao.findOnebyID(userId);
		if (user != null) {
			return user;
		} else {
			return null;
		}
	}

	
}
