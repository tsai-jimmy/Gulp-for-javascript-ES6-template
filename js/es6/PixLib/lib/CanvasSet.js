/*
* --canvas 圖片寬高置中等比例
*
* Canvas 將圖片丟進去使用drawImage繪製時，等比例縮放還有置中參數
*
*   --使用說明
*	const dataImg = new CanvasSet.canvasSetDrawImg(imgData);
	dataImg.w     -> 寬
	dataImg.h     -> 高
	dataImg.tx    -> 座標 X
	dataImg.ty    -> 座標 Y
*
*
*/ 
function CanvasSetDrawImg(Drawimg,canvasWidth,canvasHeight) {
	let img = Drawimg,
		w = img.width,
		h = img.height,
		ratio = Math.max(canvasWidth/w, canvasHeight/h)

		return {
			"w": w *= ratio,
			"h": h *= ratio,
			"tx": canvasWidth - w >> 1,
			"ty": canvasHeight - h >> 1
		};
}
export default {
	CanvasSetDrawImg : CanvasSetDrawImg,
};