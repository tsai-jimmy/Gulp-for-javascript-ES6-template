/*取亂數值*/
function GetRandom(minNum, maxNum) {
	return Math.floor( Math.random() * (maxNum - minNum + 1) ) + minNum;
}

export default{
	GetRandom : GetRandom,
}