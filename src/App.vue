<template>
  <div id="twitter">
    <Navbar/>

    <router-view />

    <PopularList/>
  </div>
</template>


<script lang="ts">
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
  display: flex;
  height: 1200px;
}
</style>
