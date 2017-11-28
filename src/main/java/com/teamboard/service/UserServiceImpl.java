package com.teamboard.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	@Override
	public void updateUser(User user) throws Exception {
		userDao.updateUser(user);
	}

	@Override
	public void changeAdmin(User user) throws Exception {
		userDao.changeAdmin(user);
	}

	@Override
	public User findOnebyIDandPW(Map<String, Object> paramMap) {
		User user = userDao.findOnebyIDandPW(paramMap);
		
		if (user != null) {
			return user;
		} else {
			throw new UserNotFoundException("회원정보가 없습니다.");
		}
	}

	@Override
	public void approveUser(int userNo) throws Exception {
		userDao.approveUser(userNo);
	}

	@Override
	public void updateAmin(int userNo, boolean admin) throws Exception {
		HashMap<String, Object> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("admin", admin);
		
		userDao.setAdminUser(map);
	}

	@Override
	public void increaseWriteCount(int userNo) throws UserNotFoundException {
		userDao.increaseWriteCount(userNo);
	}

	
}
