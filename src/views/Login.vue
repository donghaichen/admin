<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <div class="loginBox" v-bind:class="{ 'shake': shake }">
                <div class="userImage">
                    <img :src="logo">
                </div>
                <form id="loginForm">
                    <div class="input-wrapper" v-bind:class="{ 'ivu-form-item-error': accountError }">
                        <Input prefix="ios-contact" v-model="account" placeholder="用户名" @keyup.enter.native="submit" clearable @on-blur="verifyAccount"/>
                    </div>
                    <div class="input-wrapper" v-bind:class="{ 'ivu-form-item-error': passwordError }">
                        <Input type="password" v-model="password" prefix="md-lock" placeholder="密码" @keyup.enter.native="submit" clearable @on-focus="changeLogo" @on-blur="verifyPassword"/>
                    </div>
                    <div class="input-wrapper" v-bind:class="{ 'ivu-form-item-error': verifyError }">
                        <div v-show="waitShow === false" id="captcha"></div>
                        <div v-show="waitShow" style="height: 32px;color: #000" id="wait"></div>
                    </div>
                    <div class="input-wrapper">
                        <Checkbox v-model="checked" style="float: left">自动登录</Checkbox>
                        <a @click="forgetPassword" style="float: right">忘记密码?</a>
                    </div>
                    <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</Button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import logo from '../assets/img/logo.png'
import logoFace from '../assets/img/logo-facepalm.png'
import {login} from '../api/api'
export default {
    name: 'login',
    data() {
        return {
            logo: logo,
            shake:false,
            waitShow: true,
            captchaObj: {},
            result: {}, // 是否已验证极验
            config: '',
            menu: '',
            account: '',
            password: '',
            checked: true,
            isShowLoading: false,
            accountError: false,
            passwordError: false,
            verifyError: false,
            backgroundImage: '',
            bg: {}
        }
    },
    created() {
        this.backgroundImage = process.env.VUE_APP_BASE_API + 'bing'
        this.bg.backgroundImage = 'url(' + this.backgroundImage +')'
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        verifyAccount() {
            if (this.account.length < 1) {
                this.$Message.error('用户名必填')
                this.accountError = true
            } else {
                this.accountError = false
            }
        },
        changeLogo() {
            this.logo = logoFace
        },
        verifyPassword() {
            this.logo = logo
            if (this.password.length < 1) {
                this.$Message.error('密码必填，我不会偷看的 ＝。＝')
                this.passwordError = true
            } else {
                this.passwordError = false
            }
        },
        forgetPassword() {
            this.$Message.info('请联系您的管理员重置密码')
        },
        submit() {
            if (this.account !== '' && this.password !== '') {
                this.isShowLoading = true;
                login({
                    username: this.account,
                    password: this.password,
                }).then((response) => {
                    if (response.code === 0)
                    {
                        this.$Message.success(response.msg);
                        let data = response.data;
                        localStorage.setItem('token', data.remember_token)
                        localStorage.setItem('config', JSON.stringify(data.config))
                        localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
                        this.$router.push({path: this.redirect || '/'})
                    }else{
                        this.shake = true
                        setTimeout(() =>{
                            this.shake = false
                        }, 500)
                        this.$Message.error(response.msg);
                    }
                    setTimeout(() =>{
                        this.isShowLoading = false;
                    }, 1000)
                })
            } else {
                if (this.account === '') {
                    this.$Message.error('用户名不能为空')
                    this.accountError = true
                }
                if (this.password === '') {
                    this.$Message.error('密码不能为空')
                    this.passwordError = true
                }
            }
        }
    }
}
</script>

<style>
@import "../assets/css/shake.css";
.login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.login-vue .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-vue .loginBox {
    width: 350px;
    background-color: white;
    box-shadow: 0px 0px 43px -2px rgba(135,130,135,1);
    border-radius: 8px;
    padding: 25px;
    opacity: .7;
}
.login-vue .userImage {
    border-radius: 50%;
    overflow: hidden;
    width: 120px;
    height: 120px;
    margin: 10px auto 30px;
    opacity: .7;
}
.login-vue img {
    width: 100%;
}
.login-vue .input-wrapper {
    position: relative;
}
.login-vue .ivu-input {
    width: 100%;
    /*height: 42px;*/
    padding-top: 15px;
    padding-bottom: 15px;
    margin: 10px 0;
    /*font-size: 14px;*/
}
.login-vue .ivu-input-icon {
    top: 8px;
}
.login-vue .ivu-input-prefix, .login-vue .ivu-input-suffix {
    top: 10px;
}
.login-vue .ivu-checkbox-wrapper {
    color: #9a9a9a;
}
.login-vue .auto-login a{
    float: right;
}
.login-vue .submit {
    width: 100%;
    margin-top: 35px;
    color: white;
    font-weight: lighter;
}
#captcha{
    margin: 10px 0 20px;
    height: 32px;
    color: rgb(0, 0, 0);
    overflow: hidden;
    border: 1px solid #dcdee2;
    border-radius: 4px;
}
.geetest_holder.geetest_wind {
    margin-top: -6px;
}
.geetest_holder.geetest_wind .geetest_radar_btn, .geetest_holder.geetest_wind .geetest_success_btn
{
    border: none!important;
}
.geetest_holder.geetest_wind .geetest_radar_tip, .geetest_holder.geetest_wind .geetest_success_radar_tip
{
    font-size: 12px!important;
}
</style>
