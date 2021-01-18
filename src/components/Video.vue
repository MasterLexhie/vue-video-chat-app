<template>
  <div class="videoComponent">
    <h1 v-if="support">This browser is not supported by VueChat</h1>
    <div v-else>
      <div class="video">
        <div class="users full-width flex flex-h-bet flex-v-center">
          <p v-if="hide">{{ `${remoteUser} has joined the room` }}</p>
        </div>

        <div class="flex flex-col full-screen-height video__container">
          <div ref="videoRef" class="video__body full-width"></div>
        </div>
        <OptionButtons @disconnect-video="leaveRoom()" />
      </div>
    </div>
  </div>
</template>
<script>
import OptionButtons from "./OptionButtons";
import {
  isSupported,
  connect,
  createLocalVideoTrack,
  createLocalTracks,
} from "twilio-video";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    OptionButtons,
  },
  data() {
    return {
      hide: false,
      support: false,
      remoteUser: ''
    };
  },
  computed: {
    ...mapState(["token", "room"]),
  },
  watch: {
    
  },
  mounted() {
    this.startVideoChat();
  },
  methods: {
    ...mapMutations(["setToken", "setSentToken"]),
    disconnect() {},
    startVideoChat() {
      if (!isSupported) {
        return (this.support = true);
      }

      connect(this.token, {
        name: this.room,
        video: true,
        audio: true,
        logLevel: "debug",
      }).then((room) => {
        createLocalVideoTrack({logLevel: "debug"})
          .then((track) => {
            this.$refs.videoRef.appendChild(track.attach());
          })
          .catch((error) => console.log({ localVideoError: error.message }));
        room.participants.forEach(this.participantConnected);
        room.on("participantConnected", this.participantConnected);
        room.on("participantDisconnected", this.participantDisconnected);
      });
    },
    participantConnected(participant) {
      this.remoteUser = participant.identity;
      this.hide = true;

      setTimeout(() => {
        this.hide = false;
      }, 10);

      participant.tracks.forEach((trackPublication) => {
        this.trackPublished(trackPublication, participant);
      });
      participant.on("trackPublished", this.trackPublished);
    },
    trackPublished(trackPublication) {
      const remoteParticipant = this.$refs.videoRef;

      const trackSubscribed = (track) => {
        remoteParticipant.appendChild(track.attach());
      };

      if (trackPublication.track) {
        trackSubscribed(trackPublication.track);
      }

      trackPublication.on("subscribed", trackSubscribed);
    },
    participantDisconnected(participant) {
      participant.removeAllListeners();
      this.$ref.videoRef.remove();
    },
    async leaveRoom() {
      const tracks = await createLocalTracks({ logLevel: "debug" });

      const room = await connect(this.token, {
        name: this.room,
        tracks,
      });

      room.on("disconnected", (room) => {
        // Detach the local media elements
        room.localParticipant.tracks.forEach((publication) => {
          const attachedElements = publication.track.detach();

          attachedElements.forEach((element) => element.remove());
        });
      });

      // To disconnect from a Room
      room.disconnect();
      console.log("room disconnected");
      this.setToken("");
      this.setSentToken(false);
    },
  },
};
</script>
<style scoped>
.video {
  position: relative;
}

.video__container {
  background: #222;
}

.video__body {
  width: 100%;
  height: 50%;
}

.users {
  position: absolute;
  padding: 10px 1em;
  z-index: 10;
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
  padding: 8px 9px;
}

.user-box > p {
  font-weight: bold;
  color: #999;
  font-size: 14px;
}

.user-box > img {
  width: 12px;
  height: auto;
  margin-left: 10px;
}
</style>