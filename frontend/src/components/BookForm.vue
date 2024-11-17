<template>
    <Form 
        @submit="submitBook" 
        :validation-schema="bookFormSchema" 
        ref="form"
    >
        <div class="form-group">
            <label for="title">Tựa sách</label>
            <Field name="title" type="text" class="form-control" v-model="bookLocal.title" />
            <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author">Tác giả</label>
            <Field name="author" type="text" class="form-control" v-model="bookLocal.author" />
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Giá</label>
            <Field name="price" type="number" class="form-control" v-model="bookLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="quantity">Số lượng</label>
            <Field 
                name="quantity" 
                type="number" 
                class="form-control" 
                v-model="bookLocal.quantity" 
            />
            <ErrorMessage name="quantity" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="publisher_id">Nhà xuất bản</label>
            <select 
                name="publisher_id" 
                class="form-control" 
                v-model="bookLocal.publisher_id"
            >
                <option value="">-- Chọn nhà xuất bản --</option>
                <option 
                    v-for="publisher in publishers" 
                    :key="publisher._id" 
                    :value="publisher._id"
                >
                    {{ publisher.name }}
                </option>
            </select>
            <ErrorMessage name="publisher_id" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Hình ảnh minh họa</label>
            <input 
                type="file" 
                name="image" 
                class="form-control-file" 
                @change="onImageSelected" 
            />
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">
                <i class="fas fa-save"></i> Lưu
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import PublisherService from "@/services/publisher.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        book: { type: Object, required: true },
    },
    data() {
        const bookFormSchema = yup.object().shape({
            title: yup
                .string()
                .required("Tựa sách không được để trống.")
                .max(100, "Tựa sách tối đa 100 ký tự."),
            author: yup
                .string()
                .required("Tác giả không được để trống.")
                .max(50, "Tên tác giả tối đa 50 ký tự."),
            price: yup
                .number()
                .required("Giá không được để trống.")
                .min(0, "Giá phải lớn hơn hoặc bằng 0."),
            quantity: yup
                .number()
                .required("Số lượng không được để trống.")
                .min(1, "Số lượng phải lớn hơn hoặc bằng 1."),
        });

        return {
            bookLocal: { ...this.book },
            publishers: [],
            selectedImage: null,
            bookFormSchema,
        };
    },
    async created() {
        await this.fetchPublishers();
    },
    methods: {
        async fetchPublishers() {
            try {
                this.publishers = await PublisherService.getAll();
                // Gán giá trị mặc định nếu chưa có
                if (!this.bookLocal.publisher_id && this.publishers.length > 0) {
                    this.bookLocal.publisher_id = this.publishers[0]._id;
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách nhà xuất bản:", error);
            }
        },
        onImageSelected(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedImage = file;
                this.bookLocal.image = file;  
            }
        },
        async submitBook() {
            const isValid = await this.$refs.form.validate();
            if (!isValid) {
                console.log("Dữ liệu không hợp lệ.");
                return;
            }

            const formData = new FormData();

            // Kiểm tra và thêm các trường vào FormData
            Object.keys(this.bookLocal).forEach((key) => {
                const value = this.bookLocal[key];
                if (key === "image" && this.selectedImage) {
                    formData.append("image", this.selectedImage);
                    console.log(`Thêm ${key}:`, this.selectedImage);
                } else if (value !== undefined && value !== null && value !== "") {
                    formData.append(key, value);
                    console.log(`Thêm ${key}:`, value);
                }
            });

            console.log("Dữ liệu FormData gửi đi:", formData);
            // Gửi dữ liệu lên cha (hoặc API)
            this.$emit("submit:book", formData);
        }
    },
};
</script>
