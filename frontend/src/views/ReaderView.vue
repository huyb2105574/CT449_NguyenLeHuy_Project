<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh sách độc giả
                <i class="fas fa-book-reader"></i>
            </h4>
            <ReaderList
                v-if="filteredReadersCount > 0"
                :readers="filteredReaders"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có độc giả nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary w-auto" @click="refreshList">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success w-auto" @click="goToAddReader">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger w-auto" @click="removeAllReaders">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeReader">
                <h4>
                    Chi tiết độc giả
                    <i class="fas fa-id-card"></i>
                </h4>
                <ReaderCard :reader="activeReader" />
                <router-link
                    :to="{ name: 'reader.edit', params: { id: activeReader._id } }"
                >
                    <span class="mt-2 badge bg-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import ReaderCard from "@/components/ReaderCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ReaderList from "@/components/ReaderList.vue";
import ReaderService from "@/services/reader.service";

export default {
    components: {
        ReaderCard,
        InputSearch,
        ReaderList,
    },
    data() {
        return {
            readers: [],
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
        readerStrings() {
            return this.readers.map((reader) => {
                const { name, birth, sex, address, phone_number } = reader;
                return [name, birth, sex, address, phone_number].join("");
            });
        },
        filteredReaders() {
            if (!this.searchText) return this.readers;
            return this.readers.filter((_reader, index) =>
                this.readerStrings[index].includes(this.searchText)
            );
        },
        activeReader() {
            if (this.activeIndex < 0) return null;
            return this.filteredReaders[this.activeIndex];
        },
        filteredReadersCount() {
            return this.filteredReaders.length;
        },
    },
    methods: {
        async retrieveReaders() {
            try {
                this.readers = await ReaderService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveReaders();
            this.activeIndex = -1;
        },
        async removeAllReaders() {
            if (confirm("Bạn muốn xóa tất cả độc giả?")) {
                try {
                    await ReaderService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddReader() {
            this.$router.push({ name: "reader.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
