package com.teamboard.Interceptor;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class LoginInterceptor extends HandlerInterceptorAdapter {

//	Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);
//
//	@Override
//	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//			throws Exception {
//	  
//		System.out.println("로그인 인터셉터!!!!!!!!!!!!!!!!!!!!");
//		System.out.println("path: " + request.getContextPath());
//	  HttpSession session = request.getSession(false);    
//      logger.debug(" what user login? : {}", session.getAttribute("whatUser"));
//      
//      
////      
////      if((session.getAttribute("user") == null)){
////          response.sendRedirect("/login.html");
////          return false;
////      }
////      return super.preHandle(request, response, handler);
//
//      return true;
//	}
//
//	@Override
//	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
//			ModelAndView modelAndView) throws Exception {
//		// TODO Auto-generated method stub
//		System.out.println("post handle");
//		super.postHandle(request, response, handler, modelAndView);
//	}
	protected final Logger logger = LoggerFactory.getLogger(this.getClass());
	   
	  @Override
	  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
	      throws Exception {
		System.out.println("preHandle!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	    logger.info("===========================          START         ===========================");
	    logger.info(" Request URI \t:  " + request.getRequestURI());
	     
	    Enumeration<String> paramNames = request.getParameterNames();
	    while (paramNames.hasMoreElements()) {
	      String key = (String) paramNames.nextElement();
	      String value = request.getParameter(key);
	      logger.debug(" RequestParameter Data ==>  " + key + " : " + value + "");
	    }
	       
	    return super.preHandle(request, response, handler);
	 
	  }
	 
	  @Override
	  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
	      ModelAndView modelAndView) throws Exception {
		System.out.println("postHandle!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	    logger.info("===========================          END           ===========================");
	   
	  }

	
}
