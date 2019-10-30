//入口函数；
$(function () {

    //页面刷新加载价格；==>调用；
    jiesuan();

    //给购物车回退和消息；注册点击事件；
    $('header b,header a').click(function (e) {
        //清除a标签的默认跳转；
        e.preventDefault();
        //判断当前点击的元素对象；
        console.log(this)
        if (this.nodeName === 'B') {
            location.href = './indent(订单).html';
        } else if (this.nodeName === 'A') {
            location.href = '';
        }
    });


    //原生JS代码；==========================================================全选！
    var inpu = document.querySelectorAll('.close .left input');
    //循环遍历注册点击事件；
    for (var i = 0; i < inpu.length; i++) {
        inpu[i].onclick = function () {
            //获取当前的按钮checkbox属性值；
            var state = this.checked;
            var a = this.previousElementSibling
            //获取所有的子项按钮；
            var inpu_z = document.querySelectorAll('.fruits .circle+input');
            //获取所有的span;
            var sp = document.querySelectorAll('.fruits .circle');
            //判断；
            if (state) {
                //添加背景图片；
                a.style.backgroundImage = 'url("images/圆圈.png")';
                a.style.borderColor = '#ff6565';
                //循环遍历所有的子项按钮；
                for (var j = 0; j < inpu_z.length; j++) {
                    //让所有的子项按钮选中；
                    inpu_z[j].checked = state;
                    //给span加背景；
                    sp[j].style.backgroundImage = 'url("images/圆圈.png")';
                    sp[j].style.borderColor = '#ff6565';
                }
                //从新计算；
                jiesuan();
            } else {
                a.style.backgroundImage = '';
                a.style.borderColor = '#696969';
                //循环遍历所有的子项按钮；
                for (var j = 0; j < inpu_z.length; j++) {
                    //让所有的子项按钮不选中；
                    inpu_z[j].checked = state;
                    //给span去背景；
                    sp[j].style.backgroundImage = '';
                    sp[j].style.borderColor = '#696969';
                }
                //从新计算；
                jiesuan();
            }
        }
    }

    //原生js代码；=====================事件委托===============================单选！
    var ul = document.querySelector('.dingdan .dd');
    //注册点击事件；原理：事件委托；
    ul.onclick = function (e) {
        //判断当前的点击对象是不是 input；
        if (e.target.nodeName === 'INPUT') {
            //从新计算；
            jiesuan();
            //开关思想；
            var key_ = true;
            $('.dingdan .fruits li> input').each(function (index, item) {
                //转换为jQuery对象；
                var key = item.checked;
                var inp = item.previousElementSibling;
                //判断当前的按钮状态；
                if (key) {
                    inp.style.backgroundImage = 'url("images/圆圈.png")';
                    inp.style.borderColor = '#ff6565';
                    console.log(9999)
                } else {
                    inp.style.backgroundImage = '';
                    inp.style.borderColor = '#696969';
                }
                //判断：只要有一个按钮不成立，则全选按钮不选中；
                if (key == false) {
                    $('.close .left input').prop('checked', false);
                    key_ = false;
                    return;
                }
            });
            //判断；
            if (key_) {
                $('.close .left input').prop('checked', key_);
                var sp = $('.close .left input')[0].previousElementSibling;
                sp.style.backgroundImage = 'url("images/圆圈.png")';
                sp.style.borderColor = '#ff6565';
            } else {
                $('.close .left input').prop('checked', key_);
                var sp = $('.close .left input')[0].previousElementSibling;
                sp.style.backgroundImage = 'url("")';
                sp.style.borderColor = '#696969';
            }
        }
    }

    //根据按钮的点击状态来进行结算；===========================================总价
    function jiesuan() {
        //定义变量接收总价格；
        var sum = 0;
        var sum_a = 0;
        //循环遍历所有的单选按钮；
        $('.dingdan .fruits li> input').each(function (index, item) {

            //判断每个按钮的状态；
            if ($(item).prop('checked')) {
                //获取单价；
                var dj = $(item).siblings('div').find('.dj').text();
                //获取数量；
                var am = $(item).siblings('div').find('.ip input').val();
                sum = parseFloat(dj) * am;
                sum_a += sum
            }
        })
        //计算总价；
        $('.close .right span').text(sum_a.toFixed(2))
    }

    //本地储存的函数封装；
    function local() {
        //获取本地数据；
        var str = localStorage.getItem('list');
        //判断：有则转为对象，无则为空；
        if (str != null) {
            return JSON.parse(str);
        }
    };
    //调用该函数；
    var arr = local();

    //定义空字符串开始拼接；==================================================渲染到；
    var strli = '';
    arr.forEach(function (item, index) {
        if (!(item.namv == 0)) {
            //遍历数组开始拼接；
            strli += `
                        <li>
                            <span class='circle'></span>
                            <input type="checkbox">
                            <div>
                                <img alt="" src="${item.img}">
                            </div>
                            <div>
                                <h5>${item.name}</h5>
                                <h6>${item.width}</h6>
                                <div>
                                    <span>￥</span>
                                    <span class='dj'>${item.numdj}</span>
                                    <span>￥122</span>
                                </div>
                            </div>
                            <div>
                                <i>-</i>
                                <span class='ip'>
                                    <input type="text" value='${item.namv}'>
                                </span>
                                <i>+</i>
                            </div>
                            <span class='circle_bo'></span>
            </li>`
            //把拼接好的字符串添加到ul中；
        }
        return
    })
    //添加到ul结构中；
    $('.fruits ul').html(strli);
    //从新计算价格；
    jiesuan();

    //注册点击事件；事件委托！加减数量；========================================数量！
    $('.dingdan .dd').on('click', 'i', function () {
        //获取当前的点击内容；
        var click = $(this).text();
        //获取当前点击对象的元素；
        var text = $(this).siblings('span').find('input').val();
        //获取单价的值；
        //计算一种商品的总价；
        if (click == '-') {
            text--;
            if (text < 1) {
                $(this).next().find('input').val(1);
            } else {
                $(this).next().find('input').val(text);
                //从新计算价格；
                jiesuan();
            }
        } else if (click == '+') {
            text++;
            $(this).prev().find('input').val(text);
            //从新计算价格；
            jiesuan();
        }


        //数据操作-------------------------------------------------------
        //获取本地数据；
        console.log(text);
        var str = localStorage.getItem('list');
        var arr = JSON.parse(str);
        var thisnum = $(this).parent().prev().find('.dj').text()
        console.log(thisnum);
        
        arr.forEach(function (item, index) {

            //判断当价格是58的时候把里面的数量改成当前数量
            if (item.numdj == thisnum) {
                item.namv = text;

            }

        })
        //上传本地
        localStorage.setItem('list', JSON.stringify(arr))
        //数据完成-------------------------------------------------------

        

    });

    //获取所有的删除元素对象；原理：事件委托；===================================删除
    $('.dingdan .dd').on('click', '.circle_bo', function () {
        //改变this指向；
        var that = this;
        //判断Li有无内容，若无内容则全选按钮不选中；
        // console.log($('.fruits ul li'))
        if ($('.fruits ul li').length == 1) {
            $('.circle_bo').prop('checked', false);
            $('.close .left input').prev().css('backgroundImage', '');
            console.log(234)
        }

        // 循环遍历数组并删除队组中相对应的数据
        arr.forEach(function (item, index) {
            // console.log($(that).siblings('div').find('.dj').text())
            if (item.numdj == $(that).siblings('div').find('.dj').text()) {
                //获取下标；
                arr.indexOf(item);
                //根据下标删除数组中对应的数据；
                arr.splice(arr.indexOf(item), 1);
                //删除页面上的li元素对象；
                $(that).parent().remove()
            }
        })

        //从新保存到本地
        var str = JSON.stringify(arr);
        localStorage.setItem('list', str);
        //调用函数从新计算；
        jiesuan();
    })

    //点击li跳转对应页面----------------------------------------------------
    $('ul').on('click','li div img',function (e) {
       var thisnum = $(this).parent().next().find('.dj').text();
       if (thisnum==48) {
           location.href='7商品详情大虾.html'
       }else if (thisnum==58) {
        location.href='7商品详情百香果.html'
       }else if(thisnum==78){
        location.href='7商品详情鸡翅.html'
       }
        
    })
});