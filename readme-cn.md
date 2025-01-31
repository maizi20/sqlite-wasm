对[wasm-sqlite](https://www.npmjs.com/package/wasm-sqlite)提供的[assets.sqljs_lite.js](https://kaizhu256.github.io/node-sqljs-lite/build..beta..travis-ci.org/app/assets.sqljs_lite.js)进行了一些封装，
实现了依赖的阻塞同步加载兑现和非阻塞流式加载异步兑现
并移除了worker使所有操作都可以同步兑现

同步加载
```js
var sqlite=require('sqlite-wasm-warp').sync();
```

指定wasm文件路径的同步加载
```js
var sqlite=require('sqlite-wasm-warp').sync('./index.wasm');
```

从远程同步加载缺少魔数和版本号的dataurl格式的wasm文件
```js
var sqlite;
require('sqlite-wasm-warp').init((o,c)=>{
  var x=new XMLHttpRequest,r;
  x.open('GET','./dataurl',!1);
  x.responseType='text';
  x.send(null);
  r=x.response;
  r=(~r.lastIndexOf(';base64',128)?e=>e:atob)(r.slice(r.indexOf(',')));
  r=new Uint8Array(r.length+8).map((a,i)=>i>8&&r.charCodeAt(i-8));
  r.set([0,0x61,0x73,0x6d,1,0,0,0]);
  return c({
    instance:new WebAssembly.Instance(new WebAssembly.Module(r),o)
  });
},r=>sqlite=r,j=>{throw j});
```

异步加载也可以定义加载方式，默认使用fetch和WebAssembly.instantiateStreaming进行WASM流式编译和实例化
