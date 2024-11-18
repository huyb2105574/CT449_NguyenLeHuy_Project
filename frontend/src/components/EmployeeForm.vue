<template>
    <Form @submit="submitEmployee" :validation-schema="employeeFormSchema">
        <div class="form-group">
            <label for="name">Tên Nhân viên</label>
            <Field name="name" type="text" class="form-control" v-model="employeeLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="username">Tên đăng nhập</label>
            <Field name="username" type="text" class="form-control" v-model="employeeLocal.username" />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="employeeLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="position">Chức vụ</label>
            <Field name="position" type="text" class="form-control" v-model="employeeLocal.position" />
            <ErrorMessage name="position" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="employeeLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone_number">Số điện thoại</label>
            <Field name="phone_number" type="tel" class="form-control" v-model="employeeLocal.phone_number" />
            <ErrorMessage name="phone_number" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button v-if="employeeLocal._id" type="button" class="mr-2 btn btn-danger" @click="deleteEmployee">
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
    emits: ["submit:employee", "delete:employee"],
    props: {
        employee: { type: Object, required: true }
    },
    data() {
        const employeeFormSchema = yup.object().shape({
            name: yup.string().required("Tên không được bỏ trống.").max(50, "Tối đa 50 ký tự."),
            username: yup.string().required("Tên đăng nhập không được bỏ trống.").max(50, "Tối đa 50 ký tự."),
            password: yup.string().required("Mật khẩu không được bỏ trống.").min(8, "Tối thiểu 8 ký tự."),
            position: yup.string().max(50, "Tối đa 50 ký tự."),
            address: yup.string().max(100, "Tối đa 100 ký tự."),
            phone_number: yup
                .string()
                .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
        });

        return {
            employeeLocal: this.employee,
            employeeFormSchema,
        };
    },
    methods: {
        submitEmployee() {
            this.$emit("submit:employee", this.employeeLocal);
        },
        deleteEmployee() {
            this.$emit("delete:employee", this.employeeLocal.id);
        },
        cancel() {
            const reply = window.confirm("Bạn có chắc muốn rời khỏi mà không lưu thay đổi?");
            if (reply) {
                this.$router.push({ name: "employees" });
            }
        },
    },
};
</script>
