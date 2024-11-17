<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>Quản lý Mượn Sách</h4>
            <BookBorrowingTrackingList
                v-if="filteredTrackingsCount > 0"
                :trackings="filteredTrackings"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có thông tin mượn sách.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllTrackings">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6" v-if="activeTracking">
            <h4>Chi tiết Mượn Sách</h4>
            <BookBorrowingTrackingCard :tracking="activeTracking" />
        </div>
    </div>
</template>

<script>
import BookBorrowingTrackingCard from "@/components/BookBorrowingTrackingCard.vue";
import BookBorrowingTrackingList from "@/components/BookBorrowingTrackingList.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookBorrowingTrackingService from "@/services/bookborrowingtracking.service";

export default {
    components: {
        BookBorrowingTrackingCard,
        BookBorrowingTrackingList,
        InputSearch,
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
            if (!this.searchText) return this.trackings;
            return this.trackings.filter(tracking =>
                [tracking.book_id, tracking.employee_id, tracking.reader_id].some(field =>
                    field.includes(this.searchText)
                )
            );
        },
        activeTracking() {
            return this.filteredTrackings[this.activeIndex] || null;
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
