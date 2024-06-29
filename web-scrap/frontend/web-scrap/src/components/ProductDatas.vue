<template>
<div>
  <div class="table-container" v-if="data">
    <table>
      <thead>
        <tr>
          <th @click="sortData('name')">Name <i :class="sortArrow" aria-hidden="true" ></i></th>
          <th @click="sortData('price')">Price <i :class="sortArrow" aria-hidden="true"></i></th>
          <th @click="sortData('brand')">Brand <i :class="sortArrow" aria-hidden="true"></i></th>
          <th @click="sortData('rating')">Rating <i :class="sortArrow" aria-hidden="true"></i></th>
          <th @click="sortData('stock')">Stock <i :class="sortArrow" aria-hidden="true"></i></th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.id">
          <td class="name-column" style="cursor:pointer;" @click="viewProductDetails(item.productId)">{{ item.name || "-" }}</td>
          <td>₹ {{ item.price || "-"}}</td>
          <td>{{ item.brand || "-"}}</td>
          <td>{{ item.rating || "-"}}</td>
          <td>{{ item.stock || "-" }}</td>
            <td>
            <button @click="deleteItem(item.productId)" class="trashBtn">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :totalItems="data.length" :currentPage="currentPage" @pageChanged="changePage" :itemsPerPage="itemsPerPage"/>
  </div>
  <div v-else-if="loader"><loader/></div>
  </div>
</template>

<script>
import Pagination from './Pagination.vue';
import { useToast } from "vue-toastification";

export default {
  components: { Pagination },
  props: ['data','fetchData'],
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      sortedColumn: '',
      sortOrder: 'asc',
      sortArrow:'fa fa-long-arrow-up',
      loader:false
    };
  },
  computed: {
    paginatedData() {
      let sortedData = [...this.data];
      if (this.sortedColumn) {
        sortedData.sort((a, b) => {
          if (this.sortOrder === 'asc') {
            this.sortArrow = 'fa fa-long-arrow-up'
            return a[this.sortedColumn] > b[this.sortedColumn] ? 1 : -1;
          } else {
            this.sortArrow = 'fa fa-long-arrow-down'
            return a[this.sortedColumn] < b[this.sortedColumn] ? 1 : -1;
          }
        });
      }
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return sortedData.slice(start, start + this.itemsPerPage);
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    sortData(column) {
      this.sortedColumn = column;
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    },
     async deleteItem(productId) {
        this.loader = true
        const toast = useToast();
        await this.$axios.delete(`http://localhost:3222/api/webscrape/delete/${productId}`);
         toast.success("Deleted successfully!");
         await this.fetchData()
         this.loader = false
    },
    viewProductDetails(id) {
      this.$router.push({ path: `/product/${id}` });
    }
  },
   
};
</script>


<style scoped>
/* styles.css */
.table-container {
  width: 100%;
}
.table-container thead i{
    color: #fff;
    font-size: 12px;
}
i{
    color: #c8bcbc;
    font-size: 16px;
}
.trashBtn .fa.fa-trash{
    font-size: 20px;
    color: #fff;
    
}

.name-column {
  padding: 8px;
  word-wrap: break-word;
  max-width: 200px;
  text-align: left;
}
.table-container table {
  width: 100%;
  border-collapse: collapse;
}

.table-container th,
.table-container td {
  padding: 8px;
  border-right: 1px solid #eaeaea;
}
table{
      border: 1px solid #eaeaea;
}

.table-container thead {
  background: #4caf50;
  color: #fff;
}

.table-container tbody tr{
  border-bottom: 1px solid #ddd;
}

.table-container th:hover {
  cursor: pointer;
}
td{
  text-align: center;
}
.table-container button {
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: #4caf50;
}

.table-container .trashBtn:hover{
  background: red; 
}
</style>