<template>
  <div class="book-list container">
    <h2 class="text-center my-4">Danh sách Sách</h2>
    
    <div class="col-md-10">
        <InputSearch v-model="searchText" />
    </div>

    <div class="row">
      <BookCardForReader
        v-for="book in filteredBooks"
        :key="book.id"
        :book="book"
        class="col-md-4 mb-4"
      />
    </div>

    <p v-if="filteredBooks.length === 0" class="text-center mt-4">
      Không có sách nào phù hợp với tìm kiếm của bạn.
    </p>
  </div>
</template>

<script>
import BookCardForReader from "@/components/BookCardForReader.vue";
import BookService from "@/services/book.service";
import InputSearch from "@/components/InputSearch.vue";

export default {
  components: {
    BookCardForReader,
    InputSearch,
  },
  data() {
    return {
      books: [],       
      searchText: "",   
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchText) return this.books;
      return this.books.filter(book =>
        book.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.retrieveBooks(); 
  },
};
</script>

<style scoped>
.book-list {
  margin-top: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 0px;
}

.col-md-4 {
  flex: 1 1 30%; 
  min-width: 250px; 
  margin-bottom: 20px;
}

.col-md-10 {
  margin-bottom: 20px; 
}

</style>
