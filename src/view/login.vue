<template>
    <div style="margin: 0 auto;width: 60%;margin-top: 20px;height: 80px;">
        <img style="float:left" src="/logo.png" alt="">
        <p style="float:left;line-height:35px;margin-left:50px;font-size: large;font-weight: 400;">欢迎来到PC商城</p>
    </div>

    <div style="border: solid 0.1px white;height: 1000px;width:100%;background: url('/background.jpg');">
        <!-- 登录 -->
            <loginForm></loginForm>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import loginForm from '../components/loginForm.vue'
export default defineComponent({
    components:{
        loginForm
    }
})
</script>

<style scoped>

</style>