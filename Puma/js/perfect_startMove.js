		function startMove(obj, json, func){
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){

				var bStop = true; //标示当前所有的样式都到达目的值了,为true

				for(var attr in json){
					//1.取出该属性的当前值
					var iCur = 0;
					//<1>透明度取值的时候不同
					if(attr == "opacity"){
						iCur = parseFloat(getStyle(obj, attr)) * 100;
					}else{
						iCur = parseInt(getStyle(obj, attr));
					}
					var speed = (json[attr] - iCur) / 8;
					//2.速度处理
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					if(iCur != json[attr]){
						bStop = false;
					}
					//<2>透明度赋值的时候不同
					if(attr == "opacity"){
						iCur += speed;
						obj.style.filter = "alpha(opacity=" + iCur + ")";
						obj.style.opacity = iCur / 100

					}else{
						obj.style[attr] = iCur + speed + "px";
					}

				}
				if(bStop){
					clearInterval(obj.timer);
					if(func){
						//<3>
						func();
					}
				}
			}, 30)
		}

			//当前有效的样式
		function getStyle(element, style){
			if(element.currentStyle){
				return element.currentStyle[style];
			}else{
				return getComputedStyle(element)[style];
			}
		}