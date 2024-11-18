<template>
    <Form 
        @submit="submitPublisher" 
        :validation-schema="publisherFormSchema" 
        ref="form"
    >
        <div class="form-group">
            <label for="name">Tên nhà xuất bản</label>
            <Field 
                name="name" 
                type="text" 
                class="form-control" 
                v-model="publisherLocal.name" 
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field 
                name="address" 
                type="text" 
                class="form-control" 
                v-model="publisherLocal.address" 
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <button class="btn btn-primary">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button type="button" class="btn btn-danger" @click="cancel">
                <i class="fas fa-times"></i> Thoát
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        console.log("Dữ liệu publisher lúc khởi tạo trong PublisherForm:", this.publisher)
        const publisherFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên nhà xuất bản không được để trống.")
                .max(100, "Tên nhà xuất bản tối đa 100 ký tự."),
            address: yup
                .string()
                .required("Địa chỉ không được để trống.")
                .max(200, "Địa chỉ tối đa 200 ký tự."),
        });

        return {
            publisherLocal: { ...this.publisher },
            publisherFormSchema,
        };
    },
    methods: {
        submitPublisher() {
            const publisherData = { ...this.publisherLocal };
            this.$emit("submit:publisher", publisherData);
        },
        cancel() {
            const reply = window.confirm("Bạn chưa lưu thay đổi! Bạn có chắc muốn thoát?");
            if (reply) this.$router.push({ name: "publishers" });
        },
    },

};
</script>
