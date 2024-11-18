<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý Thư viện</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'publishers' }" class="nav-link">
                    Quản lý Nhà xuất bản
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'readers' }" class="nav-link">
                    Độc giả
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'employees' }" class="nav-link">
                    Nhân viên
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'books' }" class="nav-link">
                    Quản lý Sách
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'bookBorrowingTracking' }" class="nav-link">
                    Theo dõi mượn sách
                </router-link>
            </li>
        </div>
    </nav>
</template>
