<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <h3>Subtotal ${{ subtotal }}</h3>
    <v-simple-table class="cart-items">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Quantity</th>
          <th class="text-left">Price</th>
          <th v-if="SHOW_ITEM_TOTALS" class="text-left">Item Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.product_id">
          <td>
            <img class="cart-image" :src="item.images[0].thumb" />
            {{ item.name }}
          </td>
          <td>{{ item.quantity }}</td>
          <td>
            <v-tooltip class="cart-tip" v-if="item.price !== item.credit_coupon_price" bottom>
              <template v-slot:activator="{ on }">
                <div v-on="on">
                  <div class="strike-price">{{ '$' + item.price }}</div>
                  <div class="discount-price">{{ '$' + item.credit_coupon_price }}</div>
                </div>
              </template>
              <span>Epic coupon usage!  You saved ${{getSavings(item)}} each!</span>
            </v-tooltip>
            <div v-else>
              {{ '$' + item.price }}
            </div>
          </td>
          <td v-if="SHOW_ITEM_TOTALS">
            ${{getItemTotal(item)}}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>

// testing util
const SHOW_ITEM_TOTALS = false

import { mapState } from 'vuex'
export default {
  data: () => ({
    SHOW_ITEM_TOTALS: SHOW_ITEM_TOTALS
  }),
  computed: {
    ...mapState({
      items: state => state.items
    }),
    subtotal() {
      // calculate the price for each item /w quantity
      let result = 0

      this.items.forEach((item) => {
        if (item.credit_coupon_price !== item.price) {
          result += (item.credit_coupon_price * item.quantity)
        } else [
          result += (item.price * item.quantity)
        ]
      })

      return result.toFixed(2)
    }
  },
  methods: {
    getSavings(item) {
      return ((item.price - item.credit_coupon_price)).toFixed(2)
    },
    getItemTotal(item) {
      if (item.price !== item.credit_coupon_price) {
        return (item.credit_coupon_price * item.quantity).toFixed(2)
      }

      return (item.price * item.quantity).toFixed(2)
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
    text-align: left;
  }

  img {
    margin-right: 5px;
  }

  .discount-price {
    color: green;
  }

  .cart-tip {
    text-align: center;
  }

  .strike-price {
    text-decoration: line-through;
  }
</style>
