<template>
  <div id="twitter" class="scrollbar">
    <Navbar />

    <router-view />

    <PopularList />
  </div>
</template>


<script >
import Navbar from "./components/Navbar.vue";
import PopularList from "./components/PopularList.vue";

export default {
  components: {
    Navbar,
    PopularList,
  },
};
</script>

<style scoped>
#twitter {
  height: 1200px;
  display: flex;
}
</style>
