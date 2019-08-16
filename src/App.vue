<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <div class="cart-header"><h2>Cart</h2></div>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
  }
</style>