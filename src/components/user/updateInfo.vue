<template>
    <div
        style="padding: 30px;padding-top: 50px;float:left;border: 1px rgba(0, 0, 0, 0.1) solid;height:400px;width:850px;margin-left: 100px;">
        <el-row style="margin-bottom:30px">
            <el-col :span="4">
                <p style="color:grey">昵称:</p>
            </el-col>
            <el-col :span="4">
                <p style="">helloworld</p>
            </el-col>
        </el-row>
        <el-row style="margin-bottom:30px">
            <el-col :span="4">
                <p style="color:grey">手机号:</p>
            </el-col>
            <el-col :span="4">
                <p style="">18601590125</p>
            </el-col>
            <el-col :span="4">
                <a style="color:orange;text-decoration: underline;">修改:</a>
            </el-col>
        </el-row>
        <el-row style="margin-bottom:30px">
            <el-col :span="4">
                <p style="color:grey">账号余额</p>
            </el-col>
            <el-col :span="4">
                <p style="">￥0</p>
            </el-col>
        </el-row>
        <el-row style="margin-bottom:30px">
            <el-col :span="4">
                <p style="color:grey">旧密码</p>
            </el-col>
            <el-col :span="6">
                <el-input v-model="form.odipass" placeholder="请输入旧密码" />
            </el-col>
        </el-row>
        <el-row style="margin-bottom:30px">
            <el-col :span="4">
                <p style="color:grey">新密码</p>
            </el-col>
            <el-col :span="6">
                <el-input v-model="form.password" placeholder="请输入新密码" />
            </el-col>
        </el-row>
        <el-row style="margin-bottom:30px">
            <el-col :span="4">
                <p style="color:grey">重复密码</p>
            </el-col>
            <el-col :span="6">
                <el-input v-model="form.checkpass" placeholder="请确保与新密码输入一致" />
            </el-col>
        </el-row>
        <el-row style="top:30px">
            <el-col :span="8" style="text-align:center">
                <el-button type="warning">修改密码</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { ref, defineComponent } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { get } from '../../utils/tools'
export default defineComponent({
    data() {
        return {
            form:{
                odipass:'',
                password:'',
                checkpass:''
            }
        };
    },
})
</script>