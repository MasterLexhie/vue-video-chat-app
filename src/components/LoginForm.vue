<template>
  <div class="form-container">
    <form @submit="onSubmit">
      <img
        :src="require('@/assets/images/logo.png')"
        width="150"
        height="130"
        alt="VueChat"
        class="logo"
      />
      <label for="name" class="form__input">
        <div class="form__input-item">
          <input
            id="name"
            v-model="name"
            type="text"
            name="name"
            placeholder="Please Enter Name"
            required
          />
        </div>
      </label>
      <label for="room" class="form__input">
        <div class="form__input-item">
          <input
            id="room"
            v-model="room"
            type="text"
            name="room"
            placeholder="Please Enter Room Name"
            required
          />
        </div>
      </label>
      <div class="flex flex-v-center button__container">
        <button class="btn-login no-border full-width">
          Enter VueChat Room
        </button>
        <div v-if="loader" class="loader"></div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      room: "",
      loader: false,
    };
  },
  methods: {
    ...mapMutations(["setToken", "setSentToken"]),
    async onSubmit(e) {
      this.loader = true;
      e.preventDefault();
      const result = await axios({
        method: "POST",
        url: "https://straw-quoll-8562.twil.io/create-token",
        data: {
          identity: this.name,
          room: this.room,
        },
      });

      const jwt = result.data;
      this.setToken(jwt);

      this.loader = false;

      this.setSentToken(true);
    },
  },
};
</script>
<style scoped>
.logo {
  width: 150px;
  height: 130px;
  object-fit: contain;
  border: 1px solid;
  margin: 0 auto 2rem;
}

.form-container {
  height: 100vh;
  display: flex;
  background: #f3f3f3;
  justify-content: center;
  padding: 3rem 2rem;
}

.form-container > form {
  padding: 3rem 2rem;
  max-width: 400px;
  width: 100%;
  background: #fff;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(2.5px);
  border-radius: 10px;
}

.form__input-item {
  margin: 0 0 2rem;
}

.form__input-item > input {
  width: 100%;
  height: 50px;
  font-size: 14px;
  padding: 5px;
  line-height: 1.2;
  outline: none;
  border: none;
  border-bottom: 1.5px solid #3333338f;
  background: transparent;
}

::placeholder {
  font-family: "Inter", sans-serif;
}

.button__container {
  position: relative;
}

.loader {
  position: absolute;
  left: 4%;
}

.btn-login {
  padding: 15px 1rem;
  color: #fff;
  margin: 1rem 0;
  font-size: 15px;
  border-radius: 0 10px;
  font-weight: 600;
  background: linear-gradient(90deg, #00d2ff 0%, #3a47d591 100%);
}

@media (min-width: 360px) {
  .logo {
    margin: 0 auto 3rem;
  }

  .form__input-item > input {
    font-size: 16px;
  }
}
</style>