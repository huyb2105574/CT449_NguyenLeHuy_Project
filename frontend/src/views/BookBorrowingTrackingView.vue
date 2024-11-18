<template>
    <div class="page row">
        <div class="mt-3 col-md-10">
            <h4>Lịch sữ Mượn Sách</h4>
            <BookBorrowingTrackingList
                v-if="filteredTrackingsCount > 0"
                :trackings="filteredTrackings"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có thông tin mượn sách.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary w-auto" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success w-auto" @click="goToAddBookBorrowingTracking">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger w-auto" @click="removeAllTrackings">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-10">
            <h4>Đơn Mượn Sách cần duyệt</h4>
            <BookPendingBorrowingTrackingList
                v-if="pendingTrackingsCount > 0"
                :trackings="pendingTrackings"
                v-model:activeIndex="activeIndex"
                @refresh-list="refreshList"
            />
            <p v-else>Không có đơn mượn sách.</p>
        </div>
    </div>
</template>

<script>
import BookPendingBorrowingTrackingList from "@/components/BookPendingBorrowingTrackingList.vue";
import BookBorrowingTrackingList from "@/components/BookBorrowingTrackingList.vue";
import BookBorrowingTrackingService from "@/services/bookborrowingtracking.service";

export default {
    components: {
        BookPendingBorrowingTrackingList,
        BookBorrowingTrackingList,
    },
    data() {
        return {
            trackings: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    computed: {
        
    
        filteredTrackings() {
            return this.trackings.filter(tracking => tracking.employee_id != "");
        },
       
        pendingTrackings() {
            return this.trackings.filter(tracking => tracking.employee_id == "");
        },

        activeTracking() {
            return this.filteredTrackings[this.activeIndex] || null;
        },

        filteredTrackingsCount() {
            return this.filteredTrackings.length;
        },
    
        pendingTrackingsCount() {
            return this.pendingTrackings.length;
        },
    },
    methods: {
        async retrieveTrackings() {
            try {
                this.trackings = await BookBorrowingTrackingService.getAll();
                console.log(this.trackings);
            } catch (error) {
                console.error(error);
            }
        },
        goToAddBookBorrowingTracking() {
            this.$router.push({ name: "bookborrowingtracking.add" });
        },
        refreshList() {
            this.retrieveTrackings();
            this.activeIndex = -1;
        },
        async removeAllTrackings() {
            if (confirm("Bạn muốn xóa tất cả thông tin mượn sách?")) {
                try {
                    await BookBorrowingTrackingService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.error(error);
                }
            }
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
