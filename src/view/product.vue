<template>
    <headLay></headLay>
    <div style="padding:20px;margin: 0 auto;width: 1300px;height: 560px;">
        <div style="float:left;height:460px;width:460px;margin-top: 50px;">
            <swiper :srcs='srcs'></swiper>
        </div>
        <div style="float:left;height: 560px;width: 700px;padding: 10px;margin-left: 120px;">
            <h2>{{product.name}}</h2>
            <p style="line-height:30px;font-size:14px;color: #999999;margin-top: 10px;">{{product.storeInfo}}</p>
            <div
                style="background:rgba(256, 180, 111, 0.2);border-radius: 5px;width: 100%;height: 40px;margin-top: 10px;padding: 10px;">
                <p style="font-size:14px;color: #999999;line-height: 40px;">价格:<a
                        style="color:orange;font-size:20px;margin-left: 20px;">${{product.cost}}</a> <a
                        style="text-decoration: line-through;color: black;font-size: 16px;margin-left: 16px;">¥{{product.ordCost}}</a>
                </p>
            </div>

            <div style="margin-top:15px;margin-bottom: 35px;" v-for="(item,index) in attrs">
                <p style="line-height:40px;font-size: 15px;font-weight: 500;">{{item.attrName}}</p>
                <div>
                    <el-radio-group v-model="attrsModel[index]" fill="orange" @change="onTypeChange">
                        <el-radio-button v-for="val in item.attrVal" :label="val" />
                    </el-radio-group>
                </div>
            </div>
            <div style="margin-top:15px;margin-bottom: 35px;">
                <p style="line-height:40px;font-size: 15px;font-weight: 500;">数量
                    <a style="margin-left:16px;text-decoration: none;color: goldenrod;">当前品种冗余库存:{{product.stock}}</a>
                    <a style="margin-left:16px;text-decoration: none;color:coral;">总库存:{{product.allstock}}</a>
                </p>
                <el-input-number v-model="num" size="large" />
            </div>
            <el-row>
                <el-button @click="addBuyCar" size="large"
                    style="width:120px;border: lightsalmon 1px solid;color:lightsalmon">加入购物车
                </el-button>
                <el-button type="primary" size="large" style="width:120px;background-color: lightsalmon;border: none;">
                    购买</el-button>
                <div style="text-align:center;margin-left:80px;color: #999999;margin-top: -20px" @click="collect">
                    <el-button size="large" circle>
                        <el-icon>
                            <StarFilled />
                        </el-icon>
                    </el-button>
                    <p
                        style="font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif">
                        收藏</p>
                </div>
            </el-row>
        </div>
    </div>
    <div style="height:40px;background:rgba(0, 0, 0, 0.1);margin: 0 auto;width: 1300px;">
        <el-radio-group v-model="field" size="large" fill="lightsalmon">
            <el-radio-button label="商品详情" />
            <el-radio-button label="评论信息" />
        </el-radio-group>
    </div>
    <div style="margin-top:20px;margin: 0 auto;width: 1300px;">
        <img v-show="field=='商品详情'" :src="product.src" alt=""
            style="width: 800px;float:left;border-right: solid #999999 1.5px;padding-right: 90px;padding-top: 35px;padding-bottom: 35px;" />
        <div v-show="field=='评论信息'"
            style="width: 800px;float:left;padding-right: 90px;padding-top: 35px;padding-bottom: 35px;border-right: solid #999999 1.5px;">
            <el-radio-group v-model="type" size="large" fill="lightsalmon" @change="change">
                <el-radio-button label="全部" />
                <el-radio-button label="好评" />
                <el-radio-button label="中评" />
                <el-radio-button label="差评" />
            </el-radio-group>
            <el-divider style="margin: 30px 10px;"></el-divider>
            <comment v-for="item in comments" :src="item.src" :username="item.username" :content="item.content"
                :date="item.date" style="height:100px"></comment>
        </div>
        <div style="float:left;width: 400px;">
            <el-divider style="width:300px;margin-left: 12%;"> 猜你喜欢</el-divider>
            <p style="text-align:center;font-size: 5px;color: #999999;margin-bottom: 50px;">Guess you like it</p>
            <div style="word-break:break-all; overflow:scroll;height:1500px;margin-top: 20px;margin-left: 13%;">
                <div class="shadow" v-for="(item, index) in likes" style="height:450px;margin-bottom: 30px;">
                    <div @click="reload(item)" style="text-decoration: none;color: black;">
                        <img :src="item.src" style="width:300px;height: 300px;">
                        <p
                            style="font-size: 16px;font-weight: 600;margin-bottom: 30px;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
                            {{ item.thingName }}</p>
                    </div>
                    <h2 style="color:orange">¥{{ item.tempMon }} <a
                            style="text-decoration: line-through;color: black;font-size: 18px;">¥{{ item.ordMon
                            }}</a></h2>
                    <p style="color:gray">{{ item.info }}</p>
                </div>
            </div>
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
            type: '全部',
            uniqueProduct: new Map(),
            typeMap: {
                '全部': 0,
                '好评': 1,
                '中评': 2,
                '差评': 3
            },
            comments: [],
            attrsModel: [],
            attrs: [],
            product: {
                name: '',
                cost: '',
                ordCost: '',
                storeInfo: '',
                src: '',
                stock: 0,
                allstock: 0
            },
            proId: -1,
            field: '商品详情',
            input: '',
            memory: '64g+32',
            color: '',
            num: 0,
            likes: [],
            mems: [],
            colors: [],
            srcs: []
        };
    },
    mounted() {
        this.proId = this.$route.params.id
        this.getLikeList()
        this.getProductInfo()
        this.getComments()
    },
    methods: {
        reload(item) {

            this.$router.push('/product/' + item.id)
            this.$router.replace({
                path: '/product/' + item.id,
                query: {
                    t: Date.now()
                }
            })
        },
        onTypeChange() {
            let type = this.getProductType()
            let data = this.uniqueProduct.get(type)
            this.product.cost = data.price
            this.product.ordCost = data.otPrice
            this.product.stock = data.stock
        },
        change() {
            this.comments = []
            this.getComments(this.typeMap[this.type])
        },
        getLikeList() {
            get('/api/index/like').then(res => {
                for (let data of res.data.data) {
                    this.likes.push({
                        id: data.id,
                        src: imgUrl.imgUrl + data.image_base,
                        thingName: data.storeName,
                        tempMon: data.cost,
                        ordMon: data.otPrice,
                        info: data.storeInfo

                    })
                }
            })
        },
        getProductInfo() {
            get('/api/product/detail/' + this.proId).then(res => {
                console.log(res)
                if (res.status == 200) {
                    let data = res.data.data
                    // 物品大概图
                    for (let imgSrc of data.storeInfo.sliderImageArr) {
                        this.srcs.push(imgUrl.imgUrl + imgSrc)
                    }
                    // 物品基本信息
                    this.product.name = data.storeInfo.storeName
                    this.product.cost = data.storeInfo.price
                    this.product.ordCost = data.storeInfo.otPrice
                    this.product.storeInfo = data.storeInfo.storeInfo
                    this.product.allstock = data.storeInfo.stock
                    let des = data.storeInfo.description
                    this.product.src = imgUrl.imgUrl + des.substring(des.indexOf("file") - 1, des.indexOf(`\"\/>`))
                    // 物品属性选择
                    for (let attr of data.productAttr) {
                        this.attrs.push({
                            attrName: attr.attrName,
                            attrVal: attr.attrValueArr
                        })
                        // 设置默认项
                        this.attrsModel.push(attr.attrValueArr[0])
                    }

                    // 物品种类map
                    for (let attr in data.productValue) {
                        this.uniqueProduct.set(attr, data.productValue[attr])
                    }
                    this.onTypeChange()
                    console.error(this.uniqueProduct)
                }
            })
        },
        getComments(type = 0, page = 1, limit = 5) {
            get('/api/reply/list/' + this.proId, {
                page: page,
                limit: limit,
                type: type
            }).then(res => {
                if (res.status == 200) {
                    let comments = res.data.data
                    for (let comment of comments) {
                        this.comments.push({
                            src: imgUrl.staticImg + comment.avatar,
                            username: comment.nickname,
                            content: comment.comment,
                            date: comment.createTime
                        })
                    }
                }
            })

        },
        // 收藏
        collect() {

            post('/api/collect/add', {
                category: 'collect',
                id: this.proId
            }, {
                Authorization: 'Bearer ' + cookie.get('/user/Authorization')
            }).then(res => {
                console.log(res)
                if (res.status == 200) {
                    ElMessage({
                        message: '收藏成功',
                        type: 'success'
                    })
                } else {
                    ElMessage({
                        message: '请先登录',
                        type: 'error'
                    })
                }
            })
        },
        addBuyCar() {
            if (this.num == 0) {
                ElMessage({
                    message: ' 数量不能为0',
                    type: 'warning'
                })
                return
            }
            let type = this.getProductType()
            post('/api/cart/add', {
                cartNum: this.num,
                productId: this.proId,
                uniqueId: this.uniqueProduct.get(type).unique,
                new: 0
            }, {
                Authorization: 'Bearer ' + cookie.get('/user/Authorization')
            }).then(res => {
                if (res.status == 200) {
                    ElMessage({
                        message: '加入购物车成功',
                        type: 'success'
                    })
                } else {
                    ElMessage({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        getProductType() {
            return this.attrsModel.join(",")
        }
    }
})
</script>

<style scoped>
.swiper-box {
    width: 580px;
    position: relative;
    margin-right: 50px;
    float: left;
}

.swiperThumbsLeft {
    width: 120px;
    position: absolute;
    left: 0;
    top: 10%;
    box-sizing: border-box;
    padding: 10px 0;
    height: 80%;
}

.thumbsBox {
    width: 100%;
    height: 100%;
    position: relative;
}

.gallery-thumbs {
    position: relative;
    width: 100%;
    height: 100%;
}

.gallery-top {
    height: 100% !important;
    width: 440px;
    position: absolute;
    right: 0;
}

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
