<template>
  <div id="twitter">
    <Navbar class="d-none" />

    <router-view />

    <PopularList class="d-none" />
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
}
</style>
