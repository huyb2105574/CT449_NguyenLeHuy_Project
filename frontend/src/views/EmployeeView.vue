<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh sách nhân viên
                <i class="fas fa-users"></i>
            </h4>
            <EmployeeList
                v-if="filteredEmployeesCount > 0"
                :employees="filteredEmployees"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có nhân viên nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary w-auto" @click="refreshList">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success w-auto" @click="goToAddEmployee">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger w-auto" @click="removeAllEmployees">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeEmployee">
                <h4>
                    Chi tiết nhân viên
                    <i class="fas fa-user"></i>
                </h4>
                <EmployeeCard :employee="activeEmployee" />
                <router-link
                    :to="{ name: 'employee.edit', params: { id: activeEmployee._id } }"
                >
                    <span class="mt-2 badge bg-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import EmployeeCard from "@/components/EmployeeCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import EmployeeList from "@/components/EmployeeList.vue";
import EmployeeService from "@/services/employee.service";

export default {
    components: {
        EmployeeCard,
        InputSearch,
        EmployeeList,
    },
    data() {
        return {
            employees: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        employeeStrings() {
            return this.employees.map((employee) => {
                const { name, username, position, address, phone_number } = employee;
                return [name, username, position, address, phone_number].join("");
            });
        },
        filteredEmployees() {
            if (!this.searchText) return this.employees;
            return this.employees.filter((_employee, index) =>
                this.employeeStrings[index].includes(this.searchText)
            );
        },
        activeEmployee() {
            if (this.activeIndex < 0) return null;
            return this.filteredEmployees[this.activeIndex];
        },
        filteredEmployeesCount() {
            return this.filteredEmployees.length;
        },
    },
    methods: {
        async retrieveEmployees() {
            try {
                this.employees = await EmployeeService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveEmployees();
            this.activeIndex = -1;
        },
        async removeAllEmployees() {
            if (confirm("Bạn muốn xóa tất cả nhân viên?")) {
                try {
                    await EmployeeService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddEmployee() {
            this.$router.push({ name: "employee.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
