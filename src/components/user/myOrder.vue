<template>
    <div style="padding: 30px;padding-top: 50px;float:left;border: 1px rgba(0, 0, 0, 0.1) solid;height:400px;width:850px;margin-left: 100px;">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="待付款" name="待付款"></el-tab-pane>
            <el-tab-pane label="代发货" name="代发货"></el-tab-pane>
            <el-tab-pane label="已收货" name="已收货"></el-tab-pane>
            <el-tab-pane label="待评价" name="待评价"></el-tab-pane>
            <el-tab-pane label="已完成" name="已完成"></el-tab-pane>
        </el-tabs>
        <el-table :data="tableData" height="400" style="width: 100%;">
            <template #empty>
                <el-empty>
                    <el-button type="primary">回到首页添加您的宝贝吧</el-button>
                </el-empty>
            </template>
            <el-table-column prop="product" label="宝贝" width="180" />
            <el-table-column prop="price" label="单价" />
            <el-table-column prop="getter" label="收件人" />
            <el-table-column prop="pay" label="实付款" />
            <el-table-column prop="status" label="状态" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
                    <el-button link type="primary" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { ref, defineComponent } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { get } from '../../utils/tools'
export default defineComponent({
    data() {
        return {
            form: {
                odipass: '',
                password: '',
                checkpass: ''
            },
            activeName: '待付款',
            tableData: []
        };
    },
    methods: {
        handleClick(tab, event) {
        }
    }
})
</script>