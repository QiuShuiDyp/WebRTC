// 获取摄像头权限
function getCameraPermission(callback) {
  var promise = navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  promise
    .then(function (mediaStream) {
      const video = document.querySelector("video");
      video.srcObject = mediaStream;
      callback(mediaStream);
      // 获取到了摄像头权限
    })
    .catch(function (error) {
      console.log(error);
      // 没有获取到摄像头权限
    });
}

// 录制视频
function recordVideo() {
  getCameraPermission(function (mediaStream) {
    const video = document.querySelector("video");
    const mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.start();
    mediaRecorder.ondataavailable = function (e) {
      console.log(e.data);
      download(URL.createObjectURL(e.data));
    };
    setTimeout(function () {
      mediaRecorder.stop();
    }, 5000);
  });
}

function stopRecordVideo() {}

function playVideo() {}

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

function download(url) {
  var oA = document.createElement("a");
  oA.download = "photo"; // 设置下载的文件名，默认是'下载'
  oA.href = url;
  document.body.appendChild(oA);
  oA.click();
  oA.remove(); // 下载之后把创建的元素删除
}
// 拍照按钮
var recordVideoBtn = document.querySelector("#recordVideoBtn");
recordVideoBtn.addEventListener("click", recordVideo);

getDevices();
