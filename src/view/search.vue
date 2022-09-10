<template>
    <headLay @search="search"></headLay>
    <div style="background-color: rgba(0, 0, 0, 0.1);">
        <div style="padding:20px;margin: 0 auto;width: 1300px;">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item>全部类别</el-breadcrumb-item>
                <el-breadcrumb-item>{{input}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="padding:20px;margin: 0 auto;width: 1300px;background-color: white;display: flex;">
            <div style="margin: 0 auto;word-break:break-all;width: 1300px;margin-top: 20px;float: left;">
                <div class="shadow" v-for="(item, index) in items"
                    style="float:left;height:500px ;margin-bottom: 50px;">
                    <router-link :to="'/product/'+item.id" style="text-decoration: none;color: black;">
                        <img :src="item.src" style="width:300px;height: 300px;">
                        <p :title="item.thingName"
                            style="overflow: hidden;;text-align: center;text-overflow:ellipsis;white-space: nowrap;font-size: 16px;font-weight: 600;margin-bottom: 30px;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
                            {{ item.thingName }}</p>
                    </router-link>
                    <h2 style="color:orange;">¥{{ item.tempMon }} <a
                            style="text-decoration: line-through;color: black;font-size: 18px;">¥{{ item.ordMon }}</a>
                    </h2>
                    <el-divider border-style="double" />
                    <p style="color:gray">{{ item.info }}</p>
                </div>
            </div>
        </div>
        <div style="height:40px;margin: 0 auto;width: 1343px;;">
            <el-button @click="onloadMore" :disabled="isNone" :loading="loadMore" style="margin: 0 auto;width:1343px">
                {{status}}
            </el-button>
        </div>
        <div style="margin-top:20px;margin: 0 auto;width: 1300px;">


        </div>
    </div>
</template>



<script>
import headLay from '../components/head.vue'
import { defineComponent } from 'vue'
import { Search, StarFilled } from '@element-plus/icons-vue'
import swiper from '../components/swiper.vue'
import { post, get } from '../utils/tools'
import imgUrl from '../api/baseUrl'
import cookie from 'js-cookie'
import comment from '../components/comment.vue'
import { ElMessage } from 'element-plus'
export default defineComponent({
    components: {
        headLay,
        Search,
        swiper,
        StarFilled,
        comment,
        ElMessage
    },
    data() {
        return {
            items: [],
            loadMore: true,
            isNone: false,
            status: '正在加载',
            input: '',
            page: 1,
        };
    },
    mounted() {
        this.input  = this.$route.params.search
        console.log(this.input)
        this.search(this.input)
    },
    methods: {
        search(val) {
            this.page = 1
            this.input = val
            this.items = []
            this.isNone = false
            get('/api/products', {
                keyword: this.input,
                limit: 15,
                news: 0,
                page: (this.page)++,
                priceOrder: 'asc'
            }).then(res => {
                console.log(res)
                if (res.data.status == 200) {
                    let datas = res.data.data
                    for (let data of datas.content) {
                        this.items.push({
                            id: data.id,
                            src: imgUrl.imgUrl + data.image_base,
                            thingName: data.storeName,
                            tempMon: data.price,
                            ordMon: data.otPrice,
                            info: data.storeInfo
                        })
                    }
                    this.loadMore = false
                    this.status = '加载更多'
                }
            })
        },
        onloadMore() {
            this.loadMore = true
            this.status = '正在加载'
            get('/api/products', {
                keyword: this.input,
                limit: 15,
                news: 0,
                page: (this.page)++,
                priceOrder: 'asc'
            }).then(res => {
                console.log(res)
                if (res.data.status == 200) {
                    let datas = res.data.data
                    if (datas.content.length == 0) {

                        this.status = '我是有底线的'

                        this.isNone = true
                        this.loadMore = false
                        return
                    }
                    for (let data of datas.content) {
                        this.items.push({
                            id: data.id,
                            src: imgUrl.imgUrl + data.image_base,
                            thingName: data.storeName,
                            tempMon: data.price,
                            ordMon: data.otPrice,
                            info: data.storeInfo
                        })
                    }
                    this.loadMore = false
                    this.status = '加载更多'
                } else {
                    this.loadMore = false
                    this.status = '加载更多'
                }
            })
        }
    }
})
</script>

<style scoped>
.shadow {
    height: 400px;
    width: 300px;
    transition: all 0.5s ease;
    text-align: center;
    margin-right: 10px;
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
