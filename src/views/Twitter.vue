<template>
  <div class="twitter">
    <router-view />
    <PopularList />
  </div>
</template>

<script>
import PopularList from "../components/PopularList.vue";
export default {
  components: {
    PopularList,
  },
};
</script>

<style lang="scss" scoped>
.twitter {
  display: flex;
  flex: 1;
}
</style>
