<template>
    <div v-if="borrowing" class="page">
        <h4>Hiệu chỉnh Thông tin Mượn Sách</h4>
        <BorrowingForm 
            :borrowing="borrowing" 
            @submit:borrowing="updateBorrowing" 
            @delete:borrowing="deleteBorrowing" 
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import BorrowingForm from "@/components/BorrowingForm.vue";
import BookBorrowingTrackingService from "@/services/bookborrowingtracking.service";

export default {
    components: {
        BorrowingForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            borrowing: null,
            message: "",
        };
    },
    methods: {
        async getBorrowing(id) {
            try {
                this.borrowing = await BookBorrowingTrackingService.get(id);
            } catch (error) {
                console.error("Không tìm thấy bản ghi mượn sách:", error);
                this.$router.push({
                    name: "notfound",
                    params: { pathMatch: this.$route.path.split("/").slice(1) },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateBorrowing(data) {
            try {
                await BookBorrowingTrackingService.update(this.borrowing._id, data);
                alert("Thông tin mượn sách đã được cập nhật thành công.");
                this.$router.push({ name: "bookBorrowingTracking" });
            } catch (error) {
                console.error("Lỗi khi cập nhật thông tin mượn sách:", error);
                this.message = "Không thể cập nhật thông tin. Vui lòng thử lại.";
            }
        },
        async deleteBorrowing() {
            if (confirm("Bạn có chắc chắn muốn xóa bản ghi này?")) {
                try {
                    await BookBorrowingTrackingService.delete(this.borrowing._id);
                    alert("Thông tin mượn sách đã được xóa thành công.");
                    this.$router.push({ name: "bookBorrowingTracking" });
                } catch (error) {
                    console.error("Lỗi khi xóa thông tin mượn sách:", error);
                    this.message = "Không thể xóa bản ghi. Vui lòng thử lại.";
                }
            }
        },
    },
    created() {
        this.getBorrowing(this.id);
        this.message = "";
    },
};
</script>
