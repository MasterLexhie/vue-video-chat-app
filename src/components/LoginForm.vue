<template>
  <div>
    <form @submit="onSubmit">
      <label for="name" class="form__input">
        Name:
        <div class="form__input-item">
          <input id="name" v-model="name" type="text" name="name" />
        </div>
      </label>
      <button class="btn">Enter VideoChat Room</button>
      <!-- add loader -->
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
    };
  },
  methods: {
    ...mapMutations(["setToken", "setSentToken"]),
    async onSubmit(e) {
      e.preventDefault();

      const result = await axios({
        method: "POST",
        url: "https://straw-quoll-8562.twil.io/create-token",
        data: {
          identity: this.name,
        },
      });

      const jwt = result.data;
      this.setToken(jwt);
      this.setSentToken(true);

      // name of other user and room number in state
      // token saved in state and picked in video component
    },
  },
};
</script>