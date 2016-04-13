/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 function addAqiData() {
 	var city = document.getElementById("aqi-city-input").value.trim();
 	var quality = document.getElementById("aqi-value-input").value.trim();
 	var reg1 = RegExp(/^[\u4e00-\u9fa5a-zA-Z]+$/);
 	var reg2 = RegExp(/^\d+$/);
 	if(city===null||!reg1.test(city)){
 		alert("城市名不规范！");
 	}else if(quality===null||!reg2.test(quality)){
 		alert("空气质量数值输入不规范！")
 	}else{
 		aqiData[city]=quality;
 	}
 }
 /*
 **修改表格中的内容
 **判断aqiData是否为空，不为空，则删除原表格，新建表格
 */
 function renderAqiList() {
 	var parentNode = document.getElementById("aqi-table");
 	while(parentNode.firstChild){
 		parentNode.removeChild(parentNode.firstChild);
 	}
 	var flag = false;
 	for(var aqi in aqiData){
 		flag = true;
 		break;
 	}
 	if(flag){
 		parentNode.appendChild(trNode("城市", "空气质量","操作"));
 		for(data in aqiData){
 			parentNode.appendChild(trNode(data,aqiData[data],"删除"));
 		}
 	}
 }
 	/*
 	**作用：填写表格中的一格
 	**输入：一格中的数据
 	**返回：表格的td节点
 	*/
 function tdNode(data){
 	var td = document.createElement("td");
 	var tx = document.createTextNode(data);
 	if(data!=="删除"){
 		td.appendChild(tx);
 	}else{
 		var a = document.createElement("a");
 		a.href = "#";
 		a.onclick = function(){
 			delBtnHandle(td);
 		}
 		a.appendChild(tx);
 		td.appendChild(a);
 	}
 	return td;
 }
 /*
 **作用：填写表格中的一行
 **输入：一行的的三个数据
 **返回：表格的tr节点
 */
 function trNode(data1,data2,data3){
 	var tr = document.createElement("tr");
 	tr.appendChild(tdNode(data1));
 	tr.appendChild(tdNode(data2));
 	tr.appendChild(tdNode(data3));
 	return tr;
 }
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
 function delBtnHandle(td) {
   // do sth.
 	var tr = td.parentNode;
 	var temp = tr.firstChild;
 	while(temp.nodeType!==1){
 		temp = temp.nextSbling();
 	}
 	delete aqiData[temp.innerHTML];
   renderAqiList();
 }
 function addBtnHandle() {
   addAqiData();
   renderAqiList();
 }

 function init() {
   // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
 	document.getElementById("add-btn").onclick=function(){
 		addBtnHandle();
 	}
   // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

 }
 init();
