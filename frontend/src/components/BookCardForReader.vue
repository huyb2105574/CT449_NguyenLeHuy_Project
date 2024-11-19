<template>
  <div class="book-card d-flex flex-column p-3 border shadow-sm rounded" v-bind="$attrs">
    <div class="book-title">
      <h5 class="book-title">{{ book.title }}</h5>
    </div>

    <div class="d-flex flex-row justify-content-between align-items-start">
      <div class="book-image">
        <img :src="'http://localhost:3000' + book.image" alt="Book Image" class="img-fluid rounded shadow" />
      </div>
      <div class="book-info flex-grow-1 ms-3">
        <p class="book-author">Tác giả: {{ book.author }}</p>
        <p class="book-price">Giá: {{ book.price }} VND</p>
        <p class="book-year">Năm xuất bản: {{ book.publish_year }}</p>
        <div class="d-flex justify-content-end">
            <button class="borrow-btn" @click="showBorrowForm">Mượn</button>
        </div>
      </div>
    </div>
    
    
  </div>

  <div v-if="isFormVisible" class="borrow-form-overlay">
    <div class="borrow-form-container">
      <h4>Thêm Thông tin Mượn Sách</h4>
      <form @submit.prevent="submitBorrowingForm">
        <div class="form-group">
          <label for="return_date">Ngày trả:</label>
          <input type="date" id="return_date" v-model="borrowing.return_date" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success w-100">Tạo đơn mượn sách</button>
        <button type="button" class="btn btn-danger w-100" @click="hideBorrowForm">Hủy</button>
      </form>
    </div>
  </div>
</template>


<script>
import bookborrowingtrackingService from '@/services/bookborrowingtracking.service';

export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFormVisible: false,
      borrowing: {
        book_id: this.book._id, 
        reader_id: localStorage.getItem("_id"), 
        employee_id: "", 
        borrow_date: new Date().toISOString().split("T")[0], 
        return_date: "",
      },
    };
  },
  methods: {
    showBorrowForm() {
      this.isFormVisible = true;
    },
    hideBorrowForm() {
      this.isFormVisible = false;
    },
    async submitBorrowingForm() {
      try {
        const [startYear, startMonth, startDay] = this.borrowing.borrow_date.split("-");
        this.borrowing.borrow_date = `${startDay}/${startMonth}/${startYear}`;
        const [returnYear, returnMonth, returnDay] = this.borrowing.return_date.split("-");
        this.borrowing.return_date = `${returnDay}/${returnMonth}/${returnYear}`;

        await this.addBorrowing(this.borrowing);
        alert("Đơn mượn sách đã được tạo thành công!");
        this.hideBorrowForm(); 
      } catch (error) {
        console.error("Lỗi khi tạo đơn mượn sách:", error);
      }
    },
    async addBorrowing(borrowing) {
      try {
        await bookborrowingtrackingService.create(borrowing);
        this.$router.push({ name: "bookforreader" });
      } catch (error) {
        console.error("Lỗi khi thêm thông tin mượn sách:", error.response || error);
      }
    },
  },
};
</script>

<style scoped>
.book-card {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
}



.d-flex {
  display: flex;
}

.book-title {
  margin-bottom: 10px;
}

.book-image {
  flex-shrink: 0;
  width: 120px;
  height: 180px;
}

.book-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.book-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px; 
  font-size: 0.9rem;
}

.book-author,
.book-price,
.book-year {
  margin-bottom: 5px;
}

.borrow-btn {
  margin-top: auto; 
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.borrow-btn:hover {
  background-color: #0056b3;
}

.borrow-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.borrow-form-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.borrow-form-container input {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
}

.borrow-form-container button {
  width: 100%;
  margin-top: 10px;
}

</style>
