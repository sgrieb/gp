import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const CART_URL = 'https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json'
const META_URL = 'https://prodcat.gopuff.com/api/products'

const CART = {
  "cart": {
      "products": [
          {
              "quantity": 4,
              "available_for_bonus": false,
              "category_id": 20,
              "credit_coupon_price": 0.98,
              "discount": 2.04,
              "id": 989,
              "price": 1.49,
              "product_id": 989
          },
          {
              "quantity": 1,
              "category_id": 59,
              "credit_coupon_price": 4.95,
              "discount": 0,
              "id": 1068,
              "price": 4.95,
              "product_id": 1068
          },
          {
              "quantity": 1,
              "category_id": 59,
              "credit_coupon_price": 4.99,
              "discount": 0,
              "id": 2830,
              "price": 4.99,
              "product_id": 2830
          },
          {
              "quantity": 1,
              "category_id": 20,
              "credit_coupon_price": 4.47,
              "discount": 0.52,
              "id": 1760,
              "price": 4.99,
              "product_id": 1760
          },
          {
              "quantity": 1,
              "category_id": 20,
              "credit_coupon_price": 3.29,
              "discount": 0,
              "id": 13644,
              "price": 3.29,
              "product_id": 13644
          },
          {
              "quantity": 1,
              "category_id": 38,
              "credit_coupon_price": 5.69,
              "discount": 0,
              "id": 929,
              "price": 5.69,
              "product_id": 929
          },
          {
              "quantity": 1,
              "category_id": 11,
              "credit_coupon_price": 3.99,
              "discount": 0,
              "id": 7294,
              "price": 3.99,
              "product_id": 7294
          },
          {
              "quantity": 1,
              "category_id": 11,
              "credit_coupon_price": 7.79,
              "discount": 0,
              "id": 4957,
              "price": 7.79,
              "product_id": 4957
          },
          {
              "quantity": 2,
              "category_id": 20,
              "credit_coupon_price": 3.27,
              "discount": 1.04,
              "id": 8756,
              "price": 3.79,
              "product_id": 8756
          },
          {
              "quantity": 1,
              "category_id": 13,
              "credit_coupon_price": 2.29,
              "discount": 0,
              "id": 356,
              "price": 2.29,
              "product_id": 356
          },
          {
              "quantity": 2,
              "category_id": 20,
              "credit_coupon_price": 1.78,
              "discount": 1.02,
              "id": 879,
              "price": 2.29,
              "product_id": 879
          }
      ]
  },
  "payment_method": "cash",
  "postal_code": "19103",
  "user": {
      "email": "joel.embiid@gopuff.com",
      "first_name": "Joel",
      "id": 123456,
      "last_name": "Embiid"
  }
}

export default new Vuex.Store({
  state: {
    items: null,
    payment: null,
    user: null
  },
  getters: {
    productIds: state => {
      // TODO: use reduce
      let ids = []
      state.items.forEach((item) => {
        ids.push(item.id)
      })
      return ids
    }
  },
  mutations: {
    setItems (store, items) {
      store.items = items
    },
    setPayment (store, payment) {
      store.payment = payment
    },
    setUser (store, user) {
      store.user = user
    },
    setMetadata (store, meta) {
      let products = []

      meta.forEach((metaItem) => {
        let product = store.items.find((item) => {
          return item.product_id === metaItem.product_id
        })

        // merge metadata onto the product
        products.push(Object.assign(metaItem, product))
      })

      store.items = products
    }
  },
  actions: {
    getCart: async ({ store, commit, getters }) => {
      //TODO: do a real fetch here
      let result = CART
      // let result = await axios.get(CART_URL)

      commit('setItems', CART.cart.products)
      commit('setPayment', CART.payment_method)
      commit('setUser', CART.user)

      // get metadata
      let meta = await axios.get(META_URL, {
        params: {
          location_id: -1,
          product_ids: getters.productIds.join(),
          page_size: getters.productIds.length
        }
      })

      commit('setMetadata', meta.data.products)

      // TODO: merge meta + products
    }
  }
})
