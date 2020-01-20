   var KEY = {
       UP: 38,
       DOWN: 40,
       W: 87,
       S: 83
   }

   $(function() {
       $(function() {
           //    $("#paddleB").css("top", "20px");
           //    $("#paddleA").css("top", "60px");
           //    $(".box").css({ "top": "100px", "left": "200px" });

           //监听按键事件
           $(document).keydown((e) => {
               switch (e.which) {
                   case KEY.UP: //向上键
                       //获取球拍B当前top值并转化成int类型
                       var top = parseInt($("#paddleB").css("top"));
                       //球拍B向上移动五个像素
                       $("#paddleB").css("top", top - 5);
                       break;
                   case KEY.DOWN:
                       var top = parseInt($("#paddleB").css("top"));
                       //把球拍B向下移动五个像素
                       $("#paddleB").css("top", top + 5);
                       break;
                   case KEY.W:
                       var top = parseInt($("#paddleA").css("top"));
                       //把球拍A向上移动五个像素
                       $("#paddleA").css("top", top - 5);
                       break;
                   case KEY.S:
                       var top = parseInt($("#paddleA").css("top"));
                       //把球拍A向下移动五个像素
                       $("#paddleA").css("top", top + 5);
                       break;
               }
           })
       })
   })