import { createRouter, createWebHistory } from 'vue-router';
import PublisherView from '../views/PublisherView.vue';
import ReaderView from '../views/ReaderView.vue';
import EmployeeView from '../views/EmployeeView.vue';
import BookView from '../views/BookView.vue';
import BookBorrowingTrackingView from '@/views/BookBorrowingTrackingView.vue';
import { isAuthenticated } from '@/utils/auth';

const routes = [
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'), 
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
        path: '/',
        name: 'bookBorrowingTracking',
        component: BookBorrowingTrackingView
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
