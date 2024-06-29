<template>
  <div>
    <div class="input-wrapper">
      <label>Enter Your Amazon Product URL</label>
      <div class="input-container">
        <input type="text" placeholder="Enter the url" v-model="url" />
        <button @click="submitUrl">Scrape</button>
      </div>
    </div>
    <div>
      <Loader v-if="loader" />
      <ProductDatasVue
        v-else-if="data.length"
        :data="data"
        :fetchData="fetchData"
      />
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import ProductDatasVue from "./ProductDatas.vue";
import Loader from "./Loader.vue";

export default {
  name: "input-form",
  components: {
    ProductDatasVue,
    Loader,
  },
  data() {
    return {
      url: "",
      data: [],
      loader: false,
    };
  },
  methods: {
    async submitUrl() {
      this.loader = true;
      const toast = useToast();
      try {
        const resp = await this.$axios.post(
          "http://localhost:3222/api/webscrape/create",
          {
            url: this.url,
          }
        );
        console.log(resp);
        if (resp.status == 302) {
        }
        toast.success("URL submitted successfully!");
        this.fetchData();
        this.url = "";
        this.$emit("urlSubmitted");
      } catch (error) {
        if (error.response.status == 409) {
          console.log(error.response)
          toast.warning(error.response.data.message);
          this.fetchData();
          this.url = "";
          return;
        }
        toast.error("An error occurred. Please try again.");
        console.error(error);
      }
    },
    async fetchData() {
      this.loader = true;
      try {
        const response = await this.$axios.get(
          "http://localhost:3222/api/webscrape/getAll"
        );
        this.data = response.data.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loader = false;
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 20px;
}

input {
  padding: 8px;
  width: 40%;
  box-sizing: border-box;
  border-right: 0;
  border: 1px solid #c8c1c1;
  font-size: 16px;
}
input:focus {
  outline: none;
}

button {
  height: 40px;
  width: 85px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
.input-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 40px;
}
.input-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

button:hover {
  background-color: #45a049;
}
</style>
