import UrlGetSet from "./UrlGetSet";
/*debug的console.log*/
function ConsoleLog(val) {
	let debug = UrlGetSet.UrlSearch();
	if(debug["debug"]=="true"){
		console.log("debug ->",val);
	}
};

export default{
    ConsoleLog: ConsoleLog,
}