"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = __importDefault(require("@tarojs/taro"));
const weapp_qrcode_1 = __importDefault(require("weapp-qrcode"));
// canvas绘制辅助
class CanvasHelper {
    constructor(props) {
        this.scale = 1;
        this.ctx = null;
        const { ctx } = props;
        this.ctx = ctx;
        this.init();
    }
    async init() {
        const { screenWidth } = wx.getSystemInfoSync();
        this.scale = screenWidth / 750;
    }
    rpxToPx(num) {
        return Math.round(num * this.scale);
    }
    /** 批量加载图片
     *
     * @param imgs 图片链接列表
     */
    loadImgs(imgs) {
        return new Promise(async (resolve) => {
            const reqArr = [];
            imgs.map(async (src) => {
                reqArr.push(this.loadImage(src));
            });
            const resArr = await Promise.all(reqArr);
            resolve(resArr);
        });
    }
    /** 加载图片
     *
     * @param src 图片链接
     */
    loadImage(src) {
        return new Promise(async (resolve) => {
            try {
                const res = await taro_1.default.getImageInfo({
                    src,
                });
                resolve(res.path);
            }
            catch (error) {
                resolve("");
            }
        });
    }
    /** 绘制图片
     *
     * @param url 图片读取后的本地链接
     * @param x x轴起点
     * @param y y轴起点
     * @param width 图片宽度
     * @param height 图片宽度
     * @param radius 圆角
     */
    drawImage({ url, x, y, width, height, radius = 0, }) {
        this.ctx.save();
        this.clipRaduisPath({
            x,
            y,
            width,
            height,
            radius,
        });
        this.ctx.drawImage(url, this.rpxToPx(x), this.rpxToPx(y), this.rpxToPx(width), this.rpxToPx(height));
        this.ctx.restore();
    }
    /** 绘制矩形
     *
     * @param bgColor 背景颜色
     * @param x x轴起点
     * @param y y轴起点
     * @param width 宽度
     * @param height 宽度
     * @param radius 圆角
     */
    drawRect({ bgColor, x, y, width, height, radius = 0, }) {
        this.ctx.save();
        this.clipRaduisPath({
            x,
            y,
            width,
            height,
            radius,
        });
        this.ctx.fillStyle = bgColor;
        this.ctx.fill();
        this.ctx.restore();
    }
    /** 绘制路径
     *
     * @param x x轴起点
     * @param y y轴起点
     * @param width 宽度
     * @param height 宽度
     * @param radius 圆角
     */
    clipRaduisPath({ x, y, width, height, radius = 0, }) {
        const radiusObj = {
            tl: 0,
            tr: 0,
            br: 0,
            bl: 0,
        };
        if (Array.isArray(radius)) {
            radiusObj.tl = radius[0];
            radiusObj.tr = radius[1];
            radiusObj.br = radius[2];
            radiusObj.bl = radius[3];
        }
        else {
            radiusObj.tl = radius;
            radiusObj.tr = radius;
            radiusObj.br = radius;
            radiusObj.bl = radius;
        }
        this.ctx.beginPath();
        this.ctx.arc(this.rpxToPx(x + radiusObj.tl), this.rpxToPx(y + radiusObj.tl), this.rpxToPx(radiusObj.tl), (Math.PI / 180) * 180, (Math.PI / 180) * 270);
        this.ctx.lineTo(this.rpxToPx(x + radiusObj.tl), this.rpxToPx(y), this.rpxToPx(x + width - radiusObj.tr), this.rpxToPx(y));
        this.ctx.arc(this.rpxToPx(x + width - radiusObj.tr), this.rpxToPx(y + radiusObj.tr), this.rpxToPx(radiusObj.tr), (Math.PI / 180) * 270, (Math.PI / 180) * 0);
        this.ctx.lineTo(this.rpxToPx(x + width), this.rpxToPx(y + radiusObj.tr), this.rpxToPx(x + width), this.rpxToPx(y + height - radiusObj.br));
        this.ctx.arc(this.rpxToPx(x + width - radiusObj.br), this.rpxToPx(y + height - radiusObj.br), this.rpxToPx(radiusObj.br), (Math.PI / 180) * 0, (Math.PI / 180) * 90);
        this.ctx.lineTo(this.rpxToPx(x + width - radiusObj.br), this.rpxToPx(y + height), this.rpxToPx(x + radiusObj.bl), this.rpxToPx(y + height));
        this.ctx.arc(this.rpxToPx(x + radiusObj.bl), this.rpxToPx(y + height - radiusObj.bl), this.rpxToPx(radiusObj.bl), (Math.PI / 180) * 90, (Math.PI / 180) * 180);
        this.ctx.lineTo(this.rpxToPx(x), this.rpxToPx(y + height - radiusObj.bl), this.rpxToPx(x), this.rpxToPx(y + radiusObj.tl));
        this.ctx.clip();
    }
    /** 绘制文字
     *
     * @param color 字体颜色
     * @param fontSize 字体大小
     * @param fontWeight 字体粗细
     * @param lineHeight 行高
     * @param x x轴坐标
     * @param y y轴坐标
     * @param text 内容
     * @param textAlign 对齐方式
     *
     */
    initText({ color, fontSize, fontWeight = "normal", lineHeight = fontSize, x, y, text, textAlign = "left", }) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.setFillStyle(color);
        this.ctx.font = `normal ${fontWeight} ${this.rpxToPx(fontSize)}px sans-serif`;
        this.ctx.setTextBaseline("middle");
        this.ctx.setTextAlign(textAlign);
        this.ctx.fillText(text, this.rpxToPx(x), this.rpxToPx(y + lineHeight / 2));
        this.ctx.closePath();
        this.ctx.restore();
    }
    /** 绘制二维码
     *
     * @param x x轴起点
     * @param y y轴起点
     * @param width 二维码尺寸
     * @param url 链接
     *
     */
    async drawQrcode({ x, y, width, url, }) {
        await weapp_qrcode_1.default({
            x: this.rpxToPx(x),
            y: this.rpxToPx(y),
            reserve: true,
            width: this.rpxToPx(width),
            height: this.rpxToPx(width),
            ctx: this.ctx,
            text: url,
            correctLevel: 3,
        });
    }
    /** 获取格式化后的文本
     *
     * @param str 文本内容
     * @param maxByteLength 单行最大字节数
     * @param maxLine 最大行数
     */
    breakText({ str, maxByteLength, maxLine, }) {
        let bytesCount = 0;
        const textArr = [];
        let strArr = [];
        for (let i = 0; i < str.length; i++) {
            const length = this.getCodeByte(str, i);
            if (textArr.length >= maxLine) {
                while (maxByteLength - bytesCount < 3) {
                    const byte = this.getCodeByte(strArr[strArr.length - 1]);
                    bytesCount -= byte;
                    strArr.pop();
                }
                strArr.push("...");
            }
            else {
                if (bytesCount + length > maxByteLength) {
                    if (textArr.length + 1 >= maxLine) {
                        while (maxByteLength - bytesCount < 3) {
                            const byte = this.getCodeByte(strArr[strArr.length - 1]);
                            bytesCount -= byte;
                            strArr.pop();
                        }
                        strArr.push("...");
                    }
                    textArr.push(strArr.join(""));
                    bytesCount = 0;
                    strArr = [];
                    i--;
                }
                else {
                    strArr.push(str[i]);
                    bytesCount += length;
                    if (i === str.length - 1) {
                        textArr.push(strArr.join(""));
                    }
                }
            }
        }
        return textArr;
    }
    // 获取当前文字所占字节数
    getCodeByte(str, index = 0) {
        const c = str.charCodeAt(index);
        let length = 0;
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            length = 1;
        }
        else {
            length = 2;
        }
        return length;
    }
    // 完成绘制
    draw() {
        this.ctx.draw(true);
    }
}
exports.default = CanvasHelper;
