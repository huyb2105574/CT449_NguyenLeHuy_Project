<template>
    <div class="container mt-3">
        <h4>Lịch sử Mượn Sách</h4>
        <BookBorrowingTrackingList
            v-if="filteredTrackingsCount > 0"
            :trackings="filteredTrackings"
            v-model:activeIndex="activeIndex"
            @refresh-list="refreshList"
        />
        <p v-else>Không có thông tin mượn sách.</p>
        <div class="mt-3 row justify-content-around align-items-center">
            <button class="btn btn-sm btn-primary w-auto" @click="refreshList()">
                <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success w-auto" @click="goToAddBookBorrowingTracking">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
        </div>
    </div>
</template>

<script>
import BookBorrowingTrackingList from "@/components/BookBorrowingTrackingList.vue";
import BookBorrowingTrackingService from "@/services/bookborrowingtracking.service";

export default {
    components: { BookBorrowingTrackingList },
    data() {
        return {
            trackings: [],
            activeIndex: -1,
        };
    },
    computed: {
        filteredTrackings() {
            return this.trackings.filter(tracking => tracking.employee_id != "");
        },
        filteredTrackingsCount() {
            return this.filteredTrackings.length;
        },
    },
    methods: {
        async retrieveTrackings() {
            try {
                this.trackings = await BookBorrowingTrackingService.getAll();
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
    },
    mounted() {
        this.refreshList();
    },
};
</script>
