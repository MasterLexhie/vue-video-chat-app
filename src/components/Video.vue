<template>
  <div class="video">
    <div class="flex flex-col full-screen-height video__container">
      <div
        v-for="item in video_list"
        :key="item.id"
        :id="item.idName"
        :ref="item.ref"
        class="video__body full-width"
      >
        <img :src="require(`@/assets/${item.img}`)" alt="" />
      </div>
    </div>
    <OptionButtons />
    <!-- <div id="localVideo" ref="localVideoRef" class="video-container"></div>
    <div id="remoteVideo" ref="remoteVideoRef" class="video-container"></div> -->
  </div>
</template>
<script>
import OptionButtons from "./OptionButtons";

export default {
  components: {
    OptionButtons,
  },
  data() {
    return {
      video_list: [
        {
          id: 1,
          ref: "remoteVideoRef",
          idName: "remoteVideo",
          img: "images/image1.jpg",
        },
        {
          id: 2,
          ref: "localVideoRef",
          idName: "localVideo",
          img: "images/image2.jpg",
        },
      ],
    };
  },
};
</script>
<style scoped>
.video {
  position: relative;
}

.video__body {
  height: 50%;
}

.video__body > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>