<template>
    <div v-if="reader" class="page">
        <h4>Hiệu chỉnh Độc giả</h4>
        <ReaderForm 
            :reader="reader" 
            @submit:reader="updateReader"
            @delete:reader="deleteReader" 
        />
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
        async deleteReader() {
            if (confirm("Bạn muốn xóa Độc giả này?")) {
                try {
                    await ReaderService.delete(this.reader._id);
                    this.$router.push({ name: "readers" });
                } catch (error) {
                    console.error(error);
                }
            }
        },
    },
    created() {
        this.getReader(this.id);
    },
};
</script>
