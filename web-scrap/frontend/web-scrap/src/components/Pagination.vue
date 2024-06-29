<template>
  <div class = "btn-container">
    <button @click="prevPage" :disabled="currentPage === 1" ><i class="fa fa-angle-double-left" aria-hidden="true"></i> Previous</button>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next  <i class="fa fa-angle-double-right" aria-hidden="true"></i></button>
  </div>
</template>

<script>
export default {
  props: ['totalItems', 'currentPage','itemsPerPage'],
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  },
  methods: {
    prevPage() {
        console.log('yes')
      if (this.currentPage > 1) {
        this.$emit('pageChanged', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('pageChanged', this.currentPage + 1);
      }
    }
  }
};
</script>
<style scoped>
.btn-container{
    margin:20px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn-container button{
    width: 100px;
    padding: 10px;
    background: #4caf50;
    color: #fff;
    border: none;
    font-size: 16px;
}
.btn-container button:disabled{
    background: #c3c3c3;
}
.btn-container button:first-child{
    margin-right: 10px;
}
</style>