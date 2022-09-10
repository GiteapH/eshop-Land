<template>
    <headLay></headLay>
    <div style="margin: 0 auto;width: 1300px;height: 470px;">
        <div style="float:left;height:430px;background-color: #2d2d31;width: 200px;padding: 20px;">
            <div style="margin-bottom: 10px;" v-for="item in menu">
                <p style="color:white;text-align: left;">{{ item.name }}</p>
                <div style="list-style:none;margin-left: 25px;margin-top: 20px;">
                    <div v-for="tinyMenu in item.tinyMenus">
                        <p style="color:gray;word-wrap:break-word;word-break:normal; margin-right: 5px;">
                            {{ tinyMenu.name }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div style="float:right;width: 1050px;height:470px;">
            <carousel :srcs="srcs"></carousel>
        </div>
    </div>
    <div style="margin-top:15px">
        <h1 style="margin: 0 auto;width: 1300px;font-weight: 600px;font-size: 30px;padding-top: 30px;">精品推荐</h1>
        <div
            style="margin: 0 auto;word-break:break-all; overflow:auto;width: 1310px;height:500px ;margin-top: 20px;display: flex;">
            <div class="shadow" v-for="(item, index) in phones">
                <router-link :to="'/product/'+item.id" style="text-decoration: none;color: black;">
                    <img :src="item.src" style="width:300px;height: 300px;">
                    <p
                        style="font-size: 16px;font-weight: 600;margin-bottom: 30px;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
                        {{ item.thingName }}</p>
                </router-link>
                <h2 style="color:orange">¥{{ item.tempMon }} <a
                        style="text-decoration: line-through;color: black;font-size: 18px;">¥{{ item.ordMon }}</a></h2>
                <el-divider border-style="double" />
                <p style="color:gray">{{ item.info }}</p>

            </div>
        </div>
    </div>
    <div style="margin-top:55px">
        <h1 style="margin: 0 auto;width: 1300px;font-weight: 600px;font-size: 30px;padding-top: 30px;">精品推荐</h1>
        <div
            style="margin: 0 auto;word-break:break-all; overflow:auto;width: 1310px;height:500px ;margin-top: 20px;display: flex;">
            <div class="shadow" v-for="(item, index) in likes">
                <router-link :to="'/product/'+item.id"  style="text-decoration: none;color: black;">
                    <img :src="item.src" style="width:300px;height: 300px;">
                    <p
                        style="font-size: 16px;font-weight: 600;margin-bottom: 30px;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
                        {{ item.thingName }}</p>
                </router-link>
                <h2 style="color:orange">¥{{ item.tempMon }} <a
                        style="text-decoration: line-through;color: black;font-size: 18px;">¥{{ item.ordMon }}</a></h2>
                <el-divider border-style="double" />
                <p style="color:gray">{{ item.info }}</p>
            </div>
        </div>
    </div>

    <div style="margin-top:20px">

    </div>
</template>

<script>
import headLay from '../components/head.vue'
import { defineComponent } from 'vue'
import { Search } from '@element-plus/icons-vue'
import carousel from '../components/carousel.vue'
import {post,get} from '../utils/tools'
import imgUrl from '../api/baseUrl'
export default defineComponent({
    components: {
        headLay,
        Search,
        carousel
    },
    data() {
        return {
            input: '',

            srcs: ['/banner/banner1.png','/banner/banner2.png'],
            menu: [{
                name: '手机数码',
                tinyMenus: [{
                    name: '手机配件   手机通讯'
                }]
            }, {
                name: '家用办公',
                tinyMenus: [{
                    name: '电脑整机   家具电器'
                }]
            }, {
                name: '精品服饰',
                tinyMenus: [{
                    name: '特色女装   精品男装'
                }, {
                    name: '潮流女鞋   品质男鞋'
                }, {
                    name: '功能箱包'
                }]
            }, {
                name: '珠宝饰品',
                tinyMenus: [{
                    name: '黄金首饰   钻石彩宝'
                }]
            }, {
                name: '美妆护肤',
                tinyMenus: [{
                    name: '面部护理'
                }]
            }],
            phones: [],
            likes: []
        };
    },
    mounted(){
        // 轮播图
       // this.getCarousel()
        //菜单
        this.getBastList()
        // this.getBastList()
        this.getLikeList()
    },
    methods:{
        // 太糊了
        // getCarousel(){
        //     get('/api/index/banner').then(res=>{

        //         for(let data of res.data.data){
        //             this.srcs.push(imgUrl.imgUrl+data.imageArr[0])
        //         }

        //     })
        // }
        getFields(){
            get('/api/index/menus').then(res=>{
                console.log(res)
            })
        },
        getBastList(){
            get('/api/index/bastList').then(res=>{
                console.log(res)
                for(let data of res.data.data){
                    console.log(data)
                    this.phones.push({
                        id: data.id,
                        src:imgUrl.imgUrl+data.image_base,
                        thingName:data.storeName,
                        tempMon:data.cost,
                        ordMon:data.otPrice,
                        info:data.storeInfo

                    })
                }
            })
        },
        getLikeList(){
            get('/api/index/like').then(res=>{
                console.log(res)
                for(let data of res.data.data){
                    this.likes.push({
                        id: data.id,
                        src:imgUrl.imgUrl+data.image_base,
                        thingName:data.storeName,
                        tempMon:data.cost,
                        ordMon:data.otPrice,
                        info:data.storeInfo

                    })
                }
            })
        }
    }
})
</script>

<style scoped>
.carousel__container {
    height: 400px
}

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