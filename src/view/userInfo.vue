<template>
    <headLay @search="search"></headLay>
    <div style="padding:20px;margin: 0 auto;width: 1300px;">
        <div
            style="padding: 30px 3px;margin-top: 20px;float:left;border: 1px rgba(0, 0, 0, 0.1) solid;height:420px;width:200px">
            <ul class="menu">
                <li>个人信息</li>
                <li>我的订单</li>
                <li>收货地址</li>
                <li>钱包充值</li>
                <li>我的收藏</li>
                <li>浏览足迹</li>
            </ul>
        </div>
    </div>
    <div v-show="show[0]" style="margin-top:20px;margin: 0 auto;width: 1300px;">
        <updateinfo></updateinfo>
    </div>
    <div v-show="show[1]" style="margin-top:20px;margin: 0 auto;width: 1300px;">
        <myorder></myorder>
    </div>
    <div v-show="show[2]" style="margin-top:20px;margin: 0 auto;width: 1300px;">
        <getter></getter>
    </div>
    <div v-show="show[4]" style="margin-top:20px;margin: 0 auto;width: 1300px;">
        <collect type="collect"></collect>
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
import updateinfo from '../components/user/updateInfo.vue'
import myorder from '../components/user/myOrder.vue'
import getter from '../components/user/getterAddress.vue'
import collect from '../components/user/collect.vue'
import { ElMessage } from 'element-plus'
import $ from 'jquery'
export default defineComponent({
    components: {
        headLay,
        Search,
        swiper,
        StarFilled,
        comment,
        ElMessage,
        updateinfo,
        getter,
        myorder,
        collect
    },
    data() {
        return {
            show: []
        };
    },
    mounted() {
        let type = this.$route.params.type
        for (let i = 0; i < 6; i++) {
            if (i == type) {
                this.show[i] = true
            }
            else {
                this.show[i] = false
            }
        }
        $($('.menu li')[type]).addClass('active')

        $('.menu li').click((e) => {
            $(e.target).addClass('active').siblings().removeClass('active');
            let idx = $(e.target).index()
            console.log(idx)
            for (let i = 0; i < 6; i++) {
                if (i == idx) {
                    this.show[i] = true
                }
                else {
                    this.show[i] = false
                }
            }
        })
    },
    methods: {

    }
})
</script>

<style scoped>
.menu {
    list-style: none;
    text-align: center;
}

.menu li {
    margin-top: 40px;
    font-size: 15px;
    width: 150px;
}

.active {
    color: lightcoral;
    border-left: 5px orange solid;
    margin-left: -5px;
}

.menu li:hover {
    color: lightcoral;
    cursor: pointer;
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
