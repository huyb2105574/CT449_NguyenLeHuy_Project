<script>
export default {
    props: {
        readers: { type: Array, required: true },
        activeIndex: { type: Number, required: true },
    },
    emits: ["update:activeIndex"],
};
</script>

<template>
    <ul class="list-group">
        <li
            v-for="(reader, index) in readers"
            :key="reader._id"
            class="list-group-item d-flex justify-content-between align-items-center"
            :class="{ active: index === activeIndex }"
            @click="$emit('update:activeIndex', index)"
        >
            {{ reader.name }}
            <i class="fas fa-chevron-right"></i>
        </li>
    </ul>
</template>
