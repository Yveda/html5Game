//顶点在左上方
var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
}

var pingpong = {
    scoreA: 0,
    scoreB: 0
};
pingpong.pressedKeys = []; //存储按键状态

pingpong.ball = {
    speed: 5,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
}

$(function() {
    //设置interval用于每30秒调用一次gameloop
    pingpong.timer = setInterval(gameloop, 30);
    //标记下pressedKey数组里某键的状态是按下还是放开
    $(document).keydown((e) => {
        pingpong.pressedKeys[e.which] = true;
    })

    $(document).keyup((e) => {
        pingpong.pressedKeys[e.which] = false;
    })
})


function gameloop() {
    moveBall();
    movePaddles();
}

function movePaddles() {
    //使用自动以定时器不断检测是否有按键被按下
    if (pingpong.pressedKeys[KEY.UP]) { //向上键
        //把球拍B向上移动五个像素
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top", top - 5);
    }
    if (pingpong.pressedKeys[KEY.DOWN]) { //向下键
        var top = parseInt($("#paddleB").css("top"));
        //把球拍B向下移动五个像素
        $("#paddleB").css("top", top + 5);
    }
    if (pingpong.pressedKeys[KEY.W]) { //向下键
        var top = parseInt($("#paddleA").css("top"));
        //把球拍A向上移动五个像素
        $("#paddleA").css("top", top - 5);
    }
    if (pingpong.pressedKeys[KEY.S]) { //向下键
        var top = parseInt($("#paddleA").css("top"));
        //把球拍A向下移动五个像素
        $("#paddleA").css("top", top + 5);
    }
}

function moveBall() {
    //引用需要用的变量
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var ball = pingpong.ball;

    //检测球台边缘
    //检测底边
    if (ball.y + ball.speed * ball.directionY > playgroundHeight) {
        ball.directionY = -1;
    }
    //检测上边
    if (ball.y + ball.speed * ball.directionY < 0) {
        ball.directionY = 1;
    }
    //检测左边
    if (ball.x + ball.speed * ball.directionX > playgroundWidth) {
        // ball.directionX = -1;
        //玩家B丢分、重置乒乓球
        ball.x = 250;
        ball.y = 100;
        $("#ball").css({
            "left": ball.x,
            "right": ball.y
        })
        ball.directionX = -1
        pingpong.scoreA++;
        $("#scoreA").html(pingpong.scoreA);
    }
    //检测右边
    if (ball.x + ball.speed * ball.directionX < 0) {
        //玩家A丢分、重置乒乓球
        ball.x = 150;
        ball.y = 100;
        $("#ball").css({
            "left": ball.x,
            "right": ball.y
        })
        ball.directionX = 1;
        pingpong.scoreB++;
        $("#scoreB").html(pingpong.scoreB);
    }

    //检查左边球拍
    //球拍距离左边的距离
    var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
    //球拍距离底部的距离
    var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    //球拍距离顶部的距离
    var paddleAYTop = parseInt($("#paddleA").css('top'));
    if (ball.x + ball.speed * ball.directionX < paddleAX) {
        if (ball.y + ball.speed * ball.directionY <= paddleAYBottom && ball.y + ball.speed * ball.directionY >= paddleAYTop) {
            ball.directionX = 1;
        }
    }

    //检查左边球拍
    //球拍距离右边的距离
    var paddleBX = parseInt($("#paddleB").css("left"));
    //球拍距离底部的距离
    var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    //球拍A距离顶部的距离
    var paddleBYTop = parseInt($("#paddleB").css('top'));
    if (ball.x + ball.speed * ball.directionX >= paddleBX) {
        if (ball.y + ball.speed * ball.directionY <= paddleBYBottom && ball.y + ball.speed * ball.directionY >= paddleBYTop) {
            ball.directionX = -1;
        }
    }


    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;

    $("#ball").css({
        "left": ball.x,
        "top": ball.y
    })
}