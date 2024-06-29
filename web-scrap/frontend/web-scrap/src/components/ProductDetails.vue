<template>
  <div class = "products">
    <div class="product-details-container">
      <h1>Product Details</h1>
      <div v-if="loader"><loader /></div>
      <div v-if="product" class="d-flex">
        <div class="img-container d-flex">
          <img
            :src="product.imageUrl"
            alt="Product Image"
            class="product-image"
          />
        </div>
        <div class="w-50">
          <p v-if="product.name !== ''" class="product-details">
            <b><span>Name</span><span>:</span></b
            >{{ product.name }}
          </p>
          <p v-if="product.price !== ''" class="product-details">
            <b><span>Price</span><span>:</span></b> ₹ {{ product.price }}
          </p>
          <p v-if="product.description !== ''" class="product-details">
            <b><span>Description</span> <span>:</span></b>
            {{ product.description || "No description available" }}
          </p>
          <p v-if="product.brand !== ''" class="product-details">
            <b><span>Brand </span><span>:</span></b> {{ product.brand }}
          </p>
          <p v-if="product.rating !== ''" class="product-details">
            <b><span>Rating</span> <span>:</span></b> {{ product.rating }}
          </p>
          <p v-if="product.stock !== ''" class="product-details">
            <b><span>Stock</span> <span>:</span></b> {{ product.stock }}
          </p>
          <p v-if="product.url !== ''" class="product-details">
            <b><span>URL </span><span>:</span></b>
            <a :href="product.url" target="_blank">{{ product.url }}</a>
          </p>
        </div>
      </div>
      <div v-else>
        <p>Product not found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "./Loader.vue";
export default {
  props: ["id"],
  components: {
    Loader,
  },
  data() {
    return {
      product: null,
      loader: false,
    };
  },
  async created() {
    await this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      this.loader = true;
      try {
        const response = await this.$axios.get(
          `http://localhost:3222/api/webscrape/getById/${this.id}`
        );
        this.product = response.data.data;
        this.loader = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.products{
    height: 94vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.w-50 {
  width: 50%;
}
.product-details-container {
  max-width: 1100px;
  margin: auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}
.d-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-details-container .img-container {
  width: 50%;
  height: 360px;
}
.product-details-container .img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-details-container .product-details {
  display: flex;
}
.product-details b {
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  min-width: 100px;
}

.product-details-container h1 {
  margin: 0;
  text-align: center;
  font-size: 24px;
}

.product-details-container img {
  width: 100%;
  max-width: 300px;
}

.product-details-container p {
  margin: 8px 0;
}

.product-details-container a {
  color: #007bff;
  text-decoration: none;
  width: 100%;
  word-wrap: break-word;
  overflow: auto;
}

.product-details-container a:hover {
  text-decoration: underline;
}
</style>
