<template>
    <div class="page">
        <h4>Thêm Thông tin Mượn Sách</h4>
        <BorrowingForm :borrowing="borrowing" @submit:borrowing="addBorrowing" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import BorrowingForm from "@/components/BorrowingForm.vue";
import BookBorrowingTrackingService from "@/services/bookborrowingtracking.service";
import bookService from "@/services/book.service";

export default {
    components: {
        BorrowingForm,
    },
    data() {
        return {
            borrowing: {
                book_id: "",
                reader_id: "",
                employee_id: "",
                borrow_date: "",
                return_date: "",
            },
            message: "",
        };
    },
    methods: {
        async addBorrowing(data) {
            try {
                if(data.employee_id!=""){
                    const book = await bookService.get(data.book_id);
                    if (book.quantity <= 0) {
                        this.message = "Không đủ sách để mượn.";
                        return;
                        }
                    const updatedBook = { ...book, quantity: book.quantity - 1 };
                    await bookService.update(data.book_id, updatedBook);
                }
                await BookBorrowingTrackingService.create(data);
                alert("Thông tin mượn sách đã được thêm thành công.");
                this.$router.push({ name: "bookBorrowingTracking" });
            } catch (error) {
                console.error("Lỗi khi thêm thông tin mượn sách:", error.response || error);
                this.message = "Không thể thêm thông tin. Vui lòng thử lại.";
            }
        },
    },
};
</script>
