<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý Thư viện</a>
    <div class="mr-auto navbar-nav">
      <template v-if="role == 'employee'">
        <li class="nav-item">
          <router-link :to="{ name: 'publishers' }" class="nav-link">Quản lý Nhà xuất bản</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'readers' }" class="nav-link">Quản lý Độc giả</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'employees' }" class="nav-link">Quản lý Nhân viên</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'books' }" class="nav-link">Quản lý Sách</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'bookBorrowingTracking' }" class="nav-link">Quản lý Mượn sách</router-link>
        </li>
      </template>
      <template v-else-if="role == 'reader'">
        <li class="nav-item">
          <router-link :to="{ name: 'bookforreader' }" class="nav-link">Danh sách Sách</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'historyBorrowing' }" class="nav-link">Lịch sử Mượn sách</router-link>
        </li>
      </template>
    </div>

    <div class="d-flex flex-column align-items-center text-white">
      <span>
        <span v-if="name">Chào, {{ name }}</span>
        <br />
        <span @click="logout" class="cursor-pointer text-light logout">Thoát</span>
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    name() {
      return localStorage.getItem('name') || '';
    },
    role() {
      return localStorage.getItem('role') || '';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.navbar-text {
  font-size: 1rem;
  font-weight: bold;
}
</style>
