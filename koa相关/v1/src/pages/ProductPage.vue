<template>
  <Product :data="data" v-if="data" />
  hhh
</template>

<script>
import { defineComponent, toRefs, reactive } from "vue";
import { get } from "/@/util/network";
import Product from "/@/components/Product.vue";
export default defineComponent({
  name: "productPage",
  components: {
    Product,
  },
  setup() {
    const state = reactive({
      data: null,
    });
    const method = {
      async getProductList() {
        let res = await get("/product");
        state.data = res.data;
      },
    };
    method.getProductList();
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="" scoped>
</style>
