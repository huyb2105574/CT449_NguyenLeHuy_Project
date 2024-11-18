<template>
    <div v-if="employee" class="page">
        <h4>Hiệu chỉnh Nhân viên</h4>
        <EmployeeForm 
            :employee="employee" 
            @submit:employee="updateEmployee"
            @delete:employee="deleteEmployee" 
        />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            employee: null,
            message: "",
        };
    },
    methods: {
        async getEmployee(id) {
            try {
                this.employee = await EmployeeService.get(id);
            } catch (error) {
                console.error(error);
                this.$router.push({
                    name: "notfound",
                    params: { pathMatch: this.$route.path.split("/").slice(1) },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateEmployee(data) {
            try {
                await EmployeeService.update(this.employee._id, data);
                alert('Nhân viên được cập nhật thành công.');
                this.$router.push({ name: "employees" });
            } catch (error) {
                console.error(error);
            }
        },
        async deleteEmployee() {
            if (confirm("Bạn muốn xóa Nhân viên này?")) {
                try {
                    await EmployeeService.delete(this.employee._id);
                    this.$router.push({ name: "employees" });
                } catch (error) {
                    console.error(error);
                }
            }
        },
    },
    created() {
        this.getEmployee(this.id);
        this.message = "";
    },
};
</script>
