'use strict';

var xCore = {


	/*
		Accesspoint to localStorage, automatically translates from and to JSON

			@param: (key) the key wanted object is saved at
			@param: (val) value to be set in keys position
	*/
	storage: {
		lS: window.localStorage,

		get:function (key) {
			return JSON.parse(this.lS.getItem(key));
		},
		set:function(key, val) {
			JSON.stringify(this.lS.setItem(key));
		},
		delete:function(key) {
			this.lS.removeItem(key);
		}
	},
	/*
		Accesspoint to backend/endpoint

			@param: (url) url to endpoint/backend
			@param: (mthd) type of request GET/POST
			@param: (cmd) name of api-call
			@param: (data) params for request
			@param: (success) success-callback
			@param: (error) error-callback
	*/
	backend: {
		endpointUrl: undefined,

		init:function(url) {
			this.endpointUrl = url;
		},
		request:function(mthd, cmd, data, success, error) {
			mthd === 'GET' ? this.getRequest(cmd, data, success, error)
			 : this.postRequest(cmd, data, success, error);
		},
		getRequest:function(cmd, data, success, error) {
			$.ajax({
				type: 'GET',
				url: this.endpointUrl + cmd,
				data: this.toParams(data),
				success: success,
				error: error
			});
		}, 
		postRequest:function(cmd, data, success, error) {
			$.ajax({
				type: 'POST',
				url: this.endpointUrl + cmd,
				data: this.toParams(data),
				success: success,
				error: error
			});
		},
		toParams:function(obj) {
			var str = Object.keys(obj).map(function(key){ 
				return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]); 
			}).join('&');
		}
	}
};