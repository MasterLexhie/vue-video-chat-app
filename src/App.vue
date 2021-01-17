<template>
  <main id="app" class="full-screen-height">
    <LoginForm v-if="tokenSent === true ? hideForm : !hideForm" />
    <Video v-if="tokenSent === true ? !hideForm : hideForm" />
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
    };
  },
  computed: {
    ...mapState(["tokenSent"]),
  },
  methods: {},
};
</script>

<style>
</style>
