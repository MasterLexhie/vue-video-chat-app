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
      <div
        v-for="item in video_list"
        :key="item.id"
        :id="item.idName"
        :ref="item.ref"
        class="video__body full-width"
      ></div>
    </div>
    <OptionButtons />
  </div>
</template>
<script>
import OptionButtons from "./OptionButtons";
import { connect /* createLocalVideoTrack */ } from "twilio-video";
import { mapState } from "vuex";

export default {
  components: {
    OptionButtons,
  },
  data() {
    return {
      video_list: [
        {
          id: 1,
          ref: "remoteVideoRef",
          idName: "remoteVideo",
        },
        {
          id: 2,
          ref: "localVideoRef",
          idName: "localVideo",
        },
      ],
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
    }).then(
      (room) => {
        console.log(`Successfully joined a Room: ${room}`);
        // room.on('participantConnected', participant => {
        //   console.log(`A remote Participant connected: ${participant}`);

        //   // Attach the Participant's Media to a <div> element.
        //   participant.tracks.forEach(publication => {
        //     if (publication.isSubscribed) {
        //       const track = publication.track;
        //       document.getElementById('remote-media-div').appendChild(track.attach());
        //     }
        //   });

        //   participant.on('trackSubscribed', track => {
        //     document.getElementById('remote-media-div').appendChild(track.attach());
        //   });
        // });

        // // For RemoteParticipants that are already in the Room
        // room.participants.forEach(participant => {
        //   participant.tracks.forEach(publication => {
        //     if (publication.track) {
        //       document.getElementById('remote-media-div').appendChild(publication.track.attach());
        //     }
        //   });

        // participant.on('trackSubscribed', track => {
        //     document.getElementById('remote-media-div').appendChild(track.attach());
        //   });
        // });

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
      },
      (error) => {
        console.error(`Unable to connect to Room: ${error.message}`);
      }
    );
  },
  methods: {},
};
</script>
<style scoped>
.video {
  position: relative;
}

.video__body {
  height: 50%;
}

.video__body video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

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