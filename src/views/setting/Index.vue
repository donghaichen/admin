<template>
    <a-card :bordered="false" class="setting">
        <a-tabs @change="callback">
            <a-tab-pane key="1" tab="基本设置">
                <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                        labelAlign="left"
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
                    <a-form-item label="手机站域名" name="site_mobile_domain">
                        <a-input v-model:value="form.site_mobile_domain" />
                        <p class="meta">域名格式如 m.example.com 不带 http 结尾不带斜杠 </p>
                    </a-form-item>
                    <a-form-item label="站点 LOGO" name="site_logo">
                        <a-upload
                                name="file"
                                list-type="picture-card"
                                class="avatar-uploader"
                                :show-upload-list="false"
                                action="https://demo.haoyupay.com/admin/api/v3/upload?type=site_logo"
                                @change="uploadChange"
                                accept=".jpg,.png,.jpeg"
                        >
                            <img style="height: 80px" v-if="form.site_logo.length > 0 && uploadLoading === false" :src="form.site_logo" />
                            <div v-else>
                                <!-- todo -->
                                <loading-outlined v-if="uploadLoading" />
                                <plus-outlined v-else />
                                <div class="ant-upload-text">上传</div>
                            </div>
                        </a-upload>
                        <p class="meta">点击图片可再次上传以更改图片 </p>
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
                    <a-form-item :wrapper-col="{ span: 14, offset: 3 }">
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
                        labelAlign="left"
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
                        <a-upload
                                name="file"
                                list-type="picture-card"
                                class="avatar-uploader"
                                :show-upload-list="false"
                                :headers="headers"
                                action="https://demo.haoyupay.com/admin/api/v3/upload?type=contact_qrcode"
                                @change="uploadChange"
                        >
                            <img style="height: 100px" v-if="form.contact_qrcode.length > 0 && uploadLoading === false" :src="form.contact_qrcode" />
                            <div v-else>
                                <!-- todo -->
                                <loading-outlined v-if="uploadLoading" />
                                <plus-outlined v-else />
                                <div class="ant-upload-text">上传</div>
                            </div>
                        </a-upload>
                        <p class="meta">点击图片可再次上传以更改图片 </p>
                    </a-form-item>
                    <a-form-item label="电子邮箱" name="contact_email">
                        <a-input v-model:value="form.contact_email" />
                    </a-form-item>
                    <a-form-item label="联系地址" name="contact_address">
                        <a-input v-model:value="form.contact_address" />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 3 }">
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
                        labelAlign="left"
                >
                    <a-divider orientation="left">系统安全设置</a-divider>
                    <a-form-item label="网站开关" name="security_status">
                        <a-switch v-model:checked="form.security_status"/>
                    </a-form-item>
                    <a-form-item v-if="!form.security_status" label="关闭原因" name="security_close_info">
                        <a-input v-model:value="form.security_close_info" />
                    </a-form-item>
                    <a-form-item label="开启 SSL" name="security_ssl_status">
                        <a-switch v-model:checked="form.security_ssl_status"/>
                        <p class="meta">SSL 通信加密需要证书支持， 请选择浏览器信任的证书厂家申请证书</p>
                    </a-form-item>
                    <a-form-item v-if="form.security_ssl_status" label="证书公钥" name="security_ssl_plubic_key">
                        <a-textarea :autosize="true" v-model:value="form.security_ssl_plubic_key" />
                    </a-form-item>
                    <a-form-item v-if="form.security_ssl_status" label="证书私钥" name="security_ssl_private_key">
                        <a-textarea :autosize="true" v-model:value="form.security_ssl_private_key" />
                    </a-form-item>
                    <a-form-item v-if="form.security_ssl_status" label="私钥密码" name="security_ssl_passwd">
                        <a-input v-model:value="form.security_ssl_passwd" />
                        <p class="meta">如无密码请留空</p>
                    </a-form-item>
                    <a-form-item label="登录尝试次数" name="security_login_try_count">
                        <a-input v-model:value="form.security_login_try_count" />
                        <p class="meta">登录超过尝试次数该用户和 IP 会被系统限制登录 24 小时</p>
                    </a-form-item>
                    <a-divider orientation="left">文件安全设置</a-divider>
                    <a-form-item label="最大上传限制" name="form.upload_max_filesize">
                        <a-input v-model:value="form.upload_max_filesize" />
                        <p class="meta">单位：M</p>
                    </a-form-item>
                    <a-form-item label="允许上传文件格式" name="security_upload_type">
                        <a-input v-model:value="form.allow_upload_filetype" />
                        <p class="meta">基于系统安全考虑，应当禁止上传可执行文件或者其他对系统造成安全隐患的文件格式
                            <br>如（exe, sh, js, php, py）等文件不允许上传</p>
                    </a-form-item>
                    <a-form-item label="上传水印" name="watermark_status">
                        <a-switch v-model:checked="form.watermark_status"/>
                    </a-form-item>
                    <a-form-item v-if="form.watermark_status === true" label="水印类型" name="watermark_type">
                        <a-radio-group name="radioGroup" v-model:value="form.watermark_type">
                            <a-radio value="1">
                                图片水印
                            </a-radio>
                            <a-radio value="2">
                                文字水印
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item v-if="form.watermark_status === true && form.watermark_type === '1'" label="水印图片" name="watermark_logo">
                        <a-upload
                                name="file"
                                list-type="picture-card"
                                class="avatar-uploader"
                                :show-upload-list="false"
                                action="https://demo.haoyupay.com/admin/api/v3/upload?type=watermark_logo"
                                @change="uploadChange"
                        >
                            <img style="height: 80px" v-if="form.watermark_logo.length > 0 && uploadLoading === false" :src="form.watermark_logo" />
                            <div v-else>
                                <!-- todo -->
                                <loading-outlined v-if="uploadLoading" />
                                <plus-outlined v-else />
                                <div class="ant-upload-text">上传</div>
                            </div>
                        </a-upload>
                        <p class="meta">水印图片优先级高于水印文字，如需文字水印，请清空水印图片并设置文字水印</p>
                    </a-form-item>
                    <a-form-item v-if="form.watermark_status === true && form.watermark_type === '2'" label="水印文字" name="watermark_text">
                        <a-input v-model:value="form.watermark_text" />
                    </a-form-item>
                    <a-form-item v-if="form.watermark_status === true" label="水印位置" name="watermark_position">
                        <a-radio-group v-model:value="form.watermark_position" button-style="solid" style="width: 180px;">
                            <a-radio-button value="a">
                                左上
                            </a-radio-button>
                            <a-radio-button value="b">
                                中上
                            </a-radio-button>
                            <a-radio-button value="c">
                                右上
                            </a-radio-button>
                            <a-radio-button value="d">
                                左中
                            </a-radio-button>
                            <a-radio-button value="e">
                                正中
                            </a-radio-button>
                            <a-radio-button value="f">
                                右中
                            </a-radio-button>
                            <a-radio-button value="g">
                                左下
                            </a-radio-button>
                            <a-radio-button value="h">
                                中下
                            </a-radio-button>
                            <a-radio-button value="i">
                                右下
                            </a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 3 }">
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
                        labelAlign="left"
                >
                    <a-form-item label="开放注册" name="user_allow_register">
                        <a-switch v-model:checked="form.user_allow_register" />
                    </a-form-item>
                    <a-form-item label="注册审核" name="user_register_verify">
                        <a-radio-group name="radioGroup" v-model:value="form.user_register_verify">
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
                    <a-form-item label="不允许字符串" name="user_register_limit_str">
                        <a-textarea :autosize="true" v-model:value="form.user_register_limit_str" />
                        <p class="meta">
                            设置不允许包含在账号中的字符串，多个字符串以英文逗号“,”分隔
                        </p>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 3 }">
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
                        labelAlign="left"
                >
                    <a-form-item label="SKU 配置" name="product_sku">
                        <a-textarea :autosize="true" v-model:value="form.product_sku" />
                        <p class="meta">
                            一行一个SKU,所有符号必须是英文半角符号 <br> 例如：<br>
                            &emsp;&emsp;颜色:赤,橙,黄,绿,青,蓝,紫<br>
                            &emsp;&emsp;大小:大,中,小<br>
                            &emsp;&emsp;产地:中国,美国,日本<br>
                        </p>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 3 }">
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
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  export default {
    components: {
      LoadingOutlined,
      PlusOutlined,
    },
    data() {
      return {
        uploadLoading: false,
        labelCol: { span: 3 },
        wrapperCol: { span: 12 },
        fileList: [],
        headers: {
          authorization: 'authorization-text',
        },
        other: '',
        form: {
          site_lang: 'zh_CN',
          site_title: '',
          site_domain: '',
          site_mobile_domain: '',
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
          security_close_info: '系统升级中，请稍后再试',
          security_is_ssl: false,
          security_ssl_public_key: '',
          security_ssl_private_key: '',
          security_ssl_private_passwd: '',
          security_login_try_count: '5',
          upload_max_filesize: '10',
          allow_upload_filetype: 'jpg,png,gif,pdf,doc,docx,xsl,xslx,ppt,zip,rar,mp4,txt',
          watermark_status: false,
          watermark_type: '1',
          watermark_logo: '',
          watermark_text: '',
          watermark_position: 'i',
          user_allow_register: true,
          user_register_verify: '1',
          user_register_limit_str: '中国,国家,政府,反动,恐怖,公安,枪,先烈,管理,master,admin',
          product_sku: '颜色:赤,橙,黄,绿,青,蓝,紫\n' +
            '规格:\n' +
            '大小:大,中,小\n' +
            '产地:中国,美国,日本',
        },
        rules: {
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
      uploadChange(info) {
        let file = info.file;
        if (file.status === 'uploading') {
          this.uploadLoading = true;
          return;
        }
        if (file.status === 'done') {
          let response = file.response
          console.log(response.code)
          if (response.code === 0){
            this.$message.success(`上传成功`);
            this.form[response.data.type] = response.data.url
          }else {
            let msg = response.msg
            msg = msg.length > 0 ? msg : '上传错误'
            this.$message.error(msg);
          }
          setTimeout(() => {
            this.uploadLoading = false
          }, 300)
        } else if (file.status === 'error') {
          this.$message.error(`上传错误`)
          this.uploadLoading = false
        }
      },
      onSubmit() {
        this.$refs.ruleForm
          .validate()
          .then(() => {
            console.log(JSON.stringify(this.form));
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
