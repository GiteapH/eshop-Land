<template>
    <div v-show="signin" class="shadow" style="margin: 80px auto;background-color: white;height: 441px;width:540px;">
        <div class="dividier">登录</div>
        <el-divider content-position="left"></el-divider>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
            class="demo-ruleForm" >
            <el-form-item label="手机号码" prop="phone">
                <el-input placeholder="请输入手机号码" v-model="ruleForm.phone" type="phone" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input placeholder="请输入密码" v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked2">七天内免登录</el-checkbox>
                <a @click="toSignup" style="text-decoration: underline;text-align: right;width: 300px;">用户注册</a>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitSignInForm(ruleFormRef)"
                    style="background:orange;border: none;width: 400px;margin-top: 30px;">立即登录</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div v-show="!signin" class="shadow" style="margin: 80px auto;background-color: white;height: 441px;width:540px;">
        <div class="dividier">注册</div>
        <el-divider content-position="left"></el-divider>
        <el-form ref="ruleUpFormRef" :model="signUpForm" status-icon :rules="upRules"
            label-width="120px" class="demo-ruleForm">
            <el-form-item label="手机号码" prop="phone">
                <el-input placeholder="请输入手机号码" v-model="signUpForm.phone" type="phone" autocomplete="off" />
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-col :span="10">
                    <el-input placeholder="请输入验证码" v-model="signUpForm.code" autocomplete="off" />
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" @click="getCode(ruleUpFormRef)" :disabled="disabled"
                        style="background:gainsboro;color:black;border: none;width: 240px;">{{ Code }}</el-button>
                </el-col>
            </el-form-item>
            <el-form-item label="昵称" prop="username">
                <el-input placeholder="用户名" v-model="signUpForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input placeholder="请输入密码" v-model="signUpForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpass">
                <el-input placeholder="请确认您的密码" v-model="signUpForm.checkpass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <a @click="toSignin" style="text-decoration: underline;text-align: right;width: 400px;">用户登录</a>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitSignUpForm(ruleUpFormRef)"
                    style="background:orange;border: none;width: 400px;margin-top: 30px;">立即注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
  <script>
import cookie from 'js-cookie'
import { reactive, ref, defineComponent, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { post } from '../utils/tools'
import {useRouter } from 'vue-router'
export default defineComponent({
    setup(props,{root}) {
        // 检验规则函数
        const phone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入电话号码'))
            }
            setTimeout(() => {
                let reg = /^1[13456789]\d{9}$/
                if (!reg.test(signUpForm.phone)) {
                    callback(new Error('手机号码格式错误'))
                } else {
                    // 正则验证电话号码
                    // TODO
                    callback()
                }
            }, 1000)
        }
        // 检验规则函数
        const Inphone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入电话号码'))
            }
            setTimeout(() => {
                let reg = /^1[13456789]\d{9}$/
                if (!reg.test(ruleForm.phone)) {
                    callback(new Error('手机号码格式错误'))
                } else {
                    // 正则验证电话号码
                    // TODO
                    callback()
                }
            }, 1000)
        }

        const pass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入密码'))
            }
            setTimeout(() => {
                // 正则判断至少2种类型
                if (value.length < 5) {
                    callback(new Error('长度至少大于5'))
                } else {
                    callback()
                }
            }, 1000)
        }

        const checkpass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('确认密码不能为空'))
            }
            setTimeout(() => {
                // 正则判断至少2种类型
                if (value != signUpForm.pass) {
                    callback(new Error('两次密码不一致'))
                } else {
                    callback()
                }
            }, 1000)
        }
        const code = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入验证码'))
            } else {
                callback()
            }
        }


        const getCode = () => {
            let reg = /^1[13456789]\d{9}$/
            if (signUpForm.phone == '') {
                ElMessage({
                    message: '电话号码不为空',
                    type: 'warning',
                })
                return
            }
            else if (!reg.test(signUpForm.phone)) {
                ElMessage({
                    message: '电话号码格式不正确',
                    type: 'warning',
                })
                return
            }
            post('/api/register/verify', {
                phone: signUpForm.phone
            }).then(ret => {
                console.log(ret)
                disabled.value = true
                let sec = 60
                let itr = setInterval(() => {
                    Code.value = sec + 's后获取验证码(验证码:' + ret.data + ")"
                    sec--
                    if (sec == 0) {
                        disabled.value = false
                        Code.value = '点击获取验证码'
                        clearInterval(itr)
                    }
                }, 1000)
            })
        }

        const Code = ref('获取验证码')
        const disabled = ref(false)
        const ruleFormRef = ref()
        const ruleUpFormRef = ref()
        const signin = ref(true)
        const toSignin = () => {
            signin.value = true
        }
        const toSignup = () => {
            signin.value = false
        }
        const signUpForm = reactive({
            phone: '',
            pass: '',
            code: '',
            checkpass: '',
            username: ''
        })
        const ruleForm = reactive({
            phone: '',
            pass: ''
        })

        const rules = reactive({
            phone: [{ validator: Inphone, trigger: 'blur' }],
            pass: [{ validator: pass, trigger: 'blur' }]
        })
        const upRules = reactive({
            phone: [{ validator: phone, trigger: 'blur' }],
            pass: [{ validator: pass, trigger: 'blur' }],
            checkpass: [{ validator: checkpass, trigger: 'blur' }],
            code: [{ validator: code, trigger: 'blur' }],
            username: [{
                validator: (rule, value, callback) => {
                    if (value == '') return callback(new Error('请输入用户名'))
                    else return callback()
                }, trigger: 'blur'
            }]
        })
        const submitSignInForm = (formEl) => {
            console.log(formEl.validate)
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    post('/api/login', {
                        password: ruleForm.pass,
                        username: ruleForm.phone
                    }).then(res => {
                        if (res.status == 200) {
                            ElMessage({
                                message: '登陆成功',
                                type: 'success',
                            })
                            // 七天免登录
                            cookie.set('/user/phone', ruleForm.phone, { expires: 7 })
                            cookie.set('/user/pass', ruleForm.pass, { expires: 7 })
                            cookie.set('/user/Authorization',res.data.token)
                            console.log(cookie.get('/user/Authorization'))
                            let router = useRouter()
                            let url = window.location.search.substring(1).split("&")
                            console.log((url.length==1?' ':url[1]))
                            window.location = '/'+(url.length==1?' ':url[1])
                        } else {
                            ElMessage({
                                message: res.msg,
                                type: 'error',
                            })
                        }
                    })
                } else {
                    console.log('error submit!')
                    return false
                }
            })
        }

        // 判断是否记住
        onMounted(() => {
            // let phone = cookie.get('/user/phone')
            // if(phone!=''){
            //     // 获取用户信息
            // }

            let href = window.location.search.substring(1)
            if (href == '0') {
                toSignup()
            } else {
                toSignin()
            }
        })
        const submitSignUpForm = (formEl) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    post('/api/register', {
                        account: signUpForm.phone,
                        captcha: signUpForm.code,
                        nickname: signUpForm.username,
                        password: signUpForm.pass
                    }).then((data) => {
                        if (data.status == 200) {
                            ElMessage({
                                message: '注册成功',
                                type: 'success',
                            })

                            toSignin()
                        } else {
                            ElMessage({
                                message: data.msg,
                                type: 'error',
                            })
                        }
                    })
                } else {
                    ElMessage({
                        message: '格式有误',
                        type: 'warning',
                    })
                    return false
                }
            })
        }

        const resetForm = (formEl) => {
            if (!formEl) return
            formEl.resetFields()
        }

        return {
            ruleForm,
            rules,
            submitSignInForm,
            submitSignUpForm,
            resetForm,
            toSignin,
            getCode,
            toSignup,
            Code,
            upRules,
            signin,
            signUpForm,
            ruleFormRef,
            ruleUpFormRef,
            disabled
        }
    }
})
</script>
  <style scoped>
  a {
      cursor: pointer;
  }
  .shadow {
    padding: 30px;
    transition: all 0.5s ease;
    text-align: center;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 1px 1px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.shadow:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.dividier {
    /* Font & Text */
    font-family: "Microsoft YaHei";
    font-size: 30px;
    font-weight: 400;
    line-height: 34.5px;
    text-align: center;
    /* Color & Background */
    color: rgb(255, 120, 0);
}
  </style>
  