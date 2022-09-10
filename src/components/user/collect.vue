<template>
    <div
        style="padding: 20px;float:left;border: 1px rgba(0, 0, 0, 0.1) solid;height:400px;width:850px;margin-left: 100px;">
        <div
            style="justify-content: space-between;;padding-bottom: -3px;border-bottom: 1px solid grey;width:860px;display: inline-flex;">
            <p
                style="color:orange;border-bottom: 3px solid orange;width:100px;text-align: center;padding-bottom: 15px;">
                收藏的商品</p>
            <el-row style="text-align:right" v-show="!isEnter">
                <el-col :span="4">
                    <el-button type="warning" plain @click="enter">批量管理</el-button>
                </el-col>
            </el-row>
            <el-row style="margin-right: 15px;" v-show="isEnter">
                <el-col :span="6">
                    <el-checkbox v-model="choiceAll" label="全选" @change='changeAll' />
                </el-col>
                <el-col :span="11">
                    <el-button type="warning" text>取消收藏</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="warning" plain @click="cancel">保存</el-button>
                </el-col>
            </el-row>
        </div>
        <div style="margin-top: 15px;">
            <div
                style="overflow: scroll;padding:20px;margin: 0 auto;width: 820px;background-color: white;display: flex;height: 330px;">
                <div style="margin: 0 auto;word-break:break-all;width: 800px;margin-top: 20px;float: left;">
                    <div class="shadow" v-for="(item, index) in items"
                        style="float:left;height:300px ;margin-bottom: 50px;">
                        <img :src="item.src" style="width:100px;height: 100px;">
                        <p :title="item.thingName"
                            style="overflow: hidden;;text-align: center;text-overflow:ellipsis;white-space: nowrap;font-size: 16px;font-weight: 600;margin-bottom: 30px;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
                            {{ item.thingName }}</p>
                        <h2 style="color:orange;">¥{{ item.tempMon }} <a
                                style="text-decoration: line-through;color: black;font-size: 18px;">¥{{ item.ordMon
                                }}</a>
                        </h2>
                        <el-divider border-style="double" />
                        <el-row style="margin-top:15px">
                            <el-col :span="10">
                                <el-button style="width:120px" @click="cancleCollect(item)">取消收藏</el-button>
                            </el-col>
                            <el-col :span="10">
                                <el-button style="width:120px">详情</el-button>
                            </el-col>
                            <el-col :span="1">
                                <el-checkbox v-model="products[index]" label="选择" />
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, defineComponent } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { get, post } from '../../utils/tools'
import options from '../../utils/divilder'
import imgUrl from '../../api/baseUrl'
import cookie from 'js-cookie'
import { ElMessage } from 'element-plus'
export default defineComponent({
    props: ['type'],
    data() {
        return {
            choiceAll: false,
            isEnter: false,
            items: [],
            products: []
        };
    },
    methods: {
        enter() {
            this.isEnter = true
        },
        cancel() {
            this.isEnter = false
        },
        changeAll() {
            if (this.choiceAll) {
                for (var i = 0; i < this.products.length; i++) {
                    this.products[i] = true
                }
            } else {
                for (var i = 0; i < this.products.length; i++) {
                    this.products[i] = false
                }
            }
        },
        getCollections() {
            this.items = []
            get('/api/collect/user', {
                limit: 15000,
                type: this.$props.type
            }, {
                Authorization: 'Bearer ' + cookie.get('/user/Authorization')
            }).then(res => {
                if (res.data.status === 200) {
                    console.log(res.data.data)
                    let datas = res.data.data
                    for (let data of datas) {
                        this.items.push({
                            id: data.pid,
                            src: imgUrl.imgUrl + data.image,
                            thingName: data.storeName,
                            tempMon: data.price,
                            ordMon: data.otPrice
                        })
                    }

                    console.log(this.items)
                }
            })
        },
        cancleCollect(item) {
            console.log(item)
            post('/api/collect/del', {
                category: this.$props.type,
                id: item.id
            },{
                Authorization: 'Bearer ' + cookie.get('/user/Authorization')
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    ElMessage({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.getCollections()
                } else {
                    ElMessage({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        }
    },
    mounted() {
        this.getCollections()

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

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    border-radius: 10px;
    background-color: #272d44;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    background-color: rgba(240, 240, 240, 0.5);
}
</style>