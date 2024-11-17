<script>
export default {
    props: {
        publishers: { type: Array, required: true },
        activeIndex: { type: Number, required: true },
    },
    emits: ["update:activeIndex"],
};
</script>

<template>
    <ul class="list-group">
        <li
            v-for="(publisher, index) in publishers"
            :key="publisher._id"
            class="list-group-item d-flex justify-content-between align-items-center"
            :class="{ active: index === activeIndex }"
            @click="$emit('update:activeIndex', index)"
        >
            {{ publisher.name }}
            <i class="fas fa-chevron-right"></i>
        </li>
    </ul>
</template>
