import { createRouter, createWebHistory } from 'vue-router';
import PublisherView from '../views/PublisherView.vue';
import ReaderView from '../views/ReaderView.vue';
import EmployeeView from '../views/EmployeeView.vue';
import BookView from '../views/BookView.vue';
import BookBorrowingTrackingView from '@/views/BookBorrowingTrackingView.vue';

const routes = [
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
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
        path: '/employees',
        name: 'employees',
        component: EmployeeView
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

export default router;
