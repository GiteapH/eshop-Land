<template>
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ dropName }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="item in actions" @click="item.click" :disabled="item.disabled" :divided="item.divided">{{item.value}}</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
  
  <script>
import { ArrowDown } from '@element-plus/icons-vue'

export default {
    props: {
        dropName: {
            type: String,
            default: ''
        },
        actions:{
            type:Object,
            default:()=>([])
        }
    },
    components: {
        ArrowDown
    }
}
</script>
  <style scoped>
  .example-showcase .el-dropdown-link {
      cursor: pointer;
      color: var(--el-color-primary);
      display: flex;
      align-items: center;
  }
  </style>
  