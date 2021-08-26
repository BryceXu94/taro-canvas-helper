import { CanvasContext } from '@tarojs/taro';
interface IProps {
    ctx: CanvasContext;
}
declare class CanvasHelper {
    scale: number;
    ctx: any;
    constructor(props: IProps);
    private init;
    private rpxToPx;
    /** 批量加载图片
     *
     * @param imgs 图片链接列表
     */
    loadImgs(imgs: string[]): Promise<{
        status: 1 | 0;
        url: string;
        width: number;
        height: number;
    }[]>;
    /** 加载图片
     *
     * @param src 图片链接
     */
    loadImage(src: string): Promise<{
        status: 1 | 0;
        url: string;
        width: number;
        height: number;
    }>;
    /** 绘制图片
     *
     * @param url 图片链接
     * @param x x轴起点
     * @param y y轴起点
     * @param width 图片宽度
     * @param height 图片宽度
     * @param radius 圆角
     * @param hMode 水平方向对齐方式
     * @param vMode 垂直方向对齐方式
     */
    drawImage({ url, x, y, width, height, radius, hMode, vMode, }: {
        url: string;
        x: number;
        y: number;
        width: number;
        height: number;
        radius?: number | number[];
        hMode?: 'center' | 'left' | 'right';
        vMode?: 'center' | 'top' | 'bottom';
    }): Promise<void>;
    /** 绘制矩形
     *
     * @param bgColor 背景颜色
     * @param x x轴起点
     * @param y y轴起点
     * @param width 宽度
     * @param height 宽度
     * @param radius 圆角
     */
    drawRect({ bgColor, x, y, width, height, radius, }: {
        bgColor: string;
        x: number;
        y: number;
        width: number;
        height: number;
        radius?: number | number[];
    }): void;
    /** 绘制路径
     *
     * @param x x轴起点
     * @param y y轴起点
     * @param width 宽度
     * @param height 宽度
     * @param radius 圆角
     */
    clipRaduisPath({ x, y, width, height, radius, }: {
        x: number;
        y: number;
        width: number;
        height: number;
        radius?: number | number[];
    }): void;
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
    initText({ color, fontSize, fontWeight, lineHeight, x, y, text, textAlign, textDecoration, }: {
        color: string;
        fontSize: number;
        lineHeight?: number;
        fontWeight?: 'normal' | 'bold';
        textAlign?: 'left' | 'center' | 'right';
        text: string;
        x: number;
        y: number;
        textDecoration?: 'line-through' | 'none';
    }): void;
    /** 绘制二维码
     *
     * @param x x轴起点
     * @param y y轴起点
     * @param width 二维码尺寸
     * @param url 链接
     *
     */
    drawQrcode({ x, y, width, url, }: {
        x: number;
        y: number;
        width: number;
        url: string;
    }): Promise<void>;
    /** 获取格式化后的文本
     *
     * @param str 文本内容
     * @param maxByteLength 单行最大字节数
     * @param maxLine 最大行数
     */
    breakText({ str, maxByteLength, maxLine, }: {
        str: string;
        maxByteLength: number;
        maxLine: number;
    }): string[];
    getCodeByte(str: string, index?: number): number;
    draw(): void;
}
export default CanvasHelper;
