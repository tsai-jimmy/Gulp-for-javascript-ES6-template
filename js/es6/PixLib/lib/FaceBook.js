/* SDK: https://connect.facebook.net/zh_TW/sdk.js */
export default class FaceBook {
	constructor(callback) {
		let fb_id = null 
		let host = window.location.hostname;
		switch (host) {
			//本機
			case 'localhost':
				fb_id = '1980456468860597';
				break;
			//pixnet demo站
			case 'demo.pixnet.ws':
				fb_id = '145272876087264';
				break;
			//正式站	
			case 'leejeanstw.events.pixnet.net':
				fb_id = '1289376421190108';
				break;	
			//其他網域
			default:
				fb_id = '123063431735464';
				break;		
		}
		FB.init({
			appId      : fb_id,
			xfbml      : true,
			version    : 'v2.10'
		});
		FB.AppEvents.logPageView();
		FB.getLoginStatus(res => {
			if (res.status === "connected") {
				FB.status = "connected";
				if (callback) callback('connected');
			}else{
				FB.status = "no_connected";
				if(callback) callback('no_connected');
			}
		})
	}
	easyFbShare(url) {
		return window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(url)), "_blank","toolbar=yes,location=yes,directories=no,status=no, menubar=yes, scrollbars=yes,resizable=no, copyhistory=yes, width=600, height=400" )
	}
	fbShare(url, hashtag, callback) {
		FB.ui({
			method: 'share',
			href: url,
			mobile_iframe: false,
			hashtag: hashtag,
			display: 'popup',
		},(res)=> {
			if (callback) callback(res);
		});
	}

	fbApiCallMe(callback) {
		FB.api('/me?fields=id,name,email,picture.width(480)', res => {
			if (res.error) return;
			window.fb_user_data = {
				id	    : res.id,
				name	: res.name,
				picture : res.picture.data.url,
				email   : res.email
			}
			if(callback) callback(window.fb_user_data)
		});
	}
}