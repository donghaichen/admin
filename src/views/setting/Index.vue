<template>
    <a-card :bordered="false">
        <a-tabs @change="callback">
            <a-tab-pane key="1" tab="基本设置">
                <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                >
                    <a-divider orientation="left">网站配置</a-divider>
                    <a-form-item label="网站语言" name="site_lang">
                        <a-select v-model:value="form.site_lang" placeholder="请选择网站语言">
                            <a-select-option value="zh_CN">
                                简体中文
                            </a-select-option>
                            <a-select-option value="zh_TW">
                                繁体中文
                            </a-select-option>
                            <a-select-option value="en_US">
                                English
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="网站名称" name="site_title">
                        <a-input v-model:value="form.site_title" />
                    </a-form-item>
                    <a-form-item label="站点域名" name="site_domaien">
                        <a-input v-model:value="form.site_domain" />
                        <p class="meta">域名格式如 www.example.com 不带 http 结尾不带斜杠 </p>
                    </a-form-item>
                    <a-form-item label="手机站域名" name="site_domaien">
                        <a-input v-model:value="form.site_mobile_domain" />
                        <p class="meta">域名格式如 m.example.com 不带 http 结尾不带斜杠 </p>
                    </a-form-item>
                    <a-form-item label="站点 LOGO" name="site_logo">
                        <a-input v-model:value="form.site_logo" />
                    </a-form-item>
                    <a-form-item label="备案号" name="site_icp">
                        <a-input v-model:value="form.site_icp" />
                    </a-form-item>
                    <a-form-item label="统计代码" name="site_icp">
                        <a-textarea v-model:value="form.site_analysis_code" />
                    </a-form-item>
                    <a-divider orientation="left">SEO 配置</a-divider>
                    <a-form-item label="首页标题" name="seo_title">
                        <a-textarea v-model:value="form.seo_title" />
                    </a-form-item>
                    <a-form-item label="网站关键字" name="seo_keywords">
                        <a-textarea v-model:value="form.seo_keywords" />
                    </a-form-item>
                    <a-form-item label="网站描述" name="seo_description">
                        <a-textarea v-model:value="form.seo_description" />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="onSubmit">
                            保存
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="联系方式">
                <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                >
                    <a-form-item label="公司名称" name="contact_company">
                        <a-input v-model:value="form.contact_company" />
                    </a-form-item>
                    <a-form-item label="联系人" name="contact_username">
                        <a-input v-model:value="form.contact_username" />
                    </a-form-item>
                    <a-form-item label="服务热线" name="contact_tel">
                        <a-input v-model:value="form.contact_tel" />
                    </a-form-item>
                    <a-form-item label="传真号码" name="contact_fax">
                        <a-input v-model:value="form.contact_fax" />
                    </a-form-item>
                    <a-form-item label="手机号码" name="contact_mobile">
                        <a-input v-model:value="form.contact_mobile" />
                    </a-form-item>
                    <a-form-item label="微信二维码" name="contact_qrcode">
                        <a-input v-model:value="form.contact_qrcode" />
                    </a-form-item>
                    <a-form-item label="电子邮箱" name="contact_email">
                        <a-input v-model:value="form.contact_email" />
                    </a-form-item>
                    <a-form-item label="联系地址" name="contact_address">
                        <a-input v-model:value="form.contact_address" />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="onSubmit">
                            保存
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <a-tab-pane key="3" tab="安全设置">
                <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                >
                    <a-divider orientation="left">系统安全设置</a-divider>
                    <a-form-item label="网站开关" name="security_status">
                        <a-switch v-model:checked="form.security_status" @change="onChange" />
                    </a-form-item>
                    <a-form-item label="关闭原因" name="security_close_info">
                        <a-input v-model:value="form.security_close_info" />
                    </a-form-item>
                    <a-form-item label="开启 SSL" name="security_ssl_status">
                        <a-switch v-model:checked="form.security_ssl_status" @change="onChange" />
                        <p class="meta">SSL 通信加密需要证书支持， 请选择浏览器信任的证书厂家申请证书</p>
                    </a-form-item>
                    <a-form-item label="证书公钥" name="security_ssl_plubic_key">
                        <a-textarea v-model:value="form.security_ssl_plubic_key" />
                    </a-form-item>
                    <a-form-item label="证书私钥" name="security_ssl_private_key">
                        <a-textarea v-model:value="form.security_ssl_private_key" />
                    </a-form-item>
                    <a-form-item label="私钥密码" name="security_ssl_passwd">
                        <a-input v-model:value="form.security_ssl_passwd" />
                        <p class="meta">如无密码请留空</p>
                    </a-form-item>
                    <a-form-item label="登录尝试次数" name="security_login_try_count">
                        <a-input v-model:value="form.security_login_try_count" />
                        <p class="meta">登录超过尝试次数该用户和 IP 会被系统限制登录 24 小时</p>
                    </a-form-item>
                    <a-divider orientation="left">文件安全设置</a-divider>
                    <a-form-item label="最大上传限制" name="security_upload_max_size">
                        <a-input v-model:value="value" />
                        <p class="meta">单位：M</p>
                    </a-form-item>
                    <a-form-item label="允许上传文件格式" name="security_upload_type">
                        <a-input v-model:value="value" />
                        <p class="meta">基于系统安全考虑，应当禁止上传可执行文件或者其他对系统造成安全隐患的文件格式
                            <br>如（exe, sh, js, php, py）等文件不允许上传</p>
                    </a-form-item>
                    <a-form-item label="上传水印" name="security_upload_type">
                        <a-switch v-model:checked="form.security_status" @change="onChange" />
                    </a-form-item>
                    <a-form-item label="水印图片" name="site_icp">
                        <a-input v-model:value="form.site_icp" />
                        <p class="meta">水印图片优先级高于水印文字，如需文字水印，请清空水印图片并设置文字水印</p>
                    </a-form-item>
                    <a-form-item label="水印文字" name="site_icp">
                        <a-textarea v-model:value="form.site_analysis_code" />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="onSubmit">
                            保存
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <a-tab-pane key="4" tab="会员设置">
                <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                >
                    <a-form-item label="开放注册" name="security_status">
                        <a-switch v-model:checked="form.security_status" @change="onChange" />
                    </a-form-item>
                    <a-form-item label="注册审核" name="security_close_info">
                        <a-radio-group name="radioGroup" v-model:value="value">
                            <a-radio value="1">
                                无需审核
                            </a-radio>
                            <a-radio value="2">
                                邮件审核
                            </a-radio>
                            <a-radio value="3">
                                短信审核
                            </a-radio>
                            <a-radio value="4">
                                人工审核
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="不允许字符串" name="site_icp">
                        <a-textarea v-model:value="form.site_analysis_code" />
                        <p class="meta">
                            设置不允许包含在账号中的字符串，多个字符串以英文逗号“,”分隔
                        </p>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="onSubmit">
                            保存
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
            <a-tab-pane key="6" tab="商城设置">
                <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                >
                    <a-form-item label="SKU 配置" name="site_icp">
                        <a-textarea v-model:value="form.site_analysis_code" />
                        <p class="meta">
                            一行一个SKU,所有符号必须是英文半角符号 <br> 例如：<br>
                            &emsp;&emsp;颜色:赤,橙,黄,绿,青,蓝,紫<br>
                            &emsp;&emsp;规格:<br>
                            &emsp;&emsp;大小:大,中,小<br>
                            &emsp;&emsp;产地:中国,美国,日本<br>
                        </p>
                    </a-form-item>
                    <a-form-item label="下单规则" name="security_close_info">
                        <a-radio-group name="radioGroup" v-model:value="value">
                            <a-radio value="1">
                                会员才能下单
                            </a-radio>
                            <a-radio value="2">
                                任何人都能下单
                            </a-radio>
                        </a-radio-group>
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
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
        other: '',
        form: {
          site_lang: 'zh_CN',
          site_title: '',
          site_https: 'Http://',
          site_domain: '',
          site_logo: '',
          site_icp: '',
          site_analysis_code: '',
          seo_title: '',
          seo_keywords: '',
          contact_company: '',
          seo_description: '',
          contact_username: '',
          contact_tel: '',
          contact_fax: '',
          contact_mobile: '',
          contact_qrcode: '',
          contact_email: '',
          contact_address: '',
          security_status: true,
          security_close_info: '',
          //
          // site_close_info: '',
          // site_close_info: '',
          // site_close_info: '',
          // site_close_info: '',
          // site_close_info: '',
          // site_close_info: '',
          region: undefined,
          date1: undefined,
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        rules: {
          name: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
          ],
          region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
          date1: [
            { required: true, message: 'Please pick a date', trigger: 'change', type: 'object' },
          ],
          type: [
            {
              type: 'array',
              required: true,
              message: 'Please select at least one activity type',
              trigger: 'change',
            },
          ],
          resource: [
            { required: true, message: 'Please select activity resource', trigger: 'change' },
          ],
          desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
        },
      };
    },
    methods: {
      callback(key) {
        console.log(key);
      },
      onChange(checked) {
        console.log(`a-switch to ${checked}`);
      },
      onSubmit() {
        this.$refs.ruleForm
          .validate()
          .then(() => {
            console.log('values', this.form);
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

<style scoped>

</style>