import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import "./assets/main.css";

Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    room: "",
    token: "",
    tokenSent: false
  },
  mutations: {
    setToken(state, value) {
      return (state.token = value);
    },
    setSentToken(state, value) {
      return (state.tokenSent = value);
    },
    setRoom(state, value) {
      return (state.room = value);
    }
  }
});

new Vue({
  store,
  render: (h) => h(App)
}).$mount("#app");
