package com.teamboard.dao;

import java.util.List;
import java.util.Map;

import com.teamboard.vo.User;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 16.
 * @description : TODO
 */

public interface UserDao {

	int signUpUser(User user) throws Exception;
	int updateUser(User user) throws Exception;
	int changeAdmin(User user) throws Exception;
	int unRegistUser(int no) throws Exception;
	
	User findOnebyUserNo(int userNo); 
	User findOnebyIDandPW(Map<String, Object> paramMap);
	User findOnebyID(String userId); 
	List<User> findAll();
}
