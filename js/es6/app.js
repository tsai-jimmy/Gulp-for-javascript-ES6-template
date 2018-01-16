import obj from "./page.js";
import PixG from "./PixLib/PixG";
$(function () {
    const m = new obj();
    m.logFn();
    const i = PixG.SetInt.GetRandom(1, 9);
    console.log(i);
})