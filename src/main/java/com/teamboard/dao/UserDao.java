package com.teamboard.dao;

import java.util.List;

import com.teamboard.vo.User;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */

public interface UserDao {

	int signUpUser(User user) throws Exception;
	int unRegistUser(int no) throws Exception;
	User findOnebyUserNo(int userNo); 
	User findOnebyID(String userId); 
	List<User> findAll();
	User checkID(String id);
}
