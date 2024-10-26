// declaraction of document.ready() function.
(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () {
        for (var i = 0; i < fn.length; i++) fn[i]();
    };
    var d = document;
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
                try {
                    d.documentElement.doScroll('left');
                    run();
                } catch (err) {
                    setTimeout(arguments.callee, 0);
                }
            })();
        else if (wk)
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0);
    };
})();


document.ready(
    // toggleTheme function.
    // this script shouldn't be changed.
    () => {
        var _Blog = window._Blog || {};
        const currentTheme = window.localStorage && window.localStorage.getItem('theme');
        const isDark = currentTheme === 'dark';
        const pagebody = document.getElementsByTagName('body')[0]
        if (isDark) {
            document.getElementById("switch_default").checked = true;
            // mobile
            document.getElementById("mobile-toggle-theme").innerText = "· Dark"
        } else {
            document.getElementById("switch_default").checked = false;
            // mobile
            document.getElementById("mobile-toggle-theme").innerText = "· Light"
        }
        _Blog.toggleTheme = function () {
            if (isDark) {
                pagebody.classList.add('dark-theme');
                // mobile
                document.getElementById("mobile-toggle-theme").innerText = "· Dark"
            } else {
                pagebody.classList.remove('dark-theme');
                // mobile
                document.getElementById("mobile-toggle-theme").innerText = "· Light"
            }
            document.getElementsByClassName('toggleBtn')[0].addEventListener('click', () => {
                if (pagebody.classList.contains('dark-theme')) {
                    pagebody.classList.remove('dark-theme');
                } else {
                    pagebody.classList.add('dark-theme');
                }
                window.localStorage &&
                window.localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light',)
            })
            // moblie
            document.getElementById('mobile-toggle-theme').addEventListener('click', () => {
                if (pagebody.classList.contains('dark-theme')) {
                    pagebody.classList.remove('dark-theme');
                    // mobile
                    document.getElementById("mobile-toggle-theme").innerText = "· Light"

                } else {
                    pagebody.classList.add('dark-theme');
                    // mobile
                    document.getElementById("mobile-toggle-theme").innerText = "· Dark"
                }
                window.localStorage &&
                window.localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light',)
            })
        };
        _Blog.toggleTheme();
        // ready function.

        // 分享相关
        const metaTag = document.querySelector('meta[name="description"]');  
        let description = metaTag ? metaTag.getAttribute('content') : '';
        // QQ空间文字太长会出现 undefined
        description = description.length > 110 ? (description.substring(0, 110) + '...') : description;
        // 参考：https://github.com/overtrue/share.js
        const imgs = document.querySelectorAll('#main img');
        let firstImgSrc = null;
        if (imgs.length > 0) {
            firstImgSrc = imgs[0].src;
        }
        socialShare('#social-share', {
            description         : description, // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
            image               : firstImgSrc, // 图片, 默认取网页中第一个img标签
            sites               : ['weibo', 'qq', 'wechat', 'douban', 'qzone'], // 启用的站点
            wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
            wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
        });
    }
);
