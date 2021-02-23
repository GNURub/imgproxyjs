[![Build Status](https://travis-ci.com/GNURub/imgproxyjs.svg?branch=develop)](https://travis-ci.com/GNURub/imgproxyjs)
![npm](https://img.shields.io/npm/dm/imgproxyjs)
![npm](https://img.shields.io/npm/v/imgproxyjs)
![npm bundle size](https://img.shields.io/bundlephobia/min/imgproxyjs)

## Javascript client (nodejs/browser) for [imgproxy](https://imgproxy.net/).

    import imgproxyjs from 'imgproxyjs';
    const { ImgProxy } = imgproxyjs;
    const instance = new ImgProxy({url: 'https://imgproxy.test.com'}, {size:{width:40, height: 40, enlarge:true, extend:false}, background: '#ffffff'});

    const finalImg = instance.get("http://images.com/logo.png");
