<script>
import readerService from '@/services/reader.service';
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
                    <th>Ngày Mượn</th>
                    <th>Ngày Trả</th>
                    <th>Trạng Thái</th>
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
                    <td>{{ tracking.borrow_date }}</td>
                    <td>{{ tracking.return_date }}</td>
                    <td>
                        <span 
                            class="badge"
                            :class="tracking.employee_id ? 'badge-success' : 'badge-danger'"
                        >
                            {{ tracking.employee_id ? 'Đã duyệt' : 'Chưa duyệt' }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.badge-success {
    background-color: #28a745;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
}

.badge-danger {
    background-color: #dc3545;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
}
</style>

