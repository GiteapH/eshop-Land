<template>
    <div style="background:#f1f2f7;height:40px;margin-top: 0px;">
        <div style="margin:0 auto;width: 60%;height: 40px;">
            <p v-show="!login" style="line-height:40px;float:left">您好,请先<router-link to="/login?1" style="color:orange">
                    登录</router-link>
                或<router-link to="/login?0" style="color:orange">注册</router-link>
            </p>
            <el-dropdown v-show="login" style="float:left;margin-top: 10px;">
                <span class="el-dropdown-link">
                    欢迎您&nbsp&nbsp{{ username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <ul class="myUl">
                <p class="li">我的订单</p>
                <dropshop class="li" v-for="item in dropshops" :dropName="item.dropName" :actions="item.dropdown">
                </dropshop>
                <dropdown class="li" v-for="item in dropdowns" :dropName="item.dropName" :actions="item.dropdown">
                </dropdown>
            </ul>
        </div>
    </div>
    <div style="margin: 0 auto;width: 60%;margin-top: 20px;height: 100px;">
        <div>
            <a href="/"><img src="/logo.png" style="margin-left:-20px;float:left"></a>
            <div style="float:right;width: 350px;">
                <Myinput @search="search" style="border:solid #ff7800 1px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;">
                </Myinput>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import Myinput from '../components/input.vue'
import { ElMessage } from 'element-plus'
import dropdown from './dropdown.vue'
import { post, get } from '../utils/tools'
import cookie from 'js-cookie'
import dropshop from './dropShop.vue'
import urls from '../api/baseUrl'
export default defineComponent({  
    name: 'head-lay',
    components: {
        dropdown,
        dropshop,
        Myinput,
        ArrowDown
    },
    setup(props,root) {
        const dropdowns = ref([])
        const dropshops = ref([])
        const username = ref('')
        const login = ref(false)

        const search = (val) => {
            root.emit('search',val);
        }

        const outLogin = () => {
            post('/api/auth/logout', {}, { Authorization: 'Bearer ' + cookie.get('/user/Authorization') }).then(res => {
                console.log(res)
                if (res.status == 200) {
                    ElMessage({
                        message: '退出成功',
                        type: 'success'
                    })
                    cookie.remove('/user/phone')
                    window.location.reload()
                } else {
                    ElMessage({
                        message: '退出失败',
                        type: 'error'
                    })
                }
            })
        }
        dropdowns.value = [{
            dropdown: [
                {
                    value: '个人信息',
                    disabled: false,
                    divided: false,
                    click:()=>{
                        window.location = ('/userinfo/0')
                    }
                }
                , {
                    value: '我的订单',
                    disabled: false,
                    divided: false,
                    click:()=>{
                        window.location = ('/userinfo/1')
                    }
                }, {
                    value: '收货地址',
                    disabled: false,
                    divided: false,
                    click:()=>{
                        window.location = ('/userinfo/2')
                    }
                }, {
                    value: '钱包充值',
                    disabled: false,
                    divided: false,
                    click:()=>{
                        window.location = ('/userinfo/3')
                    }
                }],
            dropName: '我的'
        }]

        onMounted(() => {
            let phone = cookie.get('/user/phone')
            if (phone != '') {
                // 获取用户信息
                get('/api/userinfo', {}, {
                    Authorization: 'Bearer ' + cookie.get('/user/Authorization')
                }).then(res => {
                    if (res.data.status == 200) {
                        username.value = res.data.data.nickname
                        login.value = true
                    }
                })

                get('/api/cart/list', {}, {
                    Authorization: 'Bearer ' + cookie.get('/user/Authorization')
                }).then(res => {
                    if (res.data.status == 200) {
                        console.log(res.data.data)
                        if (res.data.data.valid.length == 0) {
                            dropdowns.value.push({
                                dropdown: [{
                                    value: '您暂未选购，请先选购至购物车吧',
                                    disabled: false,
                                    divided: false
                                }],
                                dropName: '购物车',
                            })
                        }
                        // 选购的内容
                        else {
                            let data = res.data.data.valid
                            console.log(res.data.data.valid[0])
                            let stores = []
                            for (let info of data) {
                                stores.push({
                                    src: urls.imgUrl + info.productInfo.image,
                                    info: info.productInfo.attrInfo.sku,
                                    name: info.productInfo.keyword,
                                    money: info.truePrice,
                                    disabled: false,
                                    divided: false,
                                    id: info.id
                                })
                            }
                            dropshops.value.push({
                                dropName: '购物车',
                                dropdown: stores,
                            })
                        }
                    } else {
                        dropdowns.value.push({
                            dropdown: [{
                                value: '请先登录再查看',
                                disabled: false,
                                divided: false
                            }],
                            dropName: '购物车'
                        })
                    }
                })
            }
        })
        return {
            dropdowns,
            username,
            login,
            outLogin,
            dropshops,
            search
        }
    }
})
</script>

<style scoped>
.myUl {
    list-style: none;
    float: right;
    line-height: 40px;
}

.li {
    margin-right: 20px;
    float: left;
    line-height: 40px;
    color: #606266
}

.li:hover {
    color: orange;
    cursor: default;
}
</style>