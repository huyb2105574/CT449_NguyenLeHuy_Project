<script>
export default {
    props: {
        books: { type: Array, required: true },
        activeIndex: { type: Number, required: true },
    },
    emits: ["update:activeIndex"],
};
</script>

<template>
    <table class="table table-hover">
        <thead class="thead-light">
            <tr>
                <th>#</th>
                <th>Tiêu đề</th>
                <th>Tác giả</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(book, index) in books"
                :key="book._id"
                :class="{ 'table-active': index === activeIndex }"
                @click="$emit('update:activeIndex', index)"
                style="cursor: pointer;"
            >
                <td>{{ index + 1 }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.quantity }}</td>
                <td>{{ book.price }} VND</td>
                <td><i class="fas fa-chevron-right"></i></td>
            </tr>
        </tbody>
    </table>
</template>
