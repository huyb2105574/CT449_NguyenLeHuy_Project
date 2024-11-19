<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
  computed: {
    showHeader() {
      return !['/login', '/login/reader', '/register'].includes(this.$route.path);
    }
  }
};
</script>

<template>
  <div id="app">
    <AppHeader v-if="showHeader" />
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style>
  .page {
    margin: auto;
  }
</style>
