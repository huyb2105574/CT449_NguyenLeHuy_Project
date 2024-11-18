<template>
  <div class="login container">
    <h2 class="text-center mb-4">Đăng nhập</h2>
    <form @submit.prevent="handleLogin" class="form-signin">
      <div class="mb-3">
        <label for="username" class="form-label">Tên đăng nhập:</label>
        <input type="text" id="username" class="form-control" v-model="username" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mật khẩu:</label>
        <input type="password" id="password" class="form-control" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
      <p v-if="errorMessage" class="error text-center mt-3">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import EmployeeService from "@/services/employee.service";
import ReaderService from "@/services/reader.service";

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
          localStorage.setItem('_id', employeeResponse.data.employee.id); 
          console.log(employeeResponse.data.employee.id);
          this.$router.push('/'); 
          return; 
        }

        const readerResponse = await ReaderService.login(this.username, this.password);
        if (readerResponse && readerResponse.data.token) {
          localStorage.setItem('authToken', readerResponse.data.token);
          localStorage.setItem('name', readerResponse.data.reader.name);
          localStorage.setItem('_id', readerResponse.data.reader.id); 
          this.$router.push('/'); 
          return; 
        }

        this.errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.';
      } catch (error) {
        this.errorMessage = 'Đăng nhập thất bại. Đã xảy ra lỗi trong hệ thống.';
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
/* Trang trí giao diện với Bootstrap */
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
