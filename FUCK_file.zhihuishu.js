// ==UserScript==
// @name         FUCK_file.zhihuishu
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Extract and open link from iframe's src attribute with WOPISrc on target page every 1 second and stop when succeed
// @author       Lmoe
// @run-at       document-end
// @match        https://hike.zhihuishu.com/*
// @downloadURL  
// @updateURL    
// @grant        none
// ==/UserScript==

(function () {
    let isLinkOpened = false; // 用于标记链接是否已经成功打开

    function openLinkFromIframe() {
        if (isLinkOpened) {
            return; // 如果链接已打开，直接返回，不再执行后续操作
        }
        // 获取页面中的iframe元素
        const iframeElement = document.querySelector('iframe');
        if (iframeElement) {
            // 获取iframe的src属性值
            const src = iframeElement.src;
            // 查找WOPISrc=在src字符串中的位置
            const startIndex = src.indexOf('WOPISrc=');
            if (startIndex!== -1) {
                // 提取从WOPISrc=之后的链接部分
                const link = src.slice(startIndex + 'WOPISrc='.length);
                // 去除可能存在的多余字符（比如如果后面还有其他参数等情况，这里简单处理下截取到第一个&或者到字符串末尾）
                const finalLink = link.split('&')[0];
                try {
                    // 在新窗口中打开链接
                    window.open(finalLink);
                    isLinkOpened = true; // 标记链接已成功打开
                    clearInterval(intervalId); // 清除定时器，停止脚本继续运行
                } catch (error) {
                    // 捕获可能出现的异常，比如浏览器阻止弹出窗口等情况
                    console.log("打开链接出现错误: ", error);
                }
            }
        }
    }

    const intervalId = setInterval(openLinkFromIframe, 1000);
})();
