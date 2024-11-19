<template>
    <div class="page row">
        <div class="mt-3 col-md-12">
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary w-auto" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
            </div>
            <h4>Lịch sữ mượn sách</h4>
            <HistoryBorrowingTrackingList
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
import BookBorrowingTrackingService from "@/services/bookborrowingtracking.service";
import HistoryBorrowingTrackingList from "@/components/HistoryBorrowingTrackingList.vue";
export default {
    components: {
        HistoryBorrowingTrackingList,
    },
    data() {
        return {
            trackings: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    computed: {
        pendingTrackings() {
            return this.trackings.filter(tracking => (tracking.reader_id == localStorage.getItem('_id')));
        },

        activeTracking() {
            return this.filteredTrackings[this.activeIndex] || null;
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
