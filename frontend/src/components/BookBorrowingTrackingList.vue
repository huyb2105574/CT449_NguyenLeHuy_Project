<script>
export default {
    props: {
        trackings: { type: Array, required: true },
        activeIndex: { type: Number, required: true },
    },
    emits: ["update:activeIndex"],
};
</script>

<template>
    <ul class="list-group">
        <li
            v-for="(tracking, index) in trackings"
            :key="tracking._id"
            class="list-group-item d-flex justify-content-between align-items-center"
            :class="{ active: index === activeIndex }"
            @click="$emit('update:activeIndex', index)"
        >
            {{ tracking.book_id }} - {{ tracking.borrow_date }}
            <i class="fas fa-book-reader"></i>
        </li>
    </ul>
</template>
