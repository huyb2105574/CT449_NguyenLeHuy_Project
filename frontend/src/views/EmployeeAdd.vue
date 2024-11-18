<template>
    <div class="page">
        <h4>Thêm Nhân Viên</h4>
        <EmployeeForm :employee="employee" @submit:employee="addEmployee" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import EmployeeForm from "@/components/EmployeeForm.vue";
import EmployeeService from "@/services/employee.service";

export default {
    components: {
        EmployeeForm,
    },
    data() {
        return {
            employee: {
                name: "",
                username: "",
                password: "",
                position: "",
                address: "",
                phone_number: "",
            },
            message: "",
        };
    },
    methods: {
        async addEmployee(data) {
            try {
                await EmployeeService.create(data);
                alert("Nhân viên đã được thêm thành công.");
                this.$router.push({ name: "employees" });
            } catch (error) {
                console.error("Lỗi khi thêm nhân viên:", error.response || error);
                this.message = "Không thể thêm nhân viên. Vui lòng thử lại.";
            }
        },
    },
};
</script>
