package com.teamboard.vo.common;

/**
 * Created by SSE on 2017-07-04.
 */
public enum Type {

	Notice("notice"),
	Issue("issue"),
	Etc("etc");

	final private String typeName;

	private Type(String typeName) { this.typeName = typeName; }

	public String getTypeName() { return this.typeName; }
}
