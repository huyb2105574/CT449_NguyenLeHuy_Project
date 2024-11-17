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
                const formData = new FormData();
                // Kiểm tra dữ liệu trước khi gửi đi
                Object.keys(data).forEach((key) => {
                    if (key === "image" && data[key] instanceof File) {
                        formData.append("image", data[key]);
                    } else if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
                        formData.append(key, data[key]);
                    }
                });

                console.log("Dữ liệu FormData gửi đến API:");
                for (const pair of formData.entries()) {
                    console.log(pair[0], ":", pair[1]);
                }

                await BookService.create(formData);
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
