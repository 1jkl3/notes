/*
 * @Author: duhu
 * @Date: 2021-01-29 09:44:32
 * @LastEditTime: 2021-01-29 10:26:35
 * @LastEditors: Please set LastEditors
 * @Description: 绘制自定义窗口
 * @FilePath: \vue-js\src\module\useOverlay.js
 */
import { CustomOverlay } from "@/plugin/ol-plugin";
import {} from './index';

export const useOverlay = (option) => {
    new CustomOverlay(option)
}