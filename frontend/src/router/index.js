import { createRouter, createWebHistory } from 'vue-router';
import PublisherView from '../views/PublisherView.vue';
import ReaderView from '../views/ReaderView.vue';
import EmployeeView from '../views/EmployeeView.vue';
import BookView from '../views/BookView.vue';
import BookBorrowingTrackingView from '@/views/BookBorrowingTrackingView.vue';
import BookForReader from '@/views/BookForReader.vue';
import HistoryBorrowing from '@/views/HistoryBorrowing.vue';
import BookPendingBorrowingTrackingView from '@/views/BookPendingBorrowingTrackingView.vue';
import AccountInfo from '@/views/AccountInfo.vue';

import { isAuthenticated } from '@/utils/auth';

const routes = [
    
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'), 
    },
    {
        path: '/login/reader',
        name: 'loginreader',
        component: () => import('@/views/LoginForReader.vue'), 
    },
    {
        path: '/publishers',
        name: 'publishers',
        component: PublisherView
    },
    {
        path: "/publishers/edit/:id",
        name: "publisher.edit",
        component: () => import("@/views/PublisherEdit.vue"),
        props: true,
    },
    {
        path: "/publishers/add",
        name: "publisher.add",
        component: () => import("@/views/PublisherAdd.vue"),
        props: true,
    },
    {
        path: '/readers',
        name: 'readers',
        component: ReaderView
    },
    {
        path: "/readers/edit/:id",
        name: "reader.edit",
        component: () => import("@/views/ReaderEdit.vue"),
        props: true,
    },
    {
        path: "/readers/add",
        name: "reader.add",
        component: () => import("@/views/ReaderAdd.vue"),
        props: true,
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
        props: true,
    },
    {
        path: '/employees',
        name: 'employees',
        component: EmployeeView
    },
    {
        path: "/employees/edit/:id",
        name: "employee.edit",
        component: () => import("@/views/EmployeeEdit.vue"),
        props: true,
    },
    {
        path: "/employees/add",
        name: "employee.add",
        component: () => import("@/views/EmployeeAdd.vue"),
        props: true,
    },
    {
        path: '/books',
        name: 'books',
        component: BookView
    },
    {
        path: "/books/edit/:id",
        name: "book.edit",
        component: () => import("@/views/BookEdit.vue"),
        props: true,
    },
    {
        path: "/books/add",
        name: "book.add",
        component: () => import("@/views/BookAdd.vue"),
        props: true,
    },
    {
        path: '/book-borrow-tracking',
        name: 'bookBorrowingTracking',
        component: BookBorrowingTrackingView
    },
    {
        path: '/book-pending-borrow-tracking',
        name: 'bookPendingBorrowingTracking',
        component: BookPendingBorrowingTrackingView
    },
    {
        path: "/book-borrow-tracking/edit/:id",
        name: "bookborrowingtracking.edit",
        component: () => import("@/views/BookBorrowingTrackingEdit.vue"),
        props: true,
    },
    {
        path: "/book-borrow-tracking/add",
        name: "bookborrowingtracking.add",
        component: () => import("@/views/BookBorrowingTrackingAdd.vue"),
        props: true,
    },
    {
        path: '/',
        name: 'home',
        component: BookForReader
    },
    {
        path: '/bookforreader',
        name: 'bookforreader',
        component: BookForReader
    },
    {
        path: '/historyborrowing',
        name: 'historyBorrowing',
        component: HistoryBorrowing
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: '/info',
        name: 'info',
        component: AccountInfo
    },
    {
        path: '/editinfo/:id',
        name: 'editinfo',
        component: () => import("@/views/EditAccountInfo.vue"),
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');  
  } else {
    next();  
  }
});

export default router;
