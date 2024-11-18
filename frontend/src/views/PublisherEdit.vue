<template>
    <div v-if="publisher" class="page">
        <h4>Hiệu chỉnh Nhà Xuất Bản</h4>
        <PublisherForm 
            :publisher="publisher"
            @submit:publisher="updatePublisher" 
            @delete:publisher="deletePublisher" 
        />
        <p>{{ message }}</p>
    </div>
</template>


<script>
import PublisherForm from "@/components/PublisherForm.vue";
import PublisherService from "@/services/publisher.service";

export default {
    components: {
        PublisherForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            publisher: null,
            message: "",
        };
    },
    methods: {
        async getPublisher(id) {
            try {
                this.publisher = await PublisherService.get(id);
            } catch (error) {
                console.error("Không tìm thấy nhà xuất bản:", error);
                this.$router.push({
                    name: "notfound",
                    params: { pathMatch: this.$route.path.split("/").slice(1) },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updatePublisher(data) {
            try {
                await PublisherService.update(this.publisher._id, data);
                alert("Nhà xuất bản đã được cập nhật thành công.");
                this.$router.push({ name: "publishers" });
            } catch (error) {
                console.error("Lỗi khi cập nhật nhà xuất bản:", error);
                this.message = "Không thể cập nhật nhà xuất bản. Vui lòng thử lại.";
            }
        },
        async deletePublisher() {
            if (confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?")) {
                try {
                    await PublisherService.delete(this.publisher._id);
                    alert("Nhà xuất bản đã được xóa thành công.");
                    this.$router.push({ name: "publishers" });
                } catch (error) {
                    console.error("Lỗi khi xóa nhà xuất bản:", error);
                    this.message = "Không thể xóa nhà xuất bản. Vui lòng thử lại.";
                }
            }
        },
    },
    created() {
        this.getPublisher(this.id);
        this.message = "";
    },
};
</script>
