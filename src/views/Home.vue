<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <h3>Subtotal ${{ subtotal }}</h3>
    <v-expansion-panels class="cart-items">
      <v-expansion-panel
        v-bind:key="index" v-for="(item, index) in items"
      >
        <v-expansion-panel-header>
          <img class="cart-image" :src="item.images[0].thumb" />
          {{ item.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content v-html="item.description">
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  data: () => ({
    
  }),
  computed: {
    ...mapState({
      items: state => state.items
    }),
    subtotal() {
      // calculate the price for each item /w quantity
      let result = 0

      this.items.forEach((item) => {
        result += (item.price * item.quantity)
      })

      return result.toFixed(2)
    }
  }
};
</script>
<style lang="scss" scoped>
  .cart {
    padding-top: 2rem;
    text-align: center;
  }

  .cart-image {
    max-width: 20px;
    max-height: 20px;
  }

  .cart-items {
    padding-top: 1rem;
    max-width: 80%;
    margin: auto;
  }
</style>
