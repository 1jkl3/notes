/*
 * @Author: your name
 * @Date: 2021-01-29 09:44:32
 * @LastEditTime: 2021-01-29 10:26:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\module\useOverlay.js
 */
import { CustomOverlay } from "@/plugin/ol-plugin";
import {} from './index';

export const useOverlay = (option) => {
    new CustomOverlay(option)
}