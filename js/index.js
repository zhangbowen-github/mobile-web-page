//入口函数；
$(function () {

    // 顶部导航栏下拉变色
    //给win注册滚动事件；
    $(window).scroll(function () {
        //获取文档的卷曲出去的值；
        var docheight = $(document).scrollTop();
        //获取导航栏的高度；
        var toubu = $('.toubu').outerHeight();
        //获取扫码支付在文档中的纵向位置；
        var pay = $('.pay').offset().top;
        //判断；
        if (docheight < pay - toubu) {
            //获取透明度的范围 0-1
            var lucency = docheight / (pay - toubu);
            //改变透明度；
            $('.toubu').css('backgroundColor', 'rgba(92, 169, 246,' + lucency);
        } else {
            $('.toubu').css('backgroundColor', 'rgba(92, 169, 246,1)');
        }
    });


    //获取焦点，隐藏放大镜；
    //获取input元素对象，并注册获取焦点事件；
    $('.search input').focus(function () {
        //获取元素对象，隐藏放大镜；
        $('.search span').fadeOut(1);
        $(this).removeAttr('placeholder');
    });
    //失去焦点，显示放大镜；
    //获取input元素对象，并注册获取焦点事件；
    $('.search input').blur(function () {
        //判断用户是否有输入；
        if ($(this).val()=='') {
            //获取元素对象，隐藏放大镜；
            $('.search span').show();
        }
        $(this).attr('placeholder', '小龙虾');
    });



    //新鲜水果部分开始；
    $('.fruits .f_top a').click(function (e) {
        //阻止a标签的默认跳转；
        e.preventDefault();
        //获取当前点击元素的下标；
        var ind=$(this).index();
        //跳转到详情页；
        // location.href='./5分类.html';
        location.href='./5分类.html?'+ind;
    })



    //今日头条；
    //获取当前日期；
    function dat() {
        //创建日期对象；
        var date = new Date();
        var month = date.getMonth();
        month += 1
        var om = optimize(month)
        var day = date.getDate();
        var od = optimize(day)
        return om + '.' + od;
    }


    //日期优化；
    function optimize(t) {
        if (t < 10) {
            t = '0' + t;
        }
        return t;
    }

    //获取元素对象；修改参数
    $('.f_bottom .data').text(dat());


    //现实抢购倒计时；
    (function () {
        var time = document.querySelector("#time");
        var fen = document.querySelector('#fen');
        var miao = document.querySelector('#miao')
        var oldtime = new Date(); //传入的时间
        oldtime = oldtime.setDate(oldtime.getDate() + 1); //模拟24小时后的时间
        //时间换算
        function xiaoshi(oldtime) {
            var newtime = new Date();
            var time = (oldtime - newtime) / 1000;
            var h = parseInt(time / 60 / 60 % 24);
            return h;
        }

        function fenzheng(oldtime) {
            var newtime = new Date();
            var time = (oldtime - newtime) / 1000;
            var m = parseInt(time / 60 % 60);
            return m;
        }

        function timemiao(oldtime) {
            var newtime = new Date();
            var time = (oldtime - newtime) / 1000;
            var s = parseInt(time % 60);
            return s;
        }

        setInterval(function () {
            time.innerHTML = xiaoshi(oldtime);
            fen.innerHTML = fenzheng(oldtime);
            miao.innerHTML = timemiao(oldtime);

        }, 1000)
    })();


    //底部导航栏跳转；
    $('.bot>div').click(function () {
        var ind = $(this).index();
        if (ind == 0) {
           return
        } else if (ind == 1) {
            location.href='./5分类.html'
        } else if (ind == 2) {
            location.href='./食谱.html'
        } else if (ind == 3) {
            location.href='./indent(订单).html'
        } else if (ind == 4) {
            location.href = './me.html'
        }
    })
});


