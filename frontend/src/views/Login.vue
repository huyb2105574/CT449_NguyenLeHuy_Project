<template>
  <div class="login">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Tên đăng nhập:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Mật khẩu:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Đăng nhập</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import EmployeeService from "@/services/employee.service";
import readerService from "@/services/reader.service";

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  

  methods: {
    async handleLogin() {
        try {
        const employeeResponse = await EmployeeService.login(this.username, this.password);
        if (employeeResponse && employeeResponse.data.token) {
            localStorage.setItem('authToken', employeeResponse.data.token);
            localStorage.setItem('name', employeeResponse.data.employee.name);
            this.$router.push('/'); 
            return; 
        }

        const readerResponse = await ReaderService.login(this.username, this.password);
        if (readerResponse && readerResponse.data.token) {
            localStorage.setItem('authToken', readerResponse.data.token);
            localStorage.setItem('name', readerResponse.data.reader.name);
            this.$router.push('/'); 
            return; 
        }


        this.errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.';
        } catch (error) {
        this.errorMessage = 'Đăng nhập thất bại. Đã xảy ra lỗi trong hệ thống.';
        console.error(error);
        }
    },
    }

};
</script>

<style scoped>
/* Thêm CSS nếu cần */
.login {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.error {
  color: red;
  font-size: 0.9rem;
}
</style>
