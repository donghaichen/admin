<template>
    <div class="login-container">
        <a-spin class="global-loading" v-if="globalLoading"/>
        <a-form>
            <div class="sider-logo">
                <img v-if="!modelRef.facepalm" src="../assets/img/logo-tran.png" alt="logo">
                <img v-else src="../assets/img/logo-facepalm.png" alt="logo">
                <h1 v-if="!collapsed">后台管理系统</h1>
            </div>
            <a-form-item label="" v-bind="validateInfos.username">
                <a-input v-model:value="modelRef.username" ref="usernameInput" placeholder="请输入用户名">
                    <template v-slot:prefix><user-outlined type="user"/></template>
                </a-input>
            </a-form-item>
            <a-form-item label="" v-bind="validateInfos.password">
                <a-input-password v-model:value="modelRef.password" placeholder="请输入密码"
                                  @blur="passwordBlur()"
                                  @focus="passwordFocus()"
                                  @pressEnter="onSubmit">
                    <template v-slot:prefix><LockOutlined /></template>
                </a-input-password>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" block :loading="modelRef.loading" @click="onSubmit">
                    登录
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
  import { reactive, toRaw } from 'vue';
  import { UserOutlined, LockOutlined, } from '@ant-design/icons-vue';
  import { useForm } from '@ant-design-vue/use';
  import router from "../router";
  export default {
    components: {
      UserOutlined,
      LockOutlined,
    },
    data() {
      return {
        globalLoading: true
      }
    },
    mounted() {
      this.init()
      this.$refs.usernameInput.focus()
    },
    methods: {
      init() {
        setTimeout(() => {
          this.globalLoading = false
        }, 800)
      },
      passwordBlur() {
        this.modelRef.facepalm = false
        console.log('passwordBlur')
      },
      passwordFocus() {
        this.modelRef.facepalm = true
        console.log('passwordFocus')
      },
    },
    setup() {
      const modelRef = reactive({
        username: '',
        password: '',
        loading : false,
        facepalm : false,
        globalLoading: true
      });
      const rulesRef = reactive({
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能少于 6 位', trigger: 'blur' },
        ],
      });
      const { validate, validateInfos } = useForm(modelRef, rulesRef);
      const onSubmit = e => {
        modelRef.loading = true
        e.preventDefault();
        validate()
        .then(() => {
          console.log(toRaw(modelRef));
        })
        .catch(err => {
          console.log('error', err);
          router.push('/dashboard')
        });
        setTimeout(() => {
          modelRef.loading = false
        }, 1000)
      };
      return {
        validateInfos,
        modelRef,
        onSubmit,
      };
    },
  };
</script>
<style lang="scss" scoped>
    .login-container {
        height: 100%;
        background: url(../assets/img/background.jpg) 50% fixed no-repeat;
        background-size: cover;
        display:flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        .global-loading{
            background-color: transparent;
            height: auto;
        }
        .ant-form {
            position: absolute;
            max-width: 100%;
            overflow: hidden;
            width: 368px;
            background: #3257be;
            padding: 20px 35px;
            left: 65%;
            box-shadow: 0 10px 25px 0 rgba(0,0,0,.3);
        }
        .sider-logo {
            position: relative;
            width: 100%;
            display: block;
            padding: 20px 55px;

            img {
                height: 66px;
                vertical-align: top;
            }

            h1 {
                position: absolute;
                top: 38%;
                color: rgba(255, 255, 255, 0.85);
                font-weight: 600;
                font-size: 20px;
                /* font-family: Avenir,helvetica neue,Arial,Helvetica,sans-serif; */
                left: 43%;
            }
        }
    }
    @media only screen and (max-width: 768px)  {
        .ant-form {
            position: relative!important;
            left: 0!important;
        }
    }

</style>
