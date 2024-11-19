<template>
    <div v-if="reader" class="page">
        <h4>Chỉnh sửa thông tin</h4>
        <EditAccountForm 
            :reader="reader" 
            @submit:reader="updateReader"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import EditAccountForm from "@/components/EditAccountForm.vue";
import ReaderService from "@/services/reader.service";

export default {
    components: {
        EditAccountForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            reader: null,
            message: "",
        };
    },
    methods: {
        async getReader(id) {
            try {
                this.reader = await ReaderService.get(id);
            } catch (error) {
                console.error(error);
                this.$router.push({ name: "notfound" });
            }
        },
        async updateReader(data) {
            try {
                await ReaderService.update(this.reader._id, data);
                alert("Độc giả đã được cập nhật thành công.");
                this.$router.push({ name: "readers" });
            } catch (error) {
                console.error(error);
            }
        },
    },
    created() {
        this.getReader(this.id);  
    },
};
</script>
