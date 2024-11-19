<template>
    <div class="page">
        <h4>Đăng ký</h4>
        <ReaderForm :reader="reader" :isRegisterPage="true" @submit:reader="addReader" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ReaderForm from "@/components/ReaderForm.vue";
import ReaderService from "@/services/reader.service";

export default {
    components: {
        ReaderForm,
    },
    data() {
        return {
            reader: {
                name: "",
                username: "",
                password: "",
                birth: "",
                sex: "",
                address: "",
                phone_number: "",
            },
            message: "",
        };
    },
    methods: {
        async addReader(data) {
            try {
                await ReaderService.create(data);
                alert("Độc giả đã được thêm thành công.");
                this.$router.push({ name: "login" });
            } catch (error) {
                console.error("Lỗi khi thêm độc giả:", error);
                this.message = "Không thể thêm độc giả. Vui lòng thử lại.";
            }
        },
    },
};
</script>
