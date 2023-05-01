<template>
<el-dialog
    v-model="dialogVisible"
    v-bind="$attrs"
    @closed="handleClose"
>
    <slot></slot>
    <template
    #footer
    >
    <div
        v-if="isHasFooter"
        class="dialog-footer"
    >
        <slot
        name="footer"
        >
        <div class="footer-content">
            <el-button @click="handleClose">
            取消
            </el-button>
            <el-button
            type="primary"
            @click="confirm"
            >
            确定
            </el-button>
        </div>
        </slot>
    </div>
    </template>
</el-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
      },
    isHasFooter: {
        type:Boolean,
        default: true
    }
})
const emit = defineEmits(['update:visible', 'cancel', 'confirm'])
const dialogVisible = computed({
    get: () => props.visible,
    set: val => emit('update:visible', val)
})
  
function handleClose() {
    dialogVisible.value = false
    emit('cancel')
}
const confirm = async () => {
    emit('confirm')
}
</script>
  
<style lang="scss" scoped>
.dialog-footer {
.footer-content {
    display: flex;
    justify-content: flex-end;
    padding: 14px 24px;
    border-top: 1px solid #dddddd;
}
}
</style>
  