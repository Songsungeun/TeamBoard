package com.teamboard.vo.common;

/**
 * Created by SSE on 2017-07-04.
 */
public class JsonResult{

	String state;
	Object data;
	Object data2;

	// Method - success

	public static JsonResult success() {
		return new JsonResult(Constants.SUCCESS);
	}

	public static JsonResult success(Object data) {
		return new JsonResult(Constants.SUCCESS, data);
	}

	public static JsonResult success(Object data1, Object data2) {
		return new JsonResult(Constants.SUCCESS, data1, data2);
	}

	// Method - fail

	public static JsonResult fail() {
		return new JsonResult(Constants.FAIL);
	}

	public static JsonResult fail(Object data) {
		return new JsonResult(Constants.FAIL, data);
	}

	public static JsonResult fail(Object data1, Object data2) {
		return new JsonResult(Constants.FAIL, data1, data2);
	}

	// Method - error

	public static JsonResult error() {
		return new JsonResult(Constants.ERROR);
	}

	public static JsonResult error(Object data) {
		return new JsonResult(Constants.ERROR, data);
	}

	// Construct

	public JsonResult(String state) {
		this.state = state;
	}

	public JsonResult(String state, Object data) {
		this.state = state;
		this.data = data;
	}

	public JsonResult(String state, Object data, Object data2) {
		this.state = state;
		this.data = data;
		this.data2 = data2;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public Object getData2() {
		return data2;
	}

	public void setData2(Object data2) {
		this.data2 = data2;
	}
	
	
}
