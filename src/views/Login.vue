<template>
    <div class="login-container">
        <div class="ant-form">
            <a-spin v-if="globalLoading" tip="安全审查中..." style="position: absolute;top: 40%;left: 40%;"/>
        </div>
        <a-form v-show="!globalLoading">
            <div class="title-line"></div>
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
                    安全登录
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
  import { message } from 'ant-design-vue'
  import { login } from '../api/user'
  export default {
    components: {
      UserOutlined,
      LockOutlined,
    },
    data() {
      return {
        globalLoading: true,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
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
        }, 1000)
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
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
        e.preventDefault()
        validate()
        .then(() => {
          console.log(toRaw(modelRef), 'rrrr');
        })
        .catch(err => {
          if (err.errorFields.length > 0) {
            message.error('请先按照错误提示完善表单')
          }else {
            console.log('error', err)
            console.log(toRaw(modelRef))
            login(toRaw(modelRef)).then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            })
            .catch(() => {
            })
            setTimeout(() => {
              router.push('/dashboard')
            }, 800000)
          }
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
        .ant-form {
            position: absolute;
            max-width: 100%;
            overflow: hidden;
            width: 368px;
            min-height: 360px;
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
    .title-line{
        position: absolute;
        bottom: 0;
        width: 50px;
        height: 2px;
        background: linear-gradient(90deg, rgba(24, 144, 255, 0) 0, #2196F3);
        transform: translateX(-50px);
        animation:pageTitleLine 3s ease-in-out 1.5s infinite}

    @keyframes pageTitleLine{
        0%,
        25%{transform:translateX(-50px)}75%, to{transform:translateX(376px)}
    }
</style>
