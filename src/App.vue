<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-toolbar-title>Products</v-toolbar-title>
    </v-app-bar>

    <div class="content">
      <router-view />
    </div>

    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">Products &copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },

    data: () => ({
      drawer: null,
    }),
  }
</script>
<style lang="scss" scoped>
  .cart-header {
    text-align: center;
  }

  .content {
    margin-top: 56px;
    padding-bottom: 36px;
    text-align: center;
  }
</style>