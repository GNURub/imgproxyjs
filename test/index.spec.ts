const ImgProxy = require('../').ImgProxy;

const base = 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikipedia_logo_593.jpg';

test("Without options", () => {
    const instance = new ImgProxy({url: 'https://images.test.com'});
    const expected = `https://images.test.com/insecure/${ImgProxy.urlSafeBase64(base)}`
    expect(instance.get(base)).toEqual(expected);
});

test("With options", () => {
    const instance = new ImgProxy({url: 'https://images.test.com'}, {size:{width:40, height: 40, enlarge:true, extend:false}, background: 'ffffff'});
    const expected = `https://images.test.com/insecure/size:40:40:true:false/bg:ffffff/${ImgProxy.urlSafeBase64(base)}`
    expect(instance.get(base)).toEqual(expected);
});


test("With methods", () => {
    const instance = new ImgProxy({url: 'https://images.test.com'});
    instance
        .size({width:40, height: 40, enlarge:true, extend:false})
        .background('ffffff');
    const expected = `https://images.test.com/insecure/size:40:40:true:false/bg:ffffff/${ImgProxy.urlSafeBase64(base)}`
    expect(instance.get(base)).toEqual(expected);
});

test("With methods reset option", () => {
    const instance = new ImgProxy({url: 'https://images.test.com'});
    instance
        .size({width:40, height: 40, enlarge:true, extend:false})
        .background('#ffffff')
        .resetOption('size');
    const expected = `https://images.test.com/insecure/bg:ffffff/${ImgProxy.urlSafeBase64(base)}`
    expect(instance.get(base)).toEqual(expected);
});