<template>
    <Form 
        @submit="submitBorrowingRecord" 
        :validation-schema="borrowingFormSchema" 
        ref="form"
    >
        <div class="form-group">
            <label for="book_id">Sách</label>
            <select 
                name="book_id" 
                class="form-control" 
                v-model="borrowingLocal.book_id"
            >
                <option value="">-- Chọn sách --</option>
                <option 
                    v-for="book in books" 
                    :key="book._id" 
                    :value="book._id"
                >
                    {{ book.title }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label for="reader_id">Độc giả</label>
            <select 
                name="reader_id" 
                class="form-control" 
                v-model="borrowingLocal.reader_id"
            >
                <option value="">-- Chọn độc giả --</option>
                <option 
                    v-for="reader in readers" 
                    :key="reader._id" 
                    :value="reader._id"
                >
                    {{ reader.name }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label for="employee_id">Nhân viên</label>
            <select 
                name="employee_id" 
                class="form-control" 
                v-model="borrowingLocal.employee_id"
            >
                <option value="">-- Chọn nhân viên --</option>
                <option 
                    v-for="employee in employees" 
                    :key="employee._id" 
                    :value="employee._id"
                >
                    {{ employee.name }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label for="borrow_date">Ngày mượn</label>
            <Field 
                name="borrow_date" 
                type="date" 
                class="form-control" 
                v-model="borrowingLocal.borrow_date" 
            />
            <ErrorMessage name="borrow_date" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="return_date">Ngày trả</label>
            <Field 
                name="return_date" 
                type="date" 
                class="form-control" 
                v-model="borrowingLocal.return_date" 
            />
            <ErrorMessage name="return_date" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary">
                <i class="fas fa-save"></i> Lưu
            </button>
            <button 
                v-if="borrowingLocal._id" 
                type="button" 
                class="mr-2 btn btn-danger" 
                @click="deleteBorrowingRecord"
            >
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
import BookService from "@/services/book.service";
import ReaderService from "@/services/reader.service";
import EmployeeService from "@/services/employee.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        borrowing: { type: Object, required: true },
    },
    data() {
        const borrowingFormSchema = yup.object().shape({
            borrow_date: yup
                .string()
                .required("Vui lòng chọn ngày mượn."),
            return_date: yup
                .string()
                .required("Vui lòng chọn ngày trả.")
                .test(
                    "is-after-borrow-date",
                    "Ngày trả phải sau ngày mượn.",
                    function (value) {
                        return new Date(value) > new Date(this.parent.borrow_date);
                    }
                ),
        });

        return {
            borrowingLocal: { ...this.borrowing },
            books: [],
            readers: [],
            employees: [],
            borrowingFormSchema,
        };
    },
    async created() {
        this.normalizeDates(); // Chuẩn hóa ngày tháng
        await this.fetchBooks();
        await this.fetchReaders();
        await this.fetchEmployees();
    },
    methods: {
        normalizeDates() {
            if (this.borrowingLocal.borrow_date) {
                this.borrowingLocal.borrow_date = this.formatDate(this.borrowingLocal.borrow_date);
            }
            if (this.borrowingLocal.return_date) {
                this.borrowingLocal.return_date = this.formatDate(this.borrowingLocal.return_date);
            }
        },
        formatDate(dateString) {
            const [day, month, year] = dateString.split("/");
            return `${year}-${month}-${day}`;
        },
        async fetchBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.error("Lỗi khi lấy danh sách sách:", error);
            }
        },
        async fetchReaders() {
            try {
                this.readers = await ReaderService.getAll();
            } catch (error) {
                console.error("Lỗi khi lấy danh sách độc giả:", error);
            }
        },
        async fetchEmployees() {
            try {
                this.employees = await EmployeeService.getAll();
            } catch (error) {
                console.error("Lỗi khi lấy danh sách nhân viên:", error);
            }
        },
        async submitBorrowingRecord() {
            const borrowingData = { 
                ...this.borrowingLocal, 
                borrow_date: this.reverseFormatDate(this.borrowingLocal.borrow_date),
                return_date: this.reverseFormatDate(this.borrowingLocal.return_date),
            };
            this.$emit("submit:borrowing", borrowingData);
        },
        reverseFormatDate(dateString) {
            const [year, month, day] = dateString.split("-");
            return `${day}/${month}/${year}`;
        },
        deleteBorrowingRecord() {
            this.$emit("delete:borrowing", this.borrowingLocal._id);
        },
        Cancel() {
            const reply = window.confirm("Bạn chưa lưu thay đổi! Bạn muốn thoát?");
            if (!reply) return;
            this.$router.push({ name: "bookBorrowingTracking" });
        },
    },
};
</script>

<style scoped>
.error-feedback {
    color: red;
    font-size: 0.9rem;
}
</style>
