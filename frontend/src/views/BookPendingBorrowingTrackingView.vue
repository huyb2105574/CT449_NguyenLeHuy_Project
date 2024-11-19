<template>
    <div class="container mt-3">
        <h4>Đơn Mượn Sách cần duyệt</h4>
        <BookPendingBorrowingTrackingList
            v-if="pendingTrackingsCount > 0"
            :trackings="pendingTrackings"
            v-model:activeIndex="activeIndex"
            @refresh-list="refreshList"
        />
        <p v-else>Không có đơn mượn sách.</p>
        <div class="mt-3 row justify-content-around align-items-center">
            <button class="btn btn-sm btn-primary w-auto" @click="refreshList()">
                <i class="fas fa-redo"></i> Làm mới
            </button>
        </div>
    </div>
</template>

<script>
import BookPendingBorrowingTrackingList from "@/components/BookPendingBorrowingTrackingList.vue";
import BookBorrowingTrackingService from "@/services/bookborrowingtracking.service";

export default {
    components: { BookPendingBorrowingTrackingList },
    data() {
        return {
            trackings: [],
            activeIndex: -1,
        };
    },
    computed: {
        pendingTrackings() {
            return this.trackings.filter(tracking => tracking.employee_id == "");
        },
        pendingTrackingsCount() {
            return this.pendingTrackings.length;
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
