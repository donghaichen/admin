<template>
    <a-card :bordered="false" class="setting">
        <a-tabs :activeKey="activeTab" @change="goTab">
            <a-tab-pane key="1" tab="微信公众号">
                <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                        labelAlign="left"
                >
                    <a-form-item ref="name" label="微信公众号类型" name="weixin_mp_type">
                        <a-radio-group name="radioGroup" v-model:value="form.weixin_mp_type">
                            <a-radio value="1">
                                服务号
                            </a-radio>
                            <a-radio value="2">
                               订阅号
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item ref="name" label="服务器 URL" name="weixin_mp_url">
                        <a-input v-model:value="form.weixin_mp_url" />
                        <p class="meta">微信公众平台的“基本配置”的“URL”参数中使用</p>
                    </a-form-item>
                    <a-form-item ref="name" label="AppID(应用 ID )" name="weixin_mp_appid">
                        <a-input v-model:value="form.weixin_mp_appid" />
                    </a-form-item>
                    <a-form-item ref="name" label="AppSecret(应用密钥)" name="weixin_mp_app_secret">
                        <a-input v-model:value="form.weixin_mp_app_secret" />
                    </a-form-item>
                    <a-form-item ref="name" label="Token(令牌)" name="weixin_mp_token">
                        <a-input v-model:value="form.weixin_mp_token" />
                    </a-form-item>
                    <a-form-item ref="name" label="EncodingAESKey" name="weixin_mp_asekey">
                        <a-input v-model:value="form.weixin_mp_asekey" />
                    </a-form-item>
                    <a-form-item ref="name" label="微信号：" name="weixin_mp_id">
                        <a-input v-model:value="form.weixin_mp_id" />
                    </a-form-item>
                    <a-form-item label="公众号二维码" name="weixin_mp_qr">
                        <a-upload
                                name="file"
                                list-type="picture-card"
                                class="avatar-uploader"
                                :show-upload-list="false"
                                :headers="headers"
                                action="https://demo.haoyupay.com/admin/api/v3/upload?type=weixin_mp_qr"
                                @change="uploadChange"
                        >
                            <img style="height: 100px" v-if="form.weixin_mp_qr.length > 0" :src="form.weixin_mp_qr" alt="avatar" />
                            <div v-else>
                                <!-- todo -->
                                <loading-outlined v-if="loading" />
                                <plus-outlined v-else />
                                <div class="ant-upload-text">上传</div>
                            </div>
                        </a-upload>
                        <p class="meta">点击图片可再次上传以更改图片 </p>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="onSubmit">
                            保存
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="微信小程序">
                <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                        labelAlign="left"
                >
                    <a-form-item ref="name" label="AppID" name="weixin_mini_app_secret">
                        <a-input v-model:value="form.weixin_mini_appid" />
                    </a-form-item>
                    <a-form-item ref="name" label="AppSecret" name="weixin_mini_app_secret">
                        <a-input v-model:value="form.weixin_mini_app_secret" />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="onSubmit">
                            保存
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <a-tab-pane key="3" tab="支付接口">
                <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                        labelAlign="left"
                >
                    <a-form-item label="启用支付接口" name="pay_type">
                        <a-radio-group name="radioGroup" v-model:value="form.pay_type">
                            <a-checkbox-group v-model:value="form.pay_type" name="form.pay_type" :options="form.pay_type_options" />
                        </a-radio-group>
                    </a-form-item>
                    <div v-if="form.pay_type.indexOf('wxpay') > -1">
                        <a-divider orientation="left">微信支付接口（含扫码支付、公众号支付和微信 H5 支付）</a-divider>
                        <a-form-item ref="name" label="商户号" name="wxpay_mch_id">
                            <a-input v-model:value="form.wxpay_mch_id" />
                        </a-form-item>
                        <a-form-item ref="name" label="支付密钥" name="wxpay_key">
                            <a-input v-model:value="form.wxpay_key" />
                        </a-form-item>
                        <a-form-item ref="name" label="微信 AppID" name="wxpay_appid">
                            <a-input v-model:value="form.wxpay_appid" />
                        </a-form-item>
                        <a-form-item ref="name" label="微信 AppSecret" name="wxpay_secret">
                            <a-input v-model:value="form.wxpay_secret" />
                        </a-form-item>
                    </div>
                    <div v-if="form.pay_type.indexOf('alipay') > -1">
                        <a-divider orientation="left">支付宝接口（含 PC 网站支付和手机网站支付）</a-divider>
                        <a-form-item ref="name" label="appId" name="alipay_appid">
                            <a-input v-model:value="form.alipay_appid" />
                        </a-form-item>
                        <a-form-item ref="name" label="rsaPrivateKey" name="alipay_private_key">
                            <a-textarea :autosize="true" v-model:value="form.alipay_private_key" />
                        </a-form-item>
                        <a-form-item ref="name" label="rsaPublicKey" name="alipay_public_key">
                            <a-textarea :autosize="true" v-model:value="form.alipay_public_key" />
                        </a-form-item>
                    </div>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="onSubmit">
                           保存
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <a-tab-pane key="4" tab="对象存储">
                <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                        labelAlign="left"
                >
                    <a-form-item label="存储方式" name="object_type">
                        <a-radio-group name="radioGroup" v-model:value="form.object_type">
                            <a-radio value="1">
                                本地存储
                            </a-radio>
                            <a-radio value="2">
                                阿里 OOS
                            </a-radio>
                            <a-radio value="3">
                                七牛云存储
                            </a-radio>
                            <a-radio value="4">
                                腾讯 COS
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <div v-if="form.object_type === '2'">
                        <a-divider orientation="left">阿里 OSS</a-divider>
                        <a-form-item ref="name" label="Access Key ID" name="object_oos_key">
                            <a-input v-model:value="form.object_oos_key" />
                        </a-form-item>
                        <a-form-item ref="name" label="Access Key Secret" name="object_oos_secret">
                            <a-input v-model:value="form.object_oos_secret" />
                        </a-form-item>
                        <a-form-item ref="name" label="Bucket" name="object_oos_bucket">
                            <a-input v-model:value="form.object_oos_bucket" />
                        </a-form-item>
                        <a-form-item ref="name" label="CDN 域名" name="object_oos_cdn">
                            <a-input v-model:value="form.object_oos_cdn" />
                        </a-form-item>
                        <a-form-item ref="name" label="OSS 域名" name="object_oos_url">
                            <a-input v-model:value="form.object_oos_url" />
                        </a-form-item>
                    </div>
                    <div v-if="form.object_type === '3'">
                        <a-divider orientation="left">七牛云存储</a-divider>
                        <a-form-item ref="name" label="AccessKey" name="object_qiniu_key">
                            <a-input v-model:value="form.object_qiniu_key" />
                        </a-form-item>
                        <a-form-item ref="name" label="Secret Key" name="object_qiniu_secret">
                            <a-input v-model:value="form.object_qiniu_secret" />
                        </a-form-item>
                        <a-form-item ref="name" label="Bucket" name="object_qiniu_bucket">
                            <a-input v-model:value="form.object_qiniu_bucket" />
                        </a-form-item>
                        <a-form-item ref="name" label="CDN 域名" name="object_qiniu_cdn">
                            <a-input v-model:value="form.object_qiniu_cdn" />
                        </a-form-item>
                        <a-form-item ref="name" label="七牛 域名" name="object_qiniu_url">
                            <a-input v-model:value="form.object_qiniu_url" />
                        </a-form-item>
                    </div>
                    <div v-if="form.object_type === '4'">
                        <a-divider orientation="left">腾讯 COS</a-divider>
                        <a-form-item ref="name" label="Access Key ID" name="object_cos_key">
                            <a-input v-model:value="form.object_cos_key" />
                        </a-form-item>
                        <a-form-item ref="name" label="Access Key Secret" name="object_cos_secret">
                            <a-input v-model:value="form.object_cos_secret" />
                        </a-form-item>
                        <a-form-item ref="name" label="Bucket" name="object_cos_bucket">
                            <a-input v-model:value="form.object_cos_bucket" />
                        </a-form-item>
                        <a-form-item ref="name" label="CDN 域名" name="object_cos_cdn">
                            <a-input v-model:value="form.object_cos_cdn" />
                        </a-form-item>
                        <a-form-item ref="name" label="COS 域名" name="object_cos_url">
                            <a-input v-model:value="form.object_cos_url" />
                        </a-form-item>
                    </div>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="onSubmit">
                            保存
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <a-tab-pane key="5" tab="快捷登录">
                <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                        labelAlign="left"
                >
                    <a-form-item label="启用第三方登录" name="login_type">
                        <a-radio-group name="radioGroup" v-model:value="form.login_type">
                            <a-checkbox-group v-model:value="form.login_type" name="form.login_type" :options="form.login_type_options" />
                        </a-radio-group>
                    </a-form-item>
                    <div v-if="form.login_type.indexOf('qq') > -1">
                        <a-divider orientation="left">QQ 授权登录接口</a-divider>
                        <a-form-item ref="name" label="AppID" name="login_qq_appid">
                            <a-input v-model:value="form.login_qq_appid" />
                        </a-form-item>
                        <a-form-item ref="name" label="AppSecret" name="login_qq_app_secret">
                            <a-input v-model:value="form.login_qq_app_secret" />
                        </a-form-item>
                    </div>
                    <div v-if="form.login_type.indexOf('wechat_web') > -1">
                        <a-divider orientation="left">微信扫码登录接口（PC 网站使用，需要申请开发者认证）</a-divider>
                        <a-form-item ref="name" label="AppID" name="login_wechat_web_appid">
                            <a-input v-model:value="form.login_wechat_web_appid" />
                        </a-form-item>
                        <a-form-item ref="name" label="微信 AppSecret" name="login_wechat_web_secret">
                            <a-input v-model:value="form.login_wechat_web_secret" />
                        </a-form-item>
                    </div>
                    <div v-if="form.login_type.indexOf('wechat_mp') > -1">
                        <a-divider orientation="left">微信公众号登录</a-divider>
                        <a-form-item label="配置说明">
                            <p>
                                微信公众号登录需要通过 <a-tag color="red">认证</a-tag> 的 <a-tag>服务号</a-tag>
                                <br>
                                如启用微信公众号登录请再微信公众号配置相关信息
                                <a-tag color="blue" @click="goTab('1')">
                                    点我去配置
                                </a-tag>
                            </p>
                        </a-form-item>
                    </div>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="onSubmit">
                           保存
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <a-tab-pane key="6" tab="其他接口">
                <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                        labelAlign="left"
                >
                    <a-divider orientation="left">API 配置</a-divider>
                    <a-form-item ref="name" label="API 密钥" name="api_secret">
                        <a-input v-model:value="form.api_secret" />
                        <p class="meta">API 通信密钥，不可为空</p>
                    </a-form-item>
                    <a-form-item ref="name" label="调试开关" name="api_debug">
                        <a-switch v-model:checked="form.api_debug"/>
                        <p class="meta">本地调试时，请开启</p>
                    </a-form-item>
                    <a-divider orientation="left">邮箱配置</a-divider>
                    <a-form-item ref="name" label="SMTP服务器" name="appid">
                        <a-input v-model:value="form.appid" />
                    </a-form-item>
                    <a-form-item ref="name" label="用户名" name="appid">
                        <a-input v-model:value="form.appid" />
                        <p>填写邮箱全称，如：example@qq.com</p>
                    </a-form-item>
                    <a-form-item ref="name" label="密码/授权码" name="appid">
                        <a-input v-model:value="form.appid" />
                    </a-form-item>
                    <a-form-item ref="name" label="端口" name="appid">
                        <a-input v-model:value="form.appid" />
                    </a-form-item>
                    <a-divider orientation="left">短信配置</a-divider>
                    <a-form-item ref="name" label="主帐号" name="appid">
                        <a-input v-model:value="form.accountSid" />
                    </a-form-item>
                    <a-form-item ref="name" label="Token" name="accountToken">
                        <a-input v-model:value="form.accountToken" />
                    </a-form-item>
                    <a-form-item ref="name" label="AppId" name="appid">
                        <a-input v-model:value="form.appid" />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="onSubmit">
                            保存
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
        </a-tabs>
    </a-card>
</template>


<script>
  export default {
    data() {
      return {
        activeTab: '1',
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        other: '',
        form: {
          weixin_mp_type: '1',
          weixin_mp_url: '',
          weixin_mp_appid: '',
          weixin_mp_apps_secret: '',
          weixin_mp_token: '',
          weixin_mp_asekey: '',
          weixin_mp_id: '',
          weixin_mp_qr: '',
          weixin_mini_appid: '',
          pay_type: ['wxpay'],
          pay_type_options: [
            { label: '微信支付', value: 'wxpay' },
            { label: '支付宝支付', value: 'alipay' },
            { label: '线下支付', value: 'offlinepay' },
          ],
          wxpay_mch_id: '',
          wxpay_appid: '',
          wxpay_secret: '',
          alipay_appid: '',
          alipay_private_key: '',
          object_type: '1',
          object_oos_key: '',
          object_oos_secret: '',
          object_oos_bucket: '',
          object_oos_cdn: '',
          object_oos_url: '',
          object_qiniu_key: '',
          object_qiniu_secret: '',
          object_qiniu_bucket: '',
          object_qiniu_cdn: '',
          object_qiniu_url: '',
          object_cos_key: '',
          object_cos_secret: '',
          object_cos_bucket: '',
          object_cos_cdn: '',
          object_cos_url: '',
          login_type: [],
          login_type_options: [
            { label: 'QQ 登录', value: 'qq' },
            { label: '微信 PC 登录', value: 'wechat_web' },
            { label: '微信公众号登录', value: 'wechat_mp' },
          ],
          login_qq_appid: '',
          login_qq_app_secret: '',
          login_wechat_web_appid: '',
          login_wechat_web_secret: '',
          api_debug: false,
          api_secret: '',
          smpt_account: '',
          smpt_passwd: '',
          smpt_port: '',
          smpt_url: '',
          sms_account: '',
          sms_sid: '',
          sms_token: '',
          sms_key: '',
        },
        rules: {
        },
      };
    },
    created() {
      if (this.form.api_secret.length !== 32) {
        this.form.api_secret = this.randomStr(32)
      }

    },
    methods: {
      uploadChange(info) {
        if (info.file.status === 'done') {
          this.$message.success(`上传成功`);
          this.form[info.file.response.data.type] = info.file.response.data.url
        } else if (info.file.status === 'error') {
          this.$message.error(`上传错误`);
        }
      },
      goTab(index) {
        console.log()
        this.activeTab = index
      },
      randomStr(len) {
        let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let length = $chars.length;
        let str = '';
        for (let i = 0; i < len; i++) {
          str += $chars.charAt(Math.floor(Math.random() * length));
        }
        return str
      },
      onSubmit() {
        this.$refs.ruleForm
          .validate()
          .then(() => {
            console.log(JSON.stringify(this.form))
          })
          .catch(error => {
            console.log('error', error);
          });
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      },
    },
  };
</script>

<style lang="scss" scoped>
    .setting{
        .ant-form {
            padding: 0 15px;
        }
    }
</style>
