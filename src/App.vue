<template>
  <main id="app">
    <h1 v-if="notMobile">Please switch to a mobile device to access VueChat</h1>
    <div v-else>
      <LoginForm v-if="tokenSent === true ? hideForm : !hideForm" />
      <Video v-if="tokenSent === true ? !hideForm : hideForm" />
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import LoginForm from "./components/LoginForm";
import Video from "./components/Video";

export default {
  name: "App",
  components: {
    LoginForm,
    Video,
  },
  data() {
    return {
      hideForm: false,
      notMobile: false,
    };
  },
  computed: {
    ...mapState(["tokenSent"]),
  },
  mounted() {
    // this.isDeviceMobile();
  },
  methods: {
    isDeviceMobile() {
      const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
      if (!isMobileDevice) {
        this.notMobile = true;
      }
    },
  },
};
</script>

<style>
</style>
