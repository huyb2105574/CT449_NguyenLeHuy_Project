<template>
    <div v-if="book" class="page">
        <h4>Hiệu chỉnh Sách</h4>
        <BookForm 
            :book="book" 
            @submit:book="updateBook" 
            @delete:book="deleteBook" 
        />
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
    props: {
        id: { type: String, required: true }, 
    },
    data() {
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await BookService.get(id);
            } catch (error) {
                console.error("Không tìm thấy sách:", error);
                this.$router.push({
                    name: "notfound", 
                    params: { pathMatch: this.$route.path.split("/").slice(1) },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateBook(data) {
            try {
                await BookService.update(this.book._id, data);
                alert("Sách đã được cập nhật thành công.");
                this.$router.push({ name: "books" });
            } catch (error) {
                console.error("Lỗi khi cập nhật sách:", error);
                this.message = "Không thể cập nhật sách. Vui lòng thử lại.";
            }
        },
        async deleteBook() {
            if (confirm("Bạn có chắc chắn muốn xóa sách này?")) {
                try {
                    await BookService.delete(this.book._id);
                    alert("Sách đã được xóa thành công.");
                    this.$router.push({ name: "books" });
                } catch (error) {
                    console.error("Lỗi khi xóa sách:", error);
                    this.message = "Không thể xóa sách. Vui lòng thử lại.";
                }
            }
        },
    },
    created() {
        this.getBook(this.id); 
        this.message = "";
    },
};
</script>
