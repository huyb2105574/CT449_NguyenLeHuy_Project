<script>
export default {
    props: {
        reader: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Họ và tên:</strong>
            {{ reader.name }}
        </div>
         <div class="p-1">
            <strong>Tên đăng nhập:</strong>
            {{ reader.username }}
        </div>
        <div class="p-1">
            <strong>Ngày sinh:</strong>
            {{ reader.birth }}
        </div>
        <div class="p-1">
            <strong>Giới tính:</strong>
            {{ reader.sex }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ reader.address }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ reader.phone_number }}
        </div>
    </div>
</template>
