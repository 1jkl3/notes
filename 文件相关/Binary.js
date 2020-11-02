// 二进制文件处理类

// base64字符串转换为Blob对象
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(",");
  var mime = arr[0].match(/:(.*?);/)[1]; // 结果：   image/png
  return new Promise((resolve, reject) => {
    try {
      var bstr = atob(arr[1].replace(/\s/g, ""));
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      resolve(new Blob([u8arr], {
        type: mime
      }));
    } catch (err) {
      reject(err);
    }
  });
  //   return new Blob([u8arr], { type: mime }); //值，类型
}

/**
 *
 * @param img html的img标签
 * @param ext 图片格式
 * @returns {string}
 * 根据img标签内容转base64文件
 */
export function getImageBase64(img, ext) {
  var canvas = document.createElement("canvas"); //创建canvas DOM元素，并设置其宽高和图片一样
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
  var dataURL = canvas.toDataURL("image/" + ext); //返回的是一串Base64编码的URL并指定格式
  canvas = null; //释放
  return dataURL;
}

/**
 *
 * @param url 图片路径
 * @param ext 图片格式
 * @param callback 结果回调
 * 根据图片路径转base64文件
 * 跨域问题
 */
export function getUrlBase64(url, ext) {
  var canvas = document.createElement("canvas"); //创建canvas DOM元素
  canvas.height = 50; //指定画板的高度,自定义
  canvas.width = 50; //指定画板的宽度，自定义
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url + "?timeStamp=" + new Date();
  return new Promise((resolve, reject) => {
    try {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 50, 50); //参数可自定义
        var dataURL = canvas.toDataURL("image/" + ext);
        resolve(dataURL);
        canvas = null;
      };
    } catch (err) {
      reject(err);
    }
  });
}

/**
 *
 * @param {对象名称} key
 * @param {二进制文件数据} value
 */
export function binaryToFormData(key, value) {
  return new Promise((resolve, reject) => {
    try {
      var data = new FormData();
      data.append(key, value);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
/**
 *
 * @param canvas canvasDom文本
 * @param ctxt canvas.getContext("2d");创建的全局对象
 * @param url 图片路径
 * @param ext 图片格式
 * 根据图片路径转base64文件
 * 跨域问题
 */
export function loadImageFile(canvas, ctxt, url, ext) {
  var image = new Image();
  image.src = url + "?timeStamp=" + new Date();
  image.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  }).then((resolve) => {
    canvas.width = this.width;
    canvas.height = this.height;
    ctxt.clearRect(0, 0, this.width, this.height);
    ctxt.drawImage(image, 0, 0);
    resolve(canvas.toDataURL("image/" + ext));
  });
}
/**
 * 加载图片完成多张
 * @param {图片} images
 */
export function loadMultiImage(images) {
  let promiseAll = [],
    img = [],
    imgTotal = images.length;
  for (let i = 0; i < imgTotal; i++) {
    promiseAll[i] = new Promise((resolve, reject) => {
      img[i] = new Image();
      img[i].src = images[i];
      img[i].crossOrigin = "";
      // 加载完成
      img[i].onload = function () {
        resolve(img[i]);
      };
      // 报错
      img[i].onerror = function (err) {
        reject(new Error("图片加载失败"));
      };
    });
  }
  //全部加载完成
  return Promise.all(promiseAll);
}
// 下载base64文件
export function downLoadBase(file, filename) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    const base64Data = String(e.target.result);
    // console.log(base64Data);
    const a = document.createElement('a');
    a.href = base64Data;
    a.download = filename;
    a.click();
  }
}
// 切片下载
export function downLoadSlice(data, type) {
  var chunkSize = 1024 * 1024; //每片1M大小
  var totalSize = data.size;
  var chunkQuantity = Math.ceil(totalSize/chunkSize); //分片总数
  let blob = new Blob([data], {type});
  var datas = [];
  for(let i = 0;i < chunkQuantity;i++){
    let sliceBlob = blob.slice(i * chunkSize,(i + 1) * chunkSize,blob.type);
    datas.push(sliceBlob);
  }
  let dl = document.createElement('a');
  datas.forEach((item,index)=>{
    dl.download = `down(${index}).${type}`;
    dl.href = URL.createObjectURL(item);
    dl.click();
    URL.revokeObjectURL(dl.href)
  })
};