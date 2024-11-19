<script>
import readerService from '@/services/reader.service';
import employeeService from '@/services/employee.service';
import bookService from '@/services/book.service';

export default {
    props: {
        trackings: { type: Array, required: true },
        activeIndex: { type: Number, required: true },
    },
    emits: ["update:activeIndex", "refresh-list"],
    data() {
        return {
            readers: [],  
            employees: [], 
            books: [],
        };
    },
    mounted() {
        this.fetchAllData();  
    },
    methods: {
        async fetchAllData() {
            try {
                for (const tracking of this.trackings) {
                    await this.fetchReader(tracking.reader_id);
                    await this.fetchEmployee(tracking.employee_id);
                    await this.fetchBook(tracking.book_id);
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        },

        async fetchReader(readerId) {
            try {
                const response = await readerService.get(readerId);  
                this.readers.push(response);  
            } catch (error) {
                console.error('Lỗi khi lấy người mượn:', error);
            }
        },
        
        async fetchEmployee(employeeId) {
            try {
                const response = await employeeService.get(employeeId);  
                this.employees.push(response);  
            } catch (error) {
                console.error('Lỗi khi lấy nhân viên:', error);
            }
        },

        async fetchBook(bookId) {
            try {
                const response = await bookService.get(bookId); 
                this.books.push(response);  
            } catch (error) {
                console.error('Lỗi khi lấy sách:', error);
            }
        },
        async refreshList() {
            await this.fetchAllData();
            this.activeIndex = -1;
        }
    },
};
</script>

<template>
    <div class="container mt-3">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên Sách</th>
                    <th>Người Mượn</th>
                    <th>Tên Nhân viên</th>
                    <th>Ngày Mượn</th>
                    <th>Ngày Trả</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(tracking, index) in trackings"
                    :key="tracking._id"
                    :class="{ active: index === activeIndex }"
                    @click="$emit('update:activeIndex', index)"
                >
                    <td>{{ index + 1 }}</td>
                    <td v-if="books[index]">{{ books[index].title }}</td>
                    <td v-if="readers[index]">{{ readers[index].name }}</td>
                    <td v-if="employees[index]">{{ employees[index].name }}</td>
                    <td>{{ tracking.borrow_date }}</td>
                    <td>{{ tracking.return_date }}</td>
                    <td>
                        <router-link
                            :to="{ 
                                name: 'bookborrowingtracking.edit', 
                                params: { id: tracking._id } }"
                            class="btn btn-sm btn-warning me-2"
                        >
                            Hiệu chỉnh
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
