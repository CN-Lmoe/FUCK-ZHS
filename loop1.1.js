// ==UserScript==
// @name         智慧树循环pdf
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically tries to open the PDF link in a new window in a loop until successful, with 1 second interval between each try.
// @author       Lmoe
// @run-at       document-end
// @match        https://hike.zhihuishu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let isLinkOpened = false;
    function tryOpenLink() {
        // 获取指定的iframe元素
        const iframe = document.querySelector('.doc-box iframe');
        if (iframe) {
            const src = iframe.src;
            const startIndex = src.indexOf('WOPISrc=') + 'WOPISrc='.length;
            const endIndex = src.indexOf('.pdf') + '.pdf'.length;
            const link = src.substring(startIndex, endIndex);
            try {
                // 在新窗口中打开提取到的链接
                window.open(link, '_blank');
                isLinkOpened = true;
            } catch (error) {
                // 如果打开链接出现错误，比如可能遇到浏览器限制等情况，继续下一次循环尝试
                console.log('打开链接失败，正在重试...', error);
            }
        } else {
            console.log('未找到指定的iframe元素，正在重试...');
        }
        if (!isLinkOpened) {
            // 如果链接还没成功打开，设置1秒后再次执行tryOpenLink函数进行下一次尝试
            setTimeout(tryOpenLink, 1000);
        }
    }
    tryOpenLink();
})();
