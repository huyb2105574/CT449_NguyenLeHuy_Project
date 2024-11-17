<template>
    <div class="page">
        <h4>Thêm Sách</h4>
        <BookForm :book="book" @submit:book="addBook" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BookForm,
    },
    data() {
        return {
            book: {
                title: "",
                author: "",
                price: 0,
                quantity: 0,
                publish_year: new Date().getFullYear(),
                publisher_id: "",
                image: "",
            },
            message: "",
        };
    },
    methods: {
        async addBook(data) {
            try {
                await BookService.create(data);
                alert("Sách đã được thêm thành công.");
                this.$router.push({ name: "books" });
            } catch (error) {
                console.error("Lỗi khi thêm sách:", error.response || error);
                this.message = "Không thể thêm sách. Vui lòng thử lại.";
            }
        }
    },
};
</script>
