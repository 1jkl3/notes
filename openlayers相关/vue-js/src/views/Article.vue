<!--
 * @Author: your name
 * @Date: 2021-02-01 11:13:02
 * @LastEditTime: 2021-02-01 13:08:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-js\src\views\Article.vue
-->
<template>
  <div class="article">
      <editor />
  </div>
</template>

<script>
import editor from '@/components/editor';
export default {
  name: "Article",
  components: {
    editor
  },
  mounted() {
  },
  methods: {
    
  }
};
</script>
