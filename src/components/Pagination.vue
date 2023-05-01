<template>
    <div class="pagination-wrapper">
        <el-pagination
            v-model:currentPage="page"
            v-model:page-size="size"
            :background="true"
            :page-sizes="[20, 50, 100]"
            :small="false"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
        <div class="slot-wrap">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import {defineComponent, ref, watch} from 'vue'
const props = defineProps({
    currentPage:Number,
    pageSize: Number,
    total: Number,
})

const emit = defineEmits(['onSizeChange', 'onCurrentChange'])
const page = ref(props.currentPage)
const size = ref(props.pageSize)
watch(() => props.currentPage, (newVal, oldVal) => {
    page.value = newVal
})
watch(() => props.pageSize, (newVal, oldVal) => {
    size.value = newVal
})
const handleSizeChange = (val) => {
    emit('onSizeChange', val)
}
const handleCurrentChange = (val) => {
    emit('onCurrentChange', val)
}
</script>
  
<style lang="scss" scoped>
.pagination-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
}
.el-pagination.is-background ::v-deep(.el-pager) li {
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
}

.el-pagination.is-background ::v-deep(.btn-next) {
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
}

.el-pagination.is-background ::v-deep(.btn-prev) {
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
}

.el-pagination.is-background  ::v-deep(.btn-prev .el-icon) {
    font-size: 15px;
}

.el-pagination.is-background  ::v-deep(.btn-next .el-icon) {
    font-size: 15px;
}

.el-pagination.is-background  ::v-deep(.btn-prev:disabled .el-icon) {
    color: var(--el-text-color-placeholder);
}

.el-pagination.is-background  ::v-deep(.btn-next:disabled .el-icon) {
    color: var(--el-text-color-placeholder);
}
</style>
