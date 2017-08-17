import { cvtColorToGray, gaussianBlur, sobel, anchor, threshold } from './util'

/**
 *
 * lowPoly风格图片生成器
 * 
 * 接受一个类canvas ImageData对象，需要包含以下属性
 * {data:Array|Uint8ClampedArray,width:Number,height:Number}
 * 返回一个能被canvas ImageData对象
 * 
 * @param {Object} imageData
 * @return {Object} 
 * 
 */


function LowPolyGenerator(imageData) {

  // 获取宽高
  var width = imageData.width, height = imageData.height
  // 获取图像数组 {Uint8ClampedArray|Array}
  var imageArray = imageData.data

  // 将图像转为灰度图
  cvtColorToGray(imageArray)

  // 高斯模糊
  gaussianBlur(imageArray,width, height,2,1)

  // 求图像梯度和边缘方向矩阵
  var sobelResult = sobel(imageArray, width, height)

  //阈值处理
  threshold(sobelResult.gradientMap, 30, 140)

  var anchorResult = anchor(sobelResult.gradientMap, sobelResult.directionMap, width, height, 26)

  return toImageData(anchorResult,width,height)
}


function toImageData(data, width, height) {

  if (typeof ImageData === 'function' && Object.prototype.toString.call(data) === '[object Uint16Array]') {
    return new ImageData(data, width, height);
  } else {
    if (typeof window === 'object' && typeof window.document === 'object') {
      var canvas = document.createElement('canvas');

      if (typeof canvas.getContext === 'function') {
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(width, height);
        imageData.data.set(data);
        return imageData;
      } else {
        return new this.fakeImageData(data, width, height);
      }
    } else {
      return new this.fakeImageData(data, width, height);
    }
  }
}

function fakeImageData(data, width, height) {
  return {
    width: width,
    height: height,
    data: data
  }
}


window.LowPolyGenerator = LowPolyGenerator

