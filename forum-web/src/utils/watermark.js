let watermark = {}

let setWatermark = (str) => {
    //创建一个画布
    let can = document.createElement('canvas');
    //设置画布的长宽
    can.width = 600;
    can.height = 400;
    let cans = can.getContext('2d');
    //旋转角度
    cans.rotate(-18 * Math.PI / 180);
    cans.font = '16px Vedana';
    //设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = 'rgba(200, 200, 200, 0.40)';
    //设置文本内容的当前对齐方式
    cans.textAlign = 'left';
    //设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'Middle';
    //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
    cans.fillText(str, can.width / 3, can.height / 2);
    let div = document.querySelectorAll('.cbg_prebox');
    for(let i = 0;i < div.length;i++){
        div[i].style.background = 'url(' + can.toDataURL('image/png') + ') left top no-repeat';
    }
}

// 该方法只允许调用一次
watermark.set = (str) => {
    setWatermark(str);
        window.onresize = () => {
            setWatermark(str)
        }
}

export default watermark;

