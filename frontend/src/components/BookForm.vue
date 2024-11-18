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
        </div>
        <div class="form-group">
            <label for="image">Hình ảnh minh họa</label>
            <input 
                type="file" 
                name="image" 
                class="form-control-file" 
                @change="onImageSelected" 
            />
            <div v-if="previewImage" class="mt-2">
                <p><strong>Hình ảnh xem trước:</strong></p>
                <img 
                    :src="previewImage" 
                    alt="Hình ảnh minh họa" 
                    style="max-width: 100%; max-height: 200px; object-fit: contain;" 
                />
            </div>
        </div>


        <div class="form-group">
            <button class="btn btn-primary">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button v-if="bookLocal._id" type="button" class="mr-2 btn btn-danger" @click="deleteBook">
                <i class="fas fa-trash-alt"></i> Xóa
            </button>
            <button type="button" class="mr-2 btn btn-danger" @click="Cancel">
                <i class="fas fa-times"></i> Thoát
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
            previewImage: this.book.image 
                ? `http://localhost:3000${this.book.image}` //
                : null,
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
                this.previewImage = URL.createObjectURL(file);  
            }
        },
        async submitBook() {
            const bookData = { ...this.bookLocal };
                if (!this.selectedImage) {
                    bookData.image = this.book.image;
                } else {
                    bookData.image = this.selectedImage;
                }
            this.$emit("submit:book", bookData);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
        },
        Cancel(){
            const reply = window.confirm('Bạn chưa lưu thay đổi! Bạn muốn thoát?')

            if (!reply) {
                return false
            }
            else this.$router.push({ name: "books" });
        }
    },
};
</script>
