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
  // mounted() {
  //   connect(this.token, {
  //     video: true,
  //     audio: true,
  //     name: this.room, //change to room
  //     // logLevel: "debug",
  //   })
  //     .then((room) => {
  //       // create and attach local track to div
  //       createLocalVideoTrack()
  //         .then((track) => {
  //           this.$refs.localVideoRef.appendChild(track.attach());
  //         })
  //         .catch((error) => console.log({ localVideoError: error.message }));

  //       // For RemoteParticipants that are already in the Room
  //       room.participants.forEach((participant) => {
  //         participant.tracks.forEach((publication) => {
  //           if (publication.track) {
  //             const track = publication.track;
  //             this.$refs.remoteVideoRef.appendChild(track.attach());
  //           }
  //         });

  //         participant.on("trackSubscribed", (track) => {
  //           this.$refs.remoteVideoRef.appendChild(track.attach());
  //         });
  //       });

  //       room.on("participantConnected", (participant) => {
  //         // Attach the Participant's Media to a <div> element.
  //         participant.tracks.forEach((publication) => {
  //           // For RemoteParticipants that join the room or that are already in the Room
  //           if (publication.isSubscribed) {
  //             const track = publication.track;
  //             this.$refs.remoteVideoRef.appendChild(track.attach());
  //             console.log("attached to remote video");
  //           }
  //         });

  //         participant.on("trackSubscribed", (track) => {
  //           this.$refs.remoteVideoRef.appendChild(track.attach());
  //         });
  //       });

  //       // room.on('participantDisconnected', participant => {
  //       //   console.log(`Participant disconnected: ${participant.identity}`);
  //       // });

  //       // // Log new Participants as they connect to the Room
  //       // room.once('participantConnected', participant => {
  //       //   console.log(`Participant "${participant.identity}" has connected to the Room`);
  //       // });

  //       // // Log Participants as they disconnect from the Room
  //       // room.once('participantDisconnected', participant => {
  //       //   console.log(`Participant "${participant.identity}" has disconnected from the Room`);
  //       // });

  //       // // mute local audio
  //       // room.localParticipant.audioTracks.forEach(publication => {
  //       //   publication.track.disable();
  //       // });

  //       // // mute local video
  //       // room.localParticipant.videoTracks.forEach(publication => {
  //       //   publication.track.disable();
  //       // });

  //       // // unmute local audio
  //       // room.localParticipant.audioTracks.forEach(publication => {
  //       //   publication.track.enable();
  //       // });

  //       // // unmute local video
  //       // room.localParticipant.videoTracks.forEach(publication => {
  //       //   publication.track.enable();
  //       // });

  //       // function handleTrackDisabled(track) {
  //       //   track.on('disabled', () => {
  //       //     /* Hide the associated <video> element and show an avatar image. */
  //       //   });
  //       // }

  //       // room.participants.forEach(participant => {
  //       //   participant.tracks.forEach(publication => {
  //       //     if (publication.isSubscribed) {
  //       //       handleTrackDisabled(publication.track);
  //       //     }
  //       //     publication.on('subscribed', handleTrackDisabled);
  //       //   });
  //       // });

  //       // function handleTrackEnabled(track) {
  //       //   track.on('enabled', () => {
  //       //     /* Hide the avatar image and show the associated <video> element. */
  //       //   });
  //       // }

  //       // room.participants.forEach(participant => {
  //       //   participant.tracks.forEach(publication => {
  //       //     if (publication.isSubscribed) {
  //       //       handleTrackEnabled(publication.track);
  //       //     }
  //       //     publication.on('subscribed', handleTrackEnabled);
  //       //   });
  //       // });

  //       // room.on('disconnected', room => {
  //       //   // Detach the local media elements
  //       //   room.localParticipant.tracks.forEach(publication => {
  //       //     const attachedElements = publication.track.detach();
  //       //     attachedElements.forEach(element => element.remove());
  //       //   });
  //       // });

  //       // // To disconnect from a Room
  //       // room.disconnect();
  //     })
  //     .catch((error) => {
  //       console.log({ connectionError: error });
  //     });
  // },
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
        createLocalVideoTrack()
          .then((track) => {
            this.$refs.videoRef.appendChild(track.attach());
          })
          .catch((error) => console.log({ localVideoError: error.message }));
        room.participants.forEach(this.participantConnected);
        room.on("participantConnected", this.participantConnected);

        room.on("participantDisconnected", this.participantDisconnected);

        // window.addEventListener("beforeunload", this.tidyUp(room));
        // window.addEventListener("pagehide", this.tidyUp(room));
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
      const tracks = await createLocalTracks();

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
    // tidyUp(room, event) {
    //   if(event.persisted) {
    //     return;
    //   }
    //   if(room) {
    //     room.disconnect();
    //     room = null;
    //   }
    // }
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