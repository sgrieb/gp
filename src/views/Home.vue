<template>
  <div>
    <h2>View Cart</h2>
    <div>
      <v-list-item v-bind:key="index" v-for="(item, index) in items">
        <v-list-item-content>
          <v-list-item-title>Item: {{ item.id }}</v-list-item-title>
          <v-list-item-subtitle>Price: {{ item.price }}</v-list-item-subtitle>
          <v-list-item-subtitle>Quantity: {{ item.quantity }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div>
        <h3>Subtotal: ${{ subtotal }}</h3>
      </div>
    </div>
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

</style>
