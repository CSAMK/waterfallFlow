var container = document.querySelector('.container');
var imgWidth = 220;

// 初始化函数
function init() {
    // 创建图片
    createImg();

    // 监听窗口拖动
    bindEvent();
    
}
init();

// 创建图片
function createImg() {
    for (var i = 0; i <= 40; i++) {
        var img = document.createElement('img');
        img.src = `./img/${i}.jpg`;
        img.style.width = imgWidth + 'px';
        container.appendChild(img);

        // 当图片加载完后，对他们进行排列
        img.onload = setPosition;
    }
}

// 对图片进行排列
function setPosition() {
    // 先计算出列数
    var info = cal();

    // 创建一个数组用来存储每列的高度
    var arr = new Array(info.imgNum);
    arr.fill(0);

    for (var i = 0; i < container.children.length; i++) {
        var img = container.children[i];
        var min = getMin(arr);
        img.style.top = min + 'px';

        var index = arr.indexOf(min);
        arr[index] += img.clientHeight + info.space;

        img.style.left = index * img.clientWidth + (index + 1) * info.space + 'px';
    }
    var max = getMax(arr);
    container.style.height = max + 'px';

}

// 计算出列数
function cal() {
    // 获取容器的宽度
    var containerWidth = container.clientWidth;
    // 获取一行最多能放几个图片
    var imgNum = Math.floor(containerWidth / imgWidth);
    // 获取总间隙
    var allSpace = containerWidth - imgWidth * imgNum;
    // 获取每个间隙的大小
    var space = allSpace / (imgNum + 1);

    return {
        imgNum: imgNum,
        space: space
    }
}

// 获取最小值
function getMin(arr) {
    var min = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < min){
            min = arr[i];
        } 
    }
    return min;
}

// 获取最大值
function getMax(arr) {
    var max = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max){
            max = arr[i];
        } 
    }
    return max;
}

// 每次窗口拖动就重新排列图片
var timerId = null;
function bindEvent() {
    window.onresize = function() {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
        timerId = setTimeout(setPosition, 50);
    }
}