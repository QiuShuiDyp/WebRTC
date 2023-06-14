<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as RongIMLib from '@rongcloud/imlib-next'
import videoPlayer from 'video.js'
import 'video.js/dist/video-js.css'
const Events = RongIMLib.Events

const player = ref()
const imConnectStatus = ref < boolean > false
// 初始化拉流
function initVideoStream() {
  const video = document.getElementById('videoElement')
  const options = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: '',
        type: 'application/x-mpegURL',
      },
    ],
  }
  player.value = videoPlayer('videoElement', options)
}
function initRongClond() {
  RongIMLib.init({ appKey: 'xxx' })

  RongIMLib.addEventListener(Events.CONNECTING, () => {
    console.log('正在链接服务器')
  })

  RongIMLib.addEventListener(Events.CONNECTED, () => {
    console.log('已经链接到服务器')
  })

  RongIMLib.addEventListener(Events.MESSAGES, (evt) => {
    console.log(evt.messages)
  })
  RongIMLib.connect('<Your-Token>').then((res) => {
    if (res.code === RongIMLib.ErrorCode.SUCCESS) {
      imConnectStatus.value = true
      console.log('链接成功, 链接用户 id 为: ', res.data.userId)
    } else {
      imConnectStatus.value = false
      console.warn('链接失败, code:', res.code)
    }
  })
}
onMounted(() => {
  initVideoStream()
  initRongClond()
})
onUnmounted(() => {
  player.dispose()
})
</script>

<template>
  <div class="wrap">
    <video
      id="videoElement"
      class="video"
      data-setup="{}"
      preload="auto"
      controls
    ></video>
  </div>
</template>

<style scoped>
.video {
  width: 1280px;
  height: 720px;
}
.wrap {
  background-color: white;
  height: 100%;
  width: 100%;
}
</style>
