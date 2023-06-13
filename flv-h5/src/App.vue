<script setup>
import { onMounted } from 'vue'
import flvjs from 'flv.js/dist/flv'
onMounted(() => {
  if (flvjs.isSupported()) {
    const videoElement = document.getElementById('videoElement')
    const flvPlayer = flvjs.createPlayer({
      type: 'flv',
      url: '',
    })
    flvPlayer.attachMediaElement(videoElement)
    flvPlayer.load()
    flvPlayer.play()
  }
})
</script>

<template>
  <div class="wrap">
    <video id="videoElement" class="video" controls muted></video>
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
