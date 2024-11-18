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
            const response = await EmployeeService.login(this.username, this.password);
            if (response && response.data.token) {
            localStorage.setItem('authToken', response.data.token); 
            localStorage.setItem('name', response.data.employee.name);  
            this.$router.push('/');  
            } else {
            this.errorMessage = 'Đăng nhập thất bại';
            }
        } catch (error) {
            this.errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
        }
    }


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
