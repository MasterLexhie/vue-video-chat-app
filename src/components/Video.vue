<template>
  <div class="video">
    <div class="users full-width flex flex-h-bet flex-v-center">
      <button class="add-icon no-border bg-transparent">+</button>
      <div class="user-box flex">
        <p class="flex-auto">{{ `User (2)` }}</p>
        <img :src="require('@/assets/images/icons/person.svg')" alt />
      </div>
    </div>

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

.users {
  position: absolute;
  padding: 10px 1em;
}

.add-icon {
  font-size: 30px;
  color: #fff;
  font-weight: bold;
  background: transparent;
  border: none;
}

.user-box {
  background: #fff;
  border-radius: 10px;
  display: inline-block;
}

.user-box > p {
  font-weight: bold;
  color: #999;
  padding: 5px 20px;
  font-size: 14px;
}

.user-box > img {
  width: 12px;
  height: auto;
}
</style>