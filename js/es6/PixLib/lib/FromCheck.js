
/*檢查手機號碼*/
function Check_tel(input){
	var phone = /^09[0-9]{2}[0-9]{6}$/;
	if (!phone.test(input)){
			alert("手機電話格式錯誤");
			return false;
	}
	return true;		
}

/* 檢查mail*/
function Check_email(input){
	var email = input;
	if(email.search(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)==-1){
		alert("請輸入正確的mail格式");
		return false;
	}
	return true;
}

export default {
	Check_tel : Check_tel,
	Check_email : Check_email
};