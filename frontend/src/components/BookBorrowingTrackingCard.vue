<script>
export default {
    props: {
        tracking: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Mã sách:</strong>
            {{ tracking.book_id }}
        </div>
        <div class="p-1">
            <strong>Mã nhân viên:</strong>
            {{ tracking.employee_id }}
        </div>
        <div class="p-1">
            <strong>Mã độc giả:</strong>
            {{ tracking.reader_id }}
        </div>
        <div class="p-1">
            <strong>Ngày mượn:</strong>
            {{ tracking.borrow_date }}
        </div>
        <div class="p-1">
            <strong>Ngày trả:</strong>
            {{ tracking.return_date }}
        </div>
    </div>
</template>
