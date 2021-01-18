<template>
  <div class="videoComponent">
    <h1 v-if="noSupport">
      This browser is not supported by VueChat. 
      Switch to Chrome, Firefox on Android and Safari on iOS for best experience
    </h1>
    <div v-else>
      <div class="video">
        <!-- <div class="users full-width flex flex-h-bet flex-v-center">
          <p v-if="hide">{{ `${remoteUser} has joined the room` }}</p>
        </div> -->

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
import { isSupported, connect, createLocalTracks } from "twilio-video";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    OptionButtons,
  },
  data() {
    return {
      hide: false,
      noSupport: false,
      remoteUser: "",
      activeRoom: ''
    };
  },
  computed: {
    ...mapState(["token", "room"]),
  },
  mounted() {
    this.startVideoChat();
  },
  methods: {
    ...mapMutations(["setToken", "setSentToken"]),
    startVideoChat() {
      if (!isSupported) {
        return (this.noSupport = true);
      }

      // connect to Video
      connect(this.token, {
        name: this.room,
        video: true,
        audio: true,
      }).then(room => {
        const mediaContainer = this.$refs.videoRef;
        this.activeRoom = room;

        // this.getLocalTrack(mediaContainer);

        createLocalTracks()
        .then( (Tracks) => {
          Tracks.forEach( (track) => {
            mediaContainer.appendChild(track.attach());
          });
        }).catch((error) => console.log({ localTrackError: error.message }));

        const localParticipant = room.localParticipant;
        console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);


        room.participants.forEach((participant) => {
          console.log(`A remote Participant connected: ${participant}`);

          const div = document.createElement('div');
          div.id = participant.sid;
          mediaContainer.appendChild(div);

          participant.tracks.forEach((publication) => {
            // check if participant accepted video and audio access
            if (publication.track) {
              const track = publication.track;
              div.appendChild(track.attach());
              console.log("attached to remote video");
            }
          });
          participant.on("trackSubscribed", (track) => {
            div.appendChild(track.attach());
          });
        });

        room.on("participantConnected", (participant) => {
          console.log(`A remote Participant connected: ${participant.identity}`);
          
          const div = document.createElement('div');
          div.id = participant.sid;
          mediaContainer.appendChild(div);

          participant.tracks.forEach((publication) => {
            const track = publication.track;

            // check if participant accepted video and audio access
            if (publication.isSubscribed) {
              div.appendChild(track.attach());
              console.log("attached to remote video");
            }
          });
          participant.on("trackSubscribed", (track) => {
            div.appendChild(track.attach());
          });
        });
        
        console.log({
          tracks: room.localParticipant.tracks,
          videoTracks: room.localParticipant.videoTracks,
          participants: room.localParticipant
        })

        room.on("disconnected", (room) => {
        // Detach the local media elements
          room.localParticipant.tracks.forEach((publication) => {
            publication.track.stop(); // stop all tracks
            const attachedElements = publication.track.detach();
            attachedElements.forEach((element) => element.remove());
          });

          this.activeRoom = null
        });
        // room.on('participantDisconnected', participant => {
        //   console.log(`Participant disconnected: ${participant.identity}`);

          
        // });

        // room.participants.forEach(this.participantConnected);
        // room.on("participantConnected", this.participantConnected);
        // room.on("participantDisconnected", this.participantDisconnected);
      });
    },
    // getLocalTrack(localParticipant) {
      
    // },
    // participantConnected(participant) {
    //   this.remoteUser = participant.identity;
    //   // this.hide = true;

    //   // setTimeout(() => {
    //   //   this.hide = false;
    //   // }, 10);

    //   participant.tracks.forEach((trackPublication) => {
    //     this.trackPublished(trackPublication, participant);
    //   });
    //   participant.on("trackPublished", this.trackPublished);
    // },
    // trackPublished(trackPublication) {
    //   const remoteParticipant = this.$refs.videoRef;

    //   const trackSubscribed = (track) => {
    //     remoteParticipant.appendChild(track.attach());
    //   };

    //   if (trackPublication.track) {
    //     trackSubscribed(trackPublication.track);
    //   }

    //   trackPublication.on("subscribed", trackSubscribed);
    // },
    // participantDisconnected(participant) {
    //   participant.removeAllListeners();
    //   this.$ref.videoRef.remove();
    // },
    leaveRoom() {
      // const tracks = await createLocalTracks({ logLevel: "debug" });

      // const room = await connect(this.token, {
      //   name: this.room,
      //   tracks,
      // });

      // room.on("disconnected", (room) => {
      //   // Detach the local media elements
      //   room.localParticipant.tracks.forEach((publication) => {
      //     const attachedElements = publication.track.detach();

      //     attachedElements.forEach((element) => element.remove());
      //   });
      // });

      // To disconnect from a Room
      this.activeRoom.disconnect();
      console.log("room disconnected");
      // this.setToken("");
      // this.setSentToken(false);
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