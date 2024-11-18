<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Nhà xuất bản
                <i class="fas fa-book"></i>
            </h4>
            <PublisherList
                v-if="filteredPublishersCount > 0"
                :publishers="filteredPublishers"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có nhà xuất bản nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary w-auto" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success w-auto" @click="goToAddPublisher">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button
                    class="btn btn-sm btn-danger w-auto"
                    @click="removeAllPublishers"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import InputSearch from "@/components/InputSearch.vue";
import PublisherList from "@/components/PublisherList.vue";
import PublisherService from "@/services/publisher.service";

export default {
    components: {
        InputSearch,
        PublisherList,
    },
    data() {
        return {
            publishers: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        publisherStrings() {
            return this.publishers.map((publisher) => {
                const { name, address } = publisher;
                return [name, address].join("");
            });
        },
        filteredPublishers() {
            if (!this.searchText) return this.publishers;
            return this.publishers.filter((_publisher, index) =>
                this.publisherStrings[index].includes(this.searchText)
            );
        },
        activePublisher() {
            if (this.activeIndex < 0) return null;
            return this.filteredPublishers[this.activeIndex];
        },
        filteredPublishersCount() {
            return this.filteredPublishers.length;
        },
    },
    methods: {
        async retrievePublishers() {
            try {
                this.publishers = await PublisherService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievePublishers();
            this.activeIndex = -1;
        },
        async removeAllPublishers() {
            if (confirm("Bạn muốn xóa tất cả nhà xuất bản?")) {
                try {
                    await PublisherService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddPublisher() {
            this.$router.push({ name: "publisher.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
