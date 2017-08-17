window.onload = function () {
  var img = document.getElementById("imgSource"),
    canvas = document.getElementById('canvas'),
    width = img.width,
    height = img.height;

  // console.log(width);

  canvas.width = width;
  canvas.height = height;

  var context = canvas.getContext("2d");
  context.drawImage(img, 0, 0);

  var canvasData = context.getImageData(0, 0, canvas.width, canvas.height);

  //console.log(canvasData);

  // 开始
  var startTime = +new Date();

  var newImageData = LowPolyGenerator(canvasData)

  context.putImageData(newImageData, 0, 0);

  var endTime = +new Date();
  console.log(" 一共经历时间：" + (endTime - startTime) + "ms");
}