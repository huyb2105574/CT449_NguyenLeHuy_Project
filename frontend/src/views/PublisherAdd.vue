<template>
    <div class="page">
        <h4>Thêm Nhà Xuất Bản</h4>
        <PublisherForm :publisher="publisher" @submit:publisher="addPublisher" />
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
    data() {
        return {
            publisher: {
                name: "",
                address: "",
            },
            message: "",
        };
    },
    methods: {
        async addPublisher(data) {
            try {
                await PublisherService.create(data);
                alert("Nhà xuất bản đã được thêm thành công.");
                this.$router.push({ name: "publishers" });
            } catch (error) {
                console.error("Lỗi khi thêm nhà xuất bản:", error.response || error);
                this.message = "Không thể thêm nhà xuất bản. Vui lòng thử lại.";
            }
        },
    },
};
</script>
