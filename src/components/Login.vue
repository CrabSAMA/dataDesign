<template>
    <div id="app-login">
        <el-form name="login" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="loginForm login-container">
            <h3 class="login-form-title">登录</h3>
            <el-form-item prop="account">
                <el-input type="text" name="loginID" v-model="loginForm.account" auto-complete="on" placeholder="账号"  @keyup.enter.native="login"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码"  @keyup.enter.native="login"></el-input>
            </el-form-item>
            <el-alert class="login-error" :title=errorMessage type="error" show-icon :closable="false" v-if="isError" :center="false"></el-alert>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    account: '',
                    checkPass: '',
                },
                loginRules: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    checkPass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                },
                errorMessage: '',
                isError: false,  //用于显示错误提示的v-if
            }
        },
        methods: {
            login(){
                if(this.loginForm.checkPass === "123"){
                    this.$router.push('main');
                }else{
                    this.errorMessage = "密码错误";
                    this.isError = true;
                }
            }
        }
    }
</script>

<style scoped>
    #app-login{
        text-align: center;
        padding-top: 150px;
    }
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin:20px auto auto auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login-form-title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .login-error{
        margin: -15px 0px 20px 0px;
    }
</style>
