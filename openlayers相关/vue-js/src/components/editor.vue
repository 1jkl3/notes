<!--
 * @Author: your name
 * @Date: 2021-02-01 11:12:37
 * @LastEditTime: 2021-02-01 16:12:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\components\editor.vue
-->
<template>
  <div id="editor-container">
    <div class="tool" ref="tool"></div>
    <div class="content" ref="content">
      <slot name="content"></slot>
    </div>
    <button @click="getEditorData">获取元素</button>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "editor",
  data() {
    return {
      editor: null,
    };
  },
  methods: {
    /**
     * @description: 获取富文本中的内容
     * @param {*}
     * @return {*}
     */
    async getEditorData() {
      let htmlJson = this.editor.txt.getJSON();
      let imgJson = [];
      htmlJson.forEach((item) => {
        item.children.forEach((i, index) => {
          if (typeof i !== "string" && i.tag === "img") {
            i.id = index;
            imgJson.push(i);
          }
        });
      });
      let res = await this.uploadImg(imgJson);
      // 改变html中img的src内容
      htmlJson.forEach((item) => {
        item.children.forEach((i) => {
          if (typeof i !== "string" && i.tag === "img") {
            res.forEach((img) => {
              if (i.id === img.id) {
                i = img;
              }
            });
          }
        });
      });
      // console.log(htmlJson);
      this.editor.txt.setJSON(htmlJson);
      console.log(this.editor.txt.html());
    },
    // 上传文件
    uploadImg(imgs) {
      return new Promise((resolve, reject) => {
        // 改变img中的src内容
        imgs.forEach((item) => {
          item.attrs.map((i) => {
            i.name === "src" && (i.value = "jdasnfpaf");
            i.name === "alt" && (i.value = "");
            return i;
          });
        });
        resolve(imgs);
      });
    },
  },
  mounted() {
    this.editor = new E(this.$refs.content);
    this.editor.config.uploadImgShowBase64 = true;
    this.editor.config.excludeMenus = ["splitLine", "video"];
    this.editor.create();
    let container = document.querySelector(".w-e-text-container")
    container.style.height = 'calc(100% - 42px)';
  },
  beforeDestroy() {
    this.editor.destroy();
    this.editor = null;
  },
};
</script>

<style scoped>
#editor-container {
  width: 100%;
  height: 600px;
  text-align: center;
}
.tool {
  width: 100%;
  height: 100px;
}
.content {
  width: 100%;
  height: 500px;
  text-align: left;
}
</style>