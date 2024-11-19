<script>
import publisherService from '@/services/publisher.service';

export default {
    props: {
        book: { type: Object, required: true },
    },
    data() {
        return {
            publisher: null, 
        };
    },
    mounted() {
        this.fetchPublisher();  
    },
    methods: {

        async fetchPublisher() {
            try {
                const response = await publisherService.get(this.book.publisher_id); 
                this.publisher = response; 
            } catch (error) {
                console.error('Lỗi khi lấy nhà xuất bản:', error);
                this.publisher = null;
            }
        },
    },
};
</script>

<template>
    <div class="container mt-3">
        <div class="row align-items-start">
            <div class="col-md-4">
                <div class="p-1">
                    <img :src="'http://localhost:3000' + book.image" alt="Book Image" class="img-fluid rounded shadow" />
                </div>
            </div>
            <div class="col-md-8">
                <div class="p-1">
                    <strong>Tựa sách:</strong>
                    {{ book.title }}
                </div>
                <div class="p-1">
                    <strong>Tác giả:</strong>
                    {{ book.author }}
                </div>
                <div class="p-1">
                    <strong>Giá:</strong>
                    {{ book.price }} VNĐ
                </div>
                <div class="p-1">
                    <strong>Số lượng:</strong>
                    {{ book.quantity }}
                </div>
                <div class="p-1">
                    <strong>Năm xuất bản:</strong>
                    {{ book.publish_year }}
                </div>
                <div class="p-1" v-if="publisher">
                    <strong>Nhà xuất bản:</strong>
                    {{ publisher.name }}
                </div>
            </div>
        </div>
    </div>
</template>

