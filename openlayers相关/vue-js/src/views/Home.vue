<!--
 * @Author: your name
 * @Date: 2021-01-29 09:10:08
 * @LastEditTime: 2021-02-01 13:07:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\views\Home.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <video src="" id="vi" ref="vi" autoplay style="width:400px;height:480px;"></video>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  mounted() {
    // navigator.getUserMedia =
    //   navigator.getUserMedia ||
    //   navigator.webkitGetUserMedia ||
    //   navigator.mozGetUserMedia ||
    //   navigator.msGetUserMedia;
    // navigator.getUserMedia(
    //   { video: false, audio: true },
    //   e => {
    //     this.$refs.ad.src = window.URL.createObjectURL(e);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    // console.log(navigator);
    // this.media();
  },
  methods: {
    media() {
      // Older browsers might not implement mediaDevices at all, so we set an empty object first
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }

      // Some browsers partially implement mediaDevices. We can't just assign an object
      // with getUserMedia as it would overwrite existing properties.
      // Here, we will just add the getUserMedia property if it's missing.
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // First get ahold of the legacy getUserMedia, if present
          var getUserMedia =
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          // Some browsers just don't implement it - return a rejected promise with an error
          // to keep a consistent interface
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }

          // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }

      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(function(stream) {
          var video = document.querySelector("video");
          if ("srcObject" in video) {
            console.log("进入");
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
          }
          video.onloadedmetadata = function(e) {
            video.play();
          };
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        });
    }
  }
};
</script>
