<template>
  <main id="app">
    <!-- <LoginForm v-if="tokenSent === true ? hideForm : !hideForm" /> -->
    <LoginForm />
    <!-- <Video /> -->
    <!-- <Video v-if="tokenSent === true ? !hideForm : hideForm" /> -->
  </main>
</template>

<script>
import { mapState } from "vuex";
import LoginForm from "./components/LoginForm";
// import Video from "./components/Video";

export default {
  name: "App",
  title() {
    return "VueChat";
  },
  components: {
    LoginForm,
    // Video,
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
