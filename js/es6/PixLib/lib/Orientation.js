
/*
* --判斷手機直橫
* portrait   直式
* landscape  橫式	
* 		
* 參數是傳入funciton callback	
* 		
* 判斷手機直橫
* 開發者模式測不出來，要實機測試 	
*/
function OrientationChange(portrait,landscape){
	if(portrait&&landscape){
		window.addEventListener("orientationchange",onOrientationchange ,false);
	}
	function onOrientationchange() {
		if (window.orientation === 180 || window.orientation === 0) {
			if(portrait){
				portrait();
			}
		}
		if (window.orientation === 90 || window.orientation === -90 ){
			if(landscape){
				landscape();
			}
		} 
	}
}
export default{
	OrientationChange : OrientationChange,
}