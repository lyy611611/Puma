$(function(){
			$(".car").hover(function(){
				if($.cookie("goods")==null){
					return;
				}
				$(".goodcartbg").css("display","block");
				$(".goodcartbg").animate({opacity:1},500);
				shopcar();
			},function(){
				
				$(".goodcartbg").css("display","none");
			})
			$(".goodcartbg").hover(function(){
				$(".goodcartbg").css("opacity","1")
				$(".goodcartbg").css("display","block");
			},function(){
				$(".goodcartbg").css("display","none");
				$(".goodcartbg").animate({opacity:0.6},500);
			})
			
			sc_car();
			function sc_car(){
				var sc_str = $.cookie('goods');
				if(sc_str){//如果购物车cookie不为空。
					var sc_obj = eval(sc_str);
					var sc_num = 0 ; 
					for(var i in sc_obj){
						sc_num = Number(sc_obj[i].num) + sc_num;
					}
					$("#num").html(sc_num);
					return sc_num;
				}
			}
			function shopcar(){
				$.ajax({
					type:"get",
					url:"js/products.json",
					success:function(data){
						
						var sc_str = $.cookie('goods');
						if(sc_str){
							var html = "";
							var sc_obj = eval(sc_str);
							var sc_num = 0 ;
//											
							for(var i in sc_obj){
								html+='<div class="goodsli"><div class="mincarimg"><img src = '+data[sc_obj[i].id].img+'/></div><div class="goodinform"><p>'
								+data[sc_obj[i].id].title+'</p><p>';
								if(data[sc_obj[i].id].sale==true){
									html+=data[sc_obj[i].id].red;
								}else{
									html+=data[sc_obj[i].id].price;
								}
								html+='</p><h5>数量:<span>'+sc_obj[i].num+'</span></h5></div></div>'
							}
							html+='<div class="total"><div class="totalprice"><p>小计[<span></span>件商品]:<a></a></p>'+
								'</div><div class="settle">去结账<i></i></div><a href="shoppingcart.html" class="tocart">查看购物车</a></div>'
							$(".goodcart").html(html);
							$(".totalprice p span").html(sc_car());
						}
					}
					
				});
			}
		})