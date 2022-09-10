<template>
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ dropName }}(<a style="color: darkorange;font-weight: 600;">{{actions.length}}</a>)
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item  v-for="(item,index) in actions" :disabled="item.disabled" :divided="item.divided">
                    <div style="height:50px;padding: 2px;">
                        <img :src="item.src" style="width:50px;height:50px;float:left;">
                        <div style="width:90px;float:left">
                            <p style="font-size:14px;">{{item.name}}</p>
                            <p style="font-size:14px;color: #999999;">{{item.info}}</p>
                        </div>
                        <div style="float:left;margin-left: 50px;">
                            <p style="font-size:14px;color: #ff7800">￥{{item.money}}</p>
                            <a style="font-size:14px;float: right;" @click="Delete(index)">删除</a>
                        </div>
                    </div>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
  
  <script>
import { ArrowDown } from '@element-plus/icons-vue'
import {post} from '../utils/tools'
import cookie from 'js-cookie'
import {ElMessage} from 'element-plus'
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
    },
    methods:{
        Delete(index){
            let ids = this.$props.actions
            post('/api/cart/del',{
                ids:[ids[index].id]
            },{
                Authorization: 'Bearer ' + cookie.get('/user/Authorization')
            }).then(res=>{
                if(res.status==200){
                    ElMessage({
                        message:'删除成功',
                        type:'success'
                    })

                    this.$props.actions.splice(index,1)
                }else{
                    ElMessage({
                        message:'删除失败,请检查网络',
                        type:'error'
                    })
                }
            })
        }
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
  