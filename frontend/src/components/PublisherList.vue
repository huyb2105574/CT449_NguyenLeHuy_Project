<script>
export default {
    props: {
        publishers: { type: Array, required: true },
        activeIndex: { type: Number, required: true },
    },
    emits: ["update:activeIndex"],
    methods: {
        editPublisher(publisher) {
            this.$emit("edit", publisher);
        },
    },
};
</script>

<template>
    <div>
        <div v-if="publishers.length === 0" class="text-center p-3">
            Không có dữ liệu nhà xuất bản.
        </div>
        <table v-else class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th>#</th>
                    <th>Nhà xuất bản</th>
                    <th>Địa chỉ</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(publisher, index) in publishers"
                    :key="publisher._id"
                    :class="{ active: index === activeIndex }"
                    @click="$emit('update:activeIndex', index)"
                    style="cursor: pointer;">
                    <td>{{ index + 1 }}</td>
                    <td>{{ publisher.name }}</td>
                    <td>{{ publisher.address }}</td>
                    <td>
                        <router-link
                            :to="{ 
                                name: 'publisher.edit', 
                                params: { id: publisher._id } }"
                            class="btn btn-sm btn-warning me-2"
                        >
                            Hiệu chỉnh
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

