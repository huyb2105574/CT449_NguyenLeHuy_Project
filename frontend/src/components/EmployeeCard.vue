<script>
export default {
    props: {
        employee: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Họ và tên:</strong>
            {{ employee.name }}
        </div>
        <div class="p-1">
            <strong>Tên đăng nhập:</strong>
            {{ employee.username }}
        </div>
        <div class="p-1">
            <strong>Chức vụ:</strong>
            {{ employee.position }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ employee.address }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ employee.phone_number }}
        </div>
    </div>
</template>
