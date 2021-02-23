## Javascript client (nodejs/browser) for [imgproxy](https://imgproxy.net/).

    import imgproxyjs from 'imgproxyjs';
    const { ImgProxy } = imgproxyjs;
    const instance = new ImgProxy({url: 'https://imgproxy.test.com'}, {size:{width:40, height: 40, enlarge:true, extend:false}, background: '#ffffff'});

    const finalImg = instance.get("http://images.com/logo.png");
