package com.teamboard.vo.common;


/**
 * @author : Songsungeun
 * @date : 2017. 6. 19.
 * @description : TODO
 */

public enum Category {

	CommonSat("commonSAT"),
	Sat15("SAT15"),
	Sat16("SAT16"),
	Sat17("SAT17"),
	RoomSpeaker("RoomSpeaker"),
	MultiRoomApp("MultiRoomApp"),
	BandApp("BandApp"),
	BDandHES("BDnHES"),
	Pvr("PVR"),
	SamsungConnect("SamsungConnect"),
	Convergence("Convergence");
	
	final private String categoryName;
	
	private Category(String categoryName) {
		this.categoryName = categoryName;
	}
	
	public String getCategoryType() {
		return this.categoryName;
	}
}

