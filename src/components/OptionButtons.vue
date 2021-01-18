<template>
  <div class="flex flex-h-around full-width btn-container">
    <button
      @click="disconnect()"
      class="flex flex-h-center flex-v-center no-border bg-transparent"
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d)">
          <rect
            x="4.00002"
            y="2"
            width="48"
            height="48"
            rx="16"
            fill="#F74D31"
          />
        </g>
        <path
          d="M35.6545 29.495L31.4627 27.6988C31.3255 27.6393 31.1736 27.6223 31.0266 27.6498C30.8796 27.6773 30.7441 27.7482 30.6377 27.8533L28.8872 29.5783L28.2437 28.9348L25.9787 31.2028C28.4549 33.0133 31.4029 34.0673 34.4657 34.2373C34.6359 34.2427 34.8029 34.19 34.9392 34.0879C35.0755 33.9858 35.173 33.8404 35.2157 33.6755L36.0872 30.3755C36.1328 30.2012 36.1142 30.0164 36.0348 29.8547C35.9553 29.693 35.8203 29.5653 35.6545 29.495Z"
          fill="white"
        />
        <path
          d="M36.0302 17.9698C35.8896 17.8292 35.6989 17.7502 35.5 17.7502C35.3011 17.7502 35.1104 17.8292 34.9697 17.9698L26.125 26.8138L24.4217 25.109L26.1467 23.3585C26.2511 23.2524 26.3215 23.1176 26.349 22.9714C26.3765 22.8252 26.3599 22.674 26.3012 22.5373L24.505 18.3455C24.4341 18.18 24.3061 18.0456 24.1443 17.9667C23.9825 17.8878 23.7978 17.8697 23.6237 17.9158L20.3237 18.7873C20.1589 18.8299 20.0134 18.9274 19.9113 19.0637C19.8092 19.2 19.7566 19.367 19.762 19.5373C19.9618 23.1143 21.3653 26.5187 23.7445 29.1973L19.9697 32.9698C19.8981 33.0389 19.841 33.1217 19.8017 33.2132C19.7624 33.3047 19.7417 33.4031 19.7408 33.5027C19.7399 33.6023 19.7589 33.701 19.7966 33.7932C19.8343 33.8854 19.89 33.9691 19.9604 34.0396C20.0309 34.11 20.1146 34.1657 20.2068 34.2034C20.2989 34.2411 20.3977 34.2601 20.4973 34.2592C20.5969 34.2583 20.6953 34.2376 20.7868 34.1983C20.8783 34.159 20.9611 34.1019 21.0302 34.0303L36.0302 19.0303C36.1708 18.8896 36.2498 18.6989 36.2498 18.5C36.2498 18.3011 36.1708 18.1104 36.0302 17.9698Z"
          fill="white"
        />
        <defs>
          <filter
            id="filter0_d"
            x="1.52588e-05"
            y="0"
            width="56"
            height="56"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    disconnect() {
      this.$emit("disconnect-video");
    },
  },
};
</script>
<style scoped>
.btn-container {
  position: absolute;
  bottom: 20px;
}
</style>