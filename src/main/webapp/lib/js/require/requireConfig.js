/**
 *  main.js for require.js
 */

require.config({
	shim: {
		"bootstrap" : {"deps"   : ['jquery']},
		"domReady" : ["jquery"]
	},
	
	paths: {
		'common': '../common',
		'jquery' : '../../jquery/dist/jquery.min',
		'bootstrap' : '../../bootstrap/dist/js/bootstrap.min',
		'domReady' : 'domReady'
	}
})


//require( ['jquery', 'bootstrap'], function($) {
//	console.log("config jquery 로딩")
//	$(document).ready(function() {
//		if(console) console.log("module Loaded!!!");;
//	})
//})