<template>
    <div style="z-index: 5;position:fixed;width: 100%;height:100%;" v-show="addNew">
        <div class="shadow" 
            style="border: solid 1px ghostwhite;margin-left:15%;width: 500px;height:400px;background-color:white;border-radius: 6px;">
            <h3>新建收货地址</h3>
            <div style="background-color:rgba(0, 0, 0, 0.1);padding: 30px;margin-top: 15px;">
                <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm"
                    :size="formSize" status-icon>
                    <el-form-item label="收货地区" prop="name">
                        <div class="example-block">
                            <el-cascader placeholder="Try searchingL Guide" :options="options" filterable />
                        </div>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="region">
                        <el-input v-model="form.tinyAdd" type="textarea" />
                    </el-form-item>
                    <el-form-item label="收货人姓名" prop="count">
                        <el-input v-model="form.getter" />
                    </el-form-item>
                    <el-form-item label="手机号码" prop="desc">
                        <el-input v-model="form.phone" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
                        <el-button @click="cancel()">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
    <div
        style="padding: 30px;padding-top: 50px;float:left;border: 1px rgba(0, 0, 0, 0.1) solid;height:400px;width:850px;margin-left: 100px;">
        <el-button type="warning" plain  @click="onaddNew">新增收货地址</el-button>
        <div style="width:1100px;margin-top: 25px;">
            <div style="width:400px;height: 250px;border: 2px rgba(0, 0, 0, 0.3) solid;">
                <p style="text-align:right;;margin-right: 15px;margin-top: 15px;">设置为默认地址
                    <el-switch v-model="defaultAdd" />
                </p>
                <el-row style="margin-bottom:20px;margin-left: 15px;">
                    <el-col :span="6">
                        <p style="color:grey">收件人:</p>
                    </el-col>
                    <el-col :span="6">
                        <p style="">helloworld</p>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:20px;margin-left: 15px;">
                    <el-col :span="6">
                        <p style="color:grey">所在地区:</p>
                    </el-col>
                    <el-col :span="6">
                        <p style="">helloworld</p>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:20px;margin-left: 15px">
                    <el-col :span="6">
                        <p style="color:grey">详细地址:</p>
                    </el-col>
                    <el-col :span="8">
                        <p style="">helloworld</p>
                    </el-col>
                </el-row>
                <el-row style="margin-bottom:20px;margin-left: 15px">
                    <el-col :span="6">
                        <p style="color:grey">手机号:</p>
                    </el-col>
                    <el-col :span="6">
                        <p style="">helloworld</p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11.5">
                        <el-button size="large" style="width:200px">删除</el-button>
                    </el-col>
                    <el-col :span="11.5">
                        <el-button type="warning" plain size="large" style="width:200px;">修改</el-button>
                        <!-- background: linear-gradient(-45deg, transparent 15px, #fdf6ec 0),linear-gradient(90deg, transparent 25px, orange 0); -->
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, defineComponent } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { get } from '../../utils/tools'
import options from '../../utils/divilder'
export default defineComponent({
    data() {
        return {
            addNew:false,
            form: {
                address: '',
                tinyAdd: '',
                getter: '',
                phone: ''
            },
            defaultAdd: false,
            options:options,
        };
    },
    methods:{
        onaddNew(){
            this.addNew = true
        },
        cancel(){
            this.addNew = false
        }
    }
})
</script>

<style>
.shadow {
    height: 400px;
    width: 300px;
    transition: all 0.5s ease;
    text-align: center;
    margin-right: 10px;
    padding: 15px
}

.shadow:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
</style>