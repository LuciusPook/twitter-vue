<template>
  <div id="twitter">
    <Navbar/>

    <router-view />

    <PopularList/>

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
  height: 1200px;
}
</style>
