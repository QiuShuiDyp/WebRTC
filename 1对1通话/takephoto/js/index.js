// 获取摄像头权限
function getCameraPermission() {
  var promise = navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  promise
    .then(function (MediaStream) {
      const video = document.querySelector("video");
      video.srcObject = MediaStream;
      // 获取到了摄像头权限
    })
    .catch(function (error) {
      console.log(error);
      // 没有获取到摄像头权限
    });
}

// 获取音视频设备列表
function getDevices() {
  navigator.mediaDevices.enumerateDevices().then(function (deviceInfos) {
    deviceInfos.forEach(function (deviceInfo) {
      console.log(
        `设备种类：` +
          deviceInfo.kind +
          `,设备名称：` +
          deviceInfo.label +
          ",设别Id" +
          deviceInfo.deviceId
      );
    });
  });
}
// 浏览器拍照
function takePhoto() {
  var video = document.querySelector("video");
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, 320, 180);
  // download(canvas.toDataURL("image/png"));
}

function download(url) {
  var oA = document.createElement("a");
  oA.download = "photo"; // 设置下载的文件名，默认是'下载'
  oA.href = url;
  document.body.appendChild(oA);
  oA.click();
  oA.remove(); // 下载之后把创建的元素删除
}
// 拍照按钮
var takePhotoBtn = document.querySelector("#takePhotoBtn");
takePhotoBtn.addEventListener("click", takePhoto);

getDevices();
getCameraPermission();
