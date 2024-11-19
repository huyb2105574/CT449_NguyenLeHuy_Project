<template>
    <Form @submit="submitReader" :validation-schema="readerFormSchema">
        <div class="form-group">
            <label for="name">Tên Độc giả</label>
            <Field name="name" type="text" class="form-control" v-model="readerLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="username">Tên đăng nhập</label>
            <Field name="username" type="text" class="form-control" v-model="readerLocal.username" />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="readerLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="birth">Ngày sinh</label>
            <Field name="birth" type="date" class="form-control" v-model="readerLocal.birth" />
            <ErrorMessage name="birth" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="sex">Giới tính</label>
            <Field as="select" name="sex" class="form-control" v-model="readerLocal.sex">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </Field>
            <ErrorMessage name="sex" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="readerLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone_number">Số điện thoại</label>
            <Field name="phone_number" type="tel" class="form-control" v-model="readerLocal.phone_number" />
            <ErrorMessage name="phone_number" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button type="button" class="mr-2 btn btn-danger" @click="cancel">
                <i class="fas fa-times"></i> Quay về trang thông tin
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
    emits: ["submit:reader"],
    props: {
        reader: { type: Object, required: true },
    },
    data() {
        const readerFormSchema = yup.object().shape({
            name: yup.string().required("Tên không được bỏ trống.").max(50, "Tối đa 50 ký tự."),
            username: yup.string().required("Tên đăng nhập không được bỏ trống.").max(50, "Tối đa 50 ký tự."),
            password: yup.string().required("Mật khẩu không được bỏ trống.").min(8, "Tối thiểu 8 ký tự."),
            birth: yup.date().required("Ngày sinh không được bỏ trống."),
            sex: yup.string().required("Giới tính không được bỏ trống."),
            address: yup.string().max(100, "Tối đa 100 ký tự."),
            phone_number: yup
                .string()
                .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
        });

        return {
            readerLocal: this.reader,
            readerFormSchema,
        };
    },
    methods: {
        submitReader() {
            this.$emit("submit:reader", this.readerLocal);
        },
        
        cancel() {  
            const reply = window.confirm("Bạn có chắc muốn rời khỏi mà không lưu thay đổi?");
            if (reply) {
                this.$router.push({ name: "info" });
            }
        },
    },
};
</script>
