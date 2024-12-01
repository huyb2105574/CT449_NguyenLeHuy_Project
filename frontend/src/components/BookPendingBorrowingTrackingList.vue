<script>
import readerService from "@/services/reader.service";
import bookService from "@/services/book.service";
import bookBorrowingTrackingService from "@/services/bookborrowingtracking.service";

export default {
    props: {
        trackings: { type: Array, required: true },
        activeIndex: { type: Number, required: true },
    },
    emits: ["update:activeIndex", "refresh-list"],
    data() {
        return {
            readers: [],
            books: [],
        };
    },
    watch: {
        trackings: {
            handler() {
                this.fetchAllData();
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        async fetchAllData() {
            this.readers = [];
            this.books = [];
            try {
                for (const tracking of this.trackings) {
                    await Promise.all([
                        this.fetchReader(tracking.reader_id),
                        this.fetchBook(tracking.book_id),
                    ]);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        },

        async fetchReader(readerId) {
            try {
                const response = await readerService.get(readerId);
                this.readers.push(response);
            } catch (error) {
                console.error("Lỗi khi lấy người mượn:", error);
            }
        },

        async fetchBook(bookId) {
            try {
                const response = await bookService.get(bookId);
                this.books.push(response);
            } catch (error) {
                console.error("Lỗi khi lấy sách:", error);
            }
        },

        async approveTracking(trackingId) {
            try {
                const employeeId = localStorage.getItem("_id");
                if (!employeeId) {
                    console.error("Không tìm thấy thông tin người dùng trong Storage.");
                    return;
                }

                const tracking = await bookBorrowingTrackingService.get(trackingId);
                

                const updatedTracking = { employee_id: employeeId };
                const book = await bookService.get(tracking.book_id);
                

                if (book.quantity <= 0) {
                    this.message = "Không đủ sách để mượn.";
                    return;
                }

                const updatedBook = { ...book, quantity: book.quantity - 1 };
                await bookService.update(tracking.book_id, updatedBook);
                const response = await bookBorrowingTrackingService.update(trackingId, updatedTracking);
                if (response) {
                    console.log("Duyệt thành công.");
                    this.$emit("refresh-list"); 
                }
            } catch (error) {
                console.error("Lỗi khi duyệt:", error);
            }
        },
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
                    <td>{{ books[index]?.title || "N/A" }}</td>
                    <td>{{ readers[index]?.name || "N/A" }}</td>
                    <td>{{ tracking.borrow_date }}</td>
                    <td>{{ tracking.return_date }}</td>
                    <td>
                        <button class="btn btn-sm btn-success" @click="approveTracking(tracking._id)">
                            Duyệt
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
