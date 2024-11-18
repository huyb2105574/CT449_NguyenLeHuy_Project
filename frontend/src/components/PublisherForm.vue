<template>
    <Form @submit="submitPublisher" :validation-schema="publisherFormSchema">
        <div class="form-group">
            <label for="name">Tên Nhà xuất bản</label>
            <Field name="name" type="text" class="form-control" v-model="publisherLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="publisherLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button v-if="publisherLocal._id" type="button" class="mr-2 btn btn-danger" @click="deletePublisher">
                <i class="fas fa-trash-alt"></i> Xóa
            </button>
            <button type="button" class="mr-2 btn btn-danger" @click="cancel">
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
    emits: ["submit:publisher", "delete:publisher"],
    props: {
        publisher: { type: Object, required: true }
    },
    data() {
        const publisherFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên Nhà xuất bản không được bỏ trống.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
        });

        return {
            publisherLocal: this.publisher,
            publisherFormSchema,
        };
    },
    methods: {
        submitPublisher() {
            this.$emit("submit:publisher", this.publisherLocal);
        },
        deletePublisher() {
            this.$emit("delete:publisher", this.publisherLocal.id);
        },
        cancel() {
            const reply = window.confirm("Bạn có chắc muốn rời khỏi mà không lưu thay đổi?");
            if (reply) {
                this.$router.push({ name: "publishers" });
            }
        },
    },
};
</script>


