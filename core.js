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
	},

	console: {
		$console:undefined,

		init:function(){
			$('body').append('<div class="x-core-console-wrapper" style="position:fixed;bottom:0;left:0;right:0;height:30%;overflow:auto;background-color:#383434;border-top:10px solid #383434"><ul class="x-core-console" style="margin:0;padding:0;"></ul></div>');
			this.$console = $('.x-core-console');
		},
		print:function(success, title, desc) {
			this.$console.append('<li class="x-core-console-msg" style="display:block;padding:5px;overflow:hidden;"><span class="x-core-console-title" style="display:block;float:left;padding-right:10px;color:'+(success?'#0cff00':'#ff0000')+'">'+title+'</span><span class="x-core-console-desc" style="display:block;float:left;color:#fff;">'+desc+'</span></li>');
		}

	}
};