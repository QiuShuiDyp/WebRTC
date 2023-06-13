<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import videoPlayer from 'video.js'
import 'video.js/dist/video-js.css'
const player = ref()
onMounted(() => {
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
