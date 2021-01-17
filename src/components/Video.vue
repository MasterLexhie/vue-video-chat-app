<template>
  <div class="video">
    <div class="users full-width flex flex-h-bet flex-v-center">
      <button class="add-icon no-border bg-transparent">+</button>
      <div class="user-box flex">
        <p>{{ `User (2)` }}</p>
        <img :src="require('@/assets/images/icons/person.svg')" alt />
      </div>
    </div>

    <div class="flex flex-col full-screen-height video__container">
      <div ref="remoteVideoRef" class="video__body full-width"></div>
      <div 
        ref="localVideoRef" 
        :class="{ isHalf: halfHeight }"
        class="video__body full-width"
      ></div>
    </div>
    <OptionButtons />
  </div>
</template>
<script>
import OptionButtons from "./OptionButtons";
import { connect, createLocalVideoTrack } from "twilio-video";
import { mapState } from "vuex";

export default {
  components: {
    OptionButtons,
  },
  data() {
    return {
      isHalf: false
    };
  },
  computed: {
    ...mapState(["token", "room"]),
  },
  mounted() {
    connect(this.token, {
      video: true,
      audio: true,
      name: this.room,
      // logLevel: "debug",
    })
      .then((room) => {
        // create and attach local track to div
        createLocalVideoTrack()
          .then((track) => {
            this.$refs.localVideoRef.appendChild(track.attach());
          })
          .catch((error) => console.log({ localVideoError: error.message }));

        // For RemoteParticipants that are already in the Room
        // room.participants.forEach((participant) => {
        //   participant.tracks.forEach((publication) => {
        //     if (publication.track) {
        //       const track = publication.track;
        //       this.$refs.remoteVideoRef.appendChild(track.attach());
        //       console.log("attached to remote video");
                // this.isHalf = true;
        //     }
        //   });

        //   participant.on("trackSubscribed", (track) => {
        //     console.log("track subscribed", {
        //       remote: this.$refs.remoteVideoRef,
        //     });
        //     this.$refs.remoteVideoRef.appendChild(track.attach());
              // this.isHalf = true;
        //   });
        // });

        room.once("participantConnected", (participant) => {
          console.log(
            `A remote Participant connected: ${participant.identity}`, {
              participant
            }
          );

          // Attach the Participant's Media to a <div> element.
          participant.tracks.forEach((publication) => {
            // For RemoteParticipants that join the room or that are already in the Room
            if (publication.isSubscribed) {
              const track = publication.track;
              this.$refs.remoteVideoRef.appendChild(track.attach());
              console.log("attached to remote video");
              this.isHalf = true;
            }
          });

          participant.on("trackSubscribed", (track) => {
            console.log("track subscribed", {
              remote: this.$refs.remoteVideoRef,
            });
            this.$refs.remoteVideoRef.appendChild(track.attach());
            this.isHalf = true;
          });
        });

        // room.on('participantDisconnected', participant => {
        //   console.log(`Participant disconnected: ${participant.identity}`);
        // });

        // // Log new Participants as they connect to the Room
        // room.once('participantConnected', participant => {
        //   console.log(`Participant "${participant.identity}" has connected to the Room`);
        // });

        // // Log Participants as they disconnect from the Room
        // room.once('participantDisconnected', participant => {
        //   console.log(`Participant "${participant.identity}" has disconnected from the Room`);
        // });

        // // mute local audio
        // room.localParticipant.audioTracks.forEach(publication => {
        //   publication.track.disable();
        // });

        // // mute local video
        // room.localParticipant.videoTracks.forEach(publication => {
        //   publication.track.disable();
        // });

        // // unmute local audio
        // room.localParticipant.audioTracks.forEach(publication => {
        //   publication.track.enable();
        // });

        // // unmute local video
        // room.localParticipant.videoTracks.forEach(publication => {
        //   publication.track.enable();
        // });

        // function handleTrackDisabled(track) {
        //   track.on('disabled', () => {
        //     /* Hide the associated <video> element and show an avatar image. */
        //   });
        // }

        // room.participants.forEach(participant => {
        //   participant.tracks.forEach(publication => {
        //     if (publication.isSubscribed) {
        //       handleTrackDisabled(publication.track);
        //     }
        //     publication.on('subscribed', handleTrackDisabled);
        //   });
        // });

        // function handleTrackEnabled(track) {
        //   track.on('enabled', () => {
        //     /* Hide the avatar image and show the associated <video> element. */
        //   });
        // }

        // room.participants.forEach(participant => {
        //   participant.tracks.forEach(publication => {
        //     if (publication.isSubscribed) {
        //       handleTrackEnabled(publication.track);
        //     }
        //     publication.on('subscribed', handleTrackEnabled);
        //   });
        // });

        // room.on('disconnected', room => {
        //   // Detach the local media elements
        //   room.localParticipant.tracks.forEach(publication => {
        //     const attachedElements = publication.track.detach();
        //     attachedElements.forEach(element => element.remove());
        //   });
        // });

        // // To disconnect from a Room
        // room.disconnect();
      })
      .catch((error) => {
        console.log({ connectionError: error });
      });
  },
  methods: {
    // changeVideoControls(videoOne, videoTwo) {
    //   videoOne.
    // }
  },
};
</script>
<style scoped>
.video {
  position: relative;
}

.video__body {
  height: 100vh;
}

/* .video__body > video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(-1, 1);
} */

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