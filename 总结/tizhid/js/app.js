(function($, owner) {
	/*
	 * 服务器地址
	 **/
	var service_url = 'https://api.1zhidai.com';
	
	/**
	 * 获取通告内容
	 **/
	owner.topicinfo = function(api_token, topic_key, callback) {
		callback = callback || $.noop;
		api_token = api_token || '';
		topic_key = topic_key || '';
		var task = plus.uploader.createUpload(service_url + '/index/topic',
			{method:"POST"},
			function (result, status) {
				//console.log(result.responseText);
				if (status == 200 ) {
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						return callback(res.data);
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('您的网络有问题('+status+')，请退出应用重新登录');
				}  
			}
		);
		task.addData('api_token', api_token);
		task.addData('topic_key', topic_key);
		task.start();
	};
	/**
	 * 用户借款预计算
	 **/
	owner.loanpre = function(loanInfo, callback) {
		callback = callback || $.noop;
		loanInfo = loanInfo || {};
		loanInfo.loan_amount = loanInfo.loan_amount || '';
		loanInfo.duration = loanInfo.duration || '';
		loanInfo.geo_location = loanInfo.geo_location || '';
		loanInfo.storable_card_no = loanInfo.storable_card_no || '';
		loanInfo.source = loanInfo.source || '';
		loanInfo.api_token = loanInfo.api_token || '';
		//if (!loanInfo.storable_card_no) {
		//	return callback('请绑定新银行卡收款');
		//}
		if (parseInt(loanInfo.loan_amount) != loanInfo.loan_amount) {
			return callback('请输入正确的借款金额');
		}
		
		if (parseInt(loanInfo.duration) != loanInfo.duration) {
			return callback('请输入正确的借款时间');
		}
		if (!loanInfo.geo_location) {
			return callback('壹直贷获取您的位置失败，请在设置中打开获取位置权限，否则无法借款！');
		}
		var task = plus.uploader.createUpload(service_url + '/order/createpre',
			{method:"POST"},
			function (result, status) {
				//console.log(JSON.stringify(result));
				if (status == 200 ) {
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						return callback(res.data);
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('您的网络繁忙，请重试!');
				}  
			}
		);
		task.addData('geo_location', loanInfo.geo_location);
		task.addData('storable_card_no', loanInfo.storable_card_no);
		task.addData('loan_amount', loanInfo.loan_amount);
		task.addData('duration', loanInfo.duration);
		task.addData('source', loanInfo.source);
		task.addData('api_token', loanInfo.api_token);
		task.start();
	};
	/**
	 * 用户借款
	 **/
	owner.loan = function(loanInfo, callback) {
		callback = callback || $.noop;
		loanInfo = loanInfo || {};
		loanInfo.loan_amount = loanInfo.loan_amount || '';
		loanInfo.duration = loanInfo.duration || '';
		loanInfo.geo_location = loanInfo.geo_location || '';
		loanInfo.storable_card_no = loanInfo.storable_card_no || '';
		loanInfo.source = loanInfo.source || '';
		loanInfo.api_token = loanInfo.api_token || '';
		//if (!loanInfo.storable_card_no) {
		//	return callback('请绑定新银行卡收款');
		//}
		if (parseInt(loanInfo.loan_amount) != loanInfo.loan_amount) {
			return callback('请输入正确的借款金额');
		}
		
		if (parseInt(loanInfo.duration) != loanInfo.duration) {
			return callback('请输入正确的借款时间');
		}
		if (!loanInfo.geo_location) {
			return callback('壹直贷获取您的位置失败，请在设置中打开获取位置权限，否则无法借款！');
		}
		var task = plus.uploader.createUpload(service_url + '/order/create',
			{method:"POST"},
			function (result, status) {
				//console.log(JSON.stringify(result));
				if (status == 200 ) {
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						return callback();
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('您的网络繁忙，请重试!');
				}  
			}
		);
		task.addData('geo_location', loanInfo.geo_location);
		task.addData('storable_card_no', loanInfo.storable_card_no);
		task.addData('loan_amount', loanInfo.loan_amount);
		task.addData('duration', loanInfo.duration);
		task.addData('source', loanInfo.source);
		task.addData('api_token', loanInfo.api_token);
		task.start();
	};
	/**
	 * 用户借款记录
	 **/
	owner.loanlist = function(loanInfo, callback) {
		callback = callback || $.noop;
		loanInfo = loanInfo || {};
		loanInfo.loan_status = loanInfo.loan_status || '';
		loanInfo.api_token = loanInfo.api_token || '';
		var task = plus.uploader.createUpload(service_url + '/orders/list',
			{method:"POST"},
			function (result, status) {
				//console.log(JSON.stringify(result));
				if (status == 200 ) {
					var res = JSON.parse(result.responseText);
					if(res.status == 200){
						return callback(res.data);
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('您的网络繁忙，请返回重试!');
				}  
			}
		);
		task.addData('loan_status', loanInfo.loan_status);
		task.addData('api_token', loanInfo.api_token);
		task.start();
	};
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.phone = loginInfo.phone || '';
		loginInfo.password = loginInfo.password || '';
		//test
		if (loginInfo.phone.length < 11) {
			return callback('手机号最短为 11 个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		//alert(service_url);
		var task = plus.uploader.createUpload(service_url + '/user/login',
			{method:"POST"},
			function (result, status) {
				//alert(JSON.stringify(result.responseText));
				if (status == 200 ) {
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						owner.createState(res.data, callback);
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('您的网络繁忙('+status+')，请重试!');
				}  
			}
		);
		task.addData('phone', loginInfo.phone);
		task.addData('password', loginInfo.password);
		task.start();
	};
	/**
	 * 用户获取
	 **/
	owner.userinfo = function(api_token, callback) {
		callback = callback || $.noop;
		api_token = api_token || '';
		var task = plus.uploader.createUpload(service_url + '/user/info',
			{method:"POST"},
			function (result, status) {
				if (status == 200 ) {
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						return callback(res.data);
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('您的网络有问题，请重新登录');
				}  
			}
		);
		task.addData('api_token', api_token);
		task.start();
	};
	/**
	 * 用户获取
	 **/
	owner.userloaninfo = function(api_token, callback) {
		callback = callback || $.noop;
		api_token = api_token || '';
		var task = plus.uploader.createUpload(service_url + '/user/loaninfo',
			{method:"POST"},
			function (result, status) {
				//console.log(result.responseText);
				if (status == 200 ) {
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						return callback(res.data);
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('您的网络有问题('+status+')，请退出应用重新登录');
				}  
			}
		);
		task.addData('api_token', api_token);
		task.start();
	};
	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.phone = regInfo.phone || '';
		regInfo.password = regInfo.password || '';
		regInfo.password_confirmation = regInfo.password_confirmation || '';
		regInfo.captcha = regInfo.captcha || '';
		regInfo.email = regInfo.email || '';
		regInfo.source = regInfo.source || '';
		if (regInfo.phone.length < 11) {
			return callback('手机号最短需要11 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var task = plus.uploader.createUpload(service_url + '/user/register',
			{method:"POST"},
			function (result, status) {
				//alert(status);
				if (status == 200 ) {
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						return owner.createState(res.data, callback);
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('注册失败，请重试');
				}  
			}
		);
		task.addData('phone', regInfo.phone);
		task.addData('captcha', regInfo.captcha);
		task.addData('password', regInfo.password);
		task.addData('password_confirmation', regInfo.password_confirmation);
		task.addData('email', regInfo.email);
		task.addData('source', regInfo.source);
		task.start();
	};
	/**
	 * 发送验证码
	 **/
	owner.captcha = function(captchaInfo, callback) {
		callback = callback || $.noop;
		captchaInfo = captchaInfo || {};
		captchaInfo.phone = captchaInfo.phone || '';
		captchaInfo.type = captchaInfo.type || '';
		if (captchaInfo.phone.length < 11) {
			return callback('手机号最短需要11 个字符');
		}
		var task = plus.uploader.createUpload(service_url + '/user/captcha',
			{method:"POST"},
			function (result, status) {
				//conslole.log(JSON.stringify(result));
				if (status == 200 ) {
					var res = JSON.parse(result.responseText);
					if(res.status == 200){
						return callback();
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('发送失败，请返回主页后重试');
				}  
			}
		);
		task.addData('type', captchaInfo.type);
		task.addData('phone', captchaInfo.phone);
		task.start();
	};
	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(forgetInfo, callback) {
		callback = callback || $.noop;
		forgetInfo = forgetInfo || {};
		forgetInfo.phone = forgetInfo.phone || '';
		forgetInfo.password = forgetInfo.password || '';
		forgetInfo.password_confirmation = forgetInfo.password_confirmation || '';
		forgetInfo.captcha = forgetInfo.captcha || '';
		if (forgetInfo.phone.length < 11) {
			return callback('手机号最短需要11 个字符');
		}
		if (forgetInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		var task = plus.uploader.createUpload(service_url + '/user/forgetpassword',
			{method:"POST"},
			function (result, status) {
				//console.log(JSON.stringify(result));
				if (status == 200 ) {
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						return owner.createState(res.data, callback);
					}else{
						return callback(res.message);
					}	
				} else {  
					return callback('您的网络繁忙，请重试');
				}  
			}
		);
		task.addData('phone', forgetInfo.phone);
		task.addData('captcha', forgetInfo.captcha);
		task.addData('password', forgetInfo.password);
		task.addData('password_confirmation', forgetInfo.password_confirmation);
		task.start();
	};
	/**
	 * 退出登录
	 **/
	owner.logout = function(logoutInfo, callback) {
		callback = callback || $.noop;
		logoutInfo = logoutInfo || {};
		logoutInfo.api_token = logoutInfo.api_token || '';
		var task = plus.uploader.createUpload(service_url + '/user/logout',
			{method:"POST"},
			function (result, status) {
				//alert(JSON.stringify(result));
				if (status == 200 ) {
					var state = owner.getState();
					state.account = '';
					state.api_token = '';
					state.geo_location = '';
					state.device_info = '';
					owner.setState(state);
					return callback();
				} else {  
					return callback('您的网络繁忙，请重试');
				}  
			}
		);
		task.addData('api_token', logoutInfo.api_token);
		task.start();
	};
	/**
	 * 获取用户绑卡信息
	 **/
	owner.userbankcardsinfo = function(api_token, callback) {
		callback = callback || $.noop;
		api_token = api_token || '';
		var task = plus.uploader.createUpload(service_url + '/user/bankcardsinfo',
			{method:"POST"},
			function (result, status) {
				if (status == 200 ) {
					//console.log(result.responseText);
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						return callback(res.data);
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('您的网络有问题，请重新登录');
				}  
			}
		);
		task.addData('api_token', api_token);
		task.start();
	};
	/**
	 * 获取用户绑卡验证码
	 **/
	owner.bindBankcardcaptcha = function(bindcaptchaInfo, callback) {
		callback = callback || $.noop;
		bindcaptchaInfo = bindcaptchaInfo || {};
		bindcaptchaInfo.api_token = bindcaptchaInfo.api_token || '';
		bindcaptchaInfo.card_holder_name = bindcaptchaInfo.card_holder_name || '';
		bindcaptchaInfo.card_holder_id = bindcaptchaInfo.card_holder_id || '';
		bindcaptchaInfo.phone = bindcaptchaInfo.phone || '';
		bindcaptchaInfo.pan = bindcaptchaInfo.pan || '';
		if (bindcaptchaInfo.pan.length < 1) {
			return callback('请输入银行卡号！');
		}
		if (bindcaptchaInfo.card_holder_name.length < 1) {
			return callback('请输入开户名！');
		}
		if (bindcaptchaInfo.card_holder_id.length < 1) {
			return callback('请输入身份证号！');
		}
		if (bindcaptchaInfo.phone.length < 1) {
			return callback('请输入手机号！');
		}
		var task = plus.uploader.createUpload(service_url + '/user/bankcardcaptcha',
			{method:"POST"},
			function (result, status) {
				//console.log(result.responseText);
				if (status == 200 ) {
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						return callback(res.data);
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('您的网络有问题，请重新登录');
				}  
			}
		);
		task.addData('api_token', bindcaptchaInfo.api_token);
		task.addData('card_holder_name', bindcaptchaInfo.card_holder_name);
		task.addData('card_holder_id', bindcaptchaInfo.card_holder_id);
		task.addData('phone', bindcaptchaInfo.phone);
		task.addData('pan', bindcaptchaInfo.pan);
		task.start();
	};
	/**
	 * 用户绑卡
	 **/
	owner.bankcardbind = function(bankcardinfo, callback) {
		callback = callback || $.noop;
		bankcardinfo = bankcardinfo || {};
		bankcardinfo.api_token = bankcardinfo.api_token || '';
		bankcardinfo.bank_name = bankcardinfo.bank_name || '';
		bankcardinfo.province_city = bankcardinfo.province_city || '';
		bankcardinfo.bank_deposit = bankcardinfo.bank_deposit || '';
		bankcardinfo.bank_card_no = bankcardinfo.bank_card_no || '';
		bankcardinfo.bank_credit_name = bankcardinfo.bank_credit_name || '';
		bankcardinfo.bank_credit_id = bankcardinfo.bank_credit_id || '';
		bankcardinfo.bank_phone = bankcardinfo.bank_phone || '';
		bankcardinfo.captcha = bankcardinfo.captcha || '';
		bankcardinfo.token = bankcardinfo.token || '';
		if (bankcardinfo.bank_name.length < 1) {
			return callback('请选择银行名称');
		}
		if (bankcardinfo.province_city.length < 1) {
			return callback('请输入银行开户城市');
		}
		if (bankcardinfo.bank_deposit.length < 1) {
			return callback('请输入银行开户行');
		}
		if (bankcardinfo.bank_card_no.length < 1) {
			return callback('请输入银行卡号');
		}
		if (bankcardinfo.captcha.length < 1) {
			return callback('请输入短信验证码');
		}
		var task = plus.uploader.createUpload(service_url + '/user/bankcardbind',
			{method:"POST"},
			function (result, status) {
				//console.log(result.responseText);
				if (status == 200) {
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						return callback(res.data);
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('您的网络有问题，请重新登录');
				}  
			}
		);
		task.addData('api_token', bankcardinfo.api_token);
		task.addData('bank_name', bankcardinfo.bank_name);
		task.addData('province_city', bankcardinfo.province_city);
		task.addData('bank_deposit', bankcardinfo.bank_deposit);
		task.addData('bank_card_no', bankcardinfo.bank_card_no);
		task.addData('bank_credit_name', bankcardinfo.bank_credit_name);
		task.addData('bank_credit_id', bankcardinfo.bank_credit_id);
		task.addData('bank_phone', bankcardinfo.bank_phone);
		task.addData('captcha', bankcardinfo.captcha);
		task.addData('token', bankcardinfo.token);
		task.start();
	};
	/**
	 * 获取还款验证码
	 **/
	owner.repaymentCaptcha = function(repaymentInfo, callback) {
		callback = callback || $.noop;
		repaymentInfo = repaymentInfo || {};
		repaymentInfo.api_token = repaymentInfo.api_token || '';
		repaymentInfo.storable_pan = repaymentInfo.storable_pan || '';
		repaymentInfo.repayment_type = repaymentInfo.repayment_type || '';
		var task = plus.uploader.createUpload(service_url + '/order/repaymentcaptcha',
			{method:"POST"},
			function (result, status) {
				if (status == 200 ) {
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						return callback(res.data);
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('您的网络有问题，请重新登录');
				}  
			}
		);
		task.addData('api_token', repaymentInfo.api_token);
		task.addData('storable_pan', repaymentInfo.storable_pan);
		task.addData('repayment_type', repaymentInfo.repayment_type);
		task.start();
	};
	/**
	 * 用户还款
	 **/
	owner.repaymentOrder = function(reapymentInfo, callback) {
		callback = callback || $.noop;
		reapymentInfo = reapymentInfo || {};
		reapymentInfo.api_token = reapymentInfo.api_token || '';
		reapymentInfo.storable_card_no = reapymentInfo.storable_card_no || '';
		reapymentInfo.captcha = reapymentInfo.captcha || '';
		reapymentInfo.token = reapymentInfo.token || '';
		reapymentInfo.repayment_type = reapymentInfo.repayment_type || '';
		var task = plus.uploader.createUpload(service_url + '/order/repayment',
			{method:"POST"},
			function (result, status) {
				if (status == 200 ) {
					var res= JSON.parse(result.responseText);
					if(res.status == 200){
						return callback(res.data);
					}else{
						return callback(res.message);
					}	
				} else {
					return callback('您的网络有问题，请重新登录');
				}  
			}
		);
		task.addData('api_token', reapymentInfo.api_token);
		task.addData('storable_card_no', reapymentInfo.storable_card_no);
		task.addData('captcha', reapymentInfo.captcha);
		task.addData('token', reapymentInfo.token);
		task.addData('repayment_type', reapymentInfo.repayment_type);
		task.start();
	};
	
	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};
	
	owner.createState = function(data, callback) {
		var state = owner.getState();
		state.account = data.phone;
		state.api_token = data.api_token;
		owner.setState(state);
		return callback();
	};
	/**
	 * 获取用户登录状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置用户登录状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
	}
}(mui, window.app = {}));