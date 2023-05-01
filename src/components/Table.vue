<template>
<el-table
    ref="Table"
    v-bind="$attrs"
    v-loading="loading"
    header-row-class-name="table-header"
    size="default"
    style="width: 100%;"
    :data="data"
    border
>
    <el-table-column
        v-if="indexConfig"
        type="index"
        :index="indexMethod"
        :label="indexConfig.label || '序号'"
        :width="indexConfig.width"
        :min-width="indexConfig.minWidth"
        :align="indexConfig.align"
        :show-overflow-tooltip="indexConfig.showOverflowTooltip"
        :formatter="indexConfig.formatter"
        :sortable="indexConfig.sortable || false"
    />
    <template v-for="(col, index) in columns">
    <!-- 自定义列 -->
    <slot
        v-if="'slot' in col"
        :name="col.slot"
    />
    <!-- 普通列 -->
    <el-table-column
        v-else
        :key="index"
        :resizable="col.resizable"
        :align="col.align"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth"
        :sortable="col.sortable || false"
        :show-overflow-tooltip="col.showOverflowTooltip"
        :formatter="col.formatter"
    >
        <template #default="scope">
        {{ scope.row[col.prop]
            ? (col.formatter ? col.formatter(scope.row) : scope.row[col.prop])
            : (scope.row[col.prop] === 0 ? 0 : '-') }}
        </template>
    </el-table-column>
    </template>
</el-table>
</template>
<script lang="ts" setup>
import {defineComponent, PropType, ref, watch} from 'vue'
const props = defineProps({
    loading: {
      type: Boolean,
      required: false,
    },
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    indexConfig: {
      type:Object,
      require:false,
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
})

const indexMethod = (index: number) => {
    if(props.indexConfig) {
        return (props.indexConfig.currentPage - 1) * props.indexConfig.pageRows + 1 + index
    }
}
</script>

<style lang="scss" scoped>
::v-deep(.el-scrollbar__view) {
height:100%
}
.table-header{
    background-color: aqua !important;
}
</style>
