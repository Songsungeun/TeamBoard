package com.teamboard.service;

import java.util.List;

import com.teamboard.Exception.UserNotFoundException;
import com.teamboard.vo.User;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */

public interface UserService {

	public void signUpUser(User user) throws Exception;
	public void unregister(int userNo) throws Exception;
	public void updateUser(User user) throws Exception;
	public void changeAdmin(User user) throws Exception;
	
	public User findOne(int userNo) throws UserNotFoundException;
	public User findOnebyID(String userId) throws UserNotFoundException;
	public List<User> findAll();
	public User checkID(String userId);
	
}
