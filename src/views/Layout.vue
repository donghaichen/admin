<template>
    <a-spin class="global-loading" v-if="globalLoading"/>
    <a-progress class="loading-bar" v-show="loadingBar" strokeWidth="3" :showInfo="false" :percent="loadingPercent" />
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider v-model:collapsed="collapsed" collapsedWidth="50" :trigger="null" :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }" collapsible>
            <div class="sider-logo">
                <a>
                    <img src="../assets/img/logo-tran.png" alt="logo">
                    <h1 v-if="!collapsed">后台管理系统</h1>
                </a>
            </div>
            <a-menu
                    v-model:openKeys="openKeys"
                    v-model:selectedKeys="selectedKeys"
                    @openChange="openChange"
                    @select="select"
                    mode="inline"
                    theme="dark"
                    :multiple="false"
                    :inline-collapsed="collapsed"
                    v-for="(item, index) in nav" :key="index"
            >
                <a-menu-item v-if="!item.sub" :key="index">
                    <span v-if="index === 0">
                        <DashboardOutlined />
                    </span>
                    <span v-else-if="index === 6">
                        <ShoppingCartOutlined />
                    </span>
                    <span class="title">{{item.title}}</span>
                </a-menu-item>
                <a-sub-menu v-else :key="'sub' + index">
                    <template v-slot:title>
                         <span v-if="index ===1">
                            <SettingOutlined />
                         </span>
                        <span v-else-if="index === 2">
                            <ClusterOutlined />
                        </span>
                        <span v-else-if="index === 3">
                            <BarsOutlined />
                        </span>
                        <span v-else-if="index === 4">
                            <FormOutlined />
                        </span>
                        <span v-else-if="index === 5">
                            <LineChartOutlined />
                        </span>
                        <span v-else-if="index === 7">
                            <TeamOutlined />
                        </span>
                        <span v-else-if="index === 8">
                           <InsuranceOutlined />
                        </span>
                        <span class="title">{{item.title}}</span>
                    </template>
                    <a-menu-item v-for="(subItem, subIndex) in item.sub" :key="'sub' + index + '-' + subIndex">
                        {{subItem.title}}
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <div v-if="collapsed" style="width: 50px; overflow: hidden; flex: 0 0 50px; max-width: 50px; min-width: 50px;"></div>
        <div v-if="!collapsed" style="width: 200px; overflow: hidden; flex: 0 0 200px; max-width: 208px; min-width: 200px;"></div>
        <a-layout style="position: relative;">
            <a-layout-header :style="collapsed ? headerStyle : headerWideStyle" class="layout-header">
                <div class="global-header">
                    <div style="flex: 1 1 0%;">
                        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
                        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                    </div>
                    <div class="layout-right">
                        <a-tooltip placement="bottom">
                            <template v-slot:title>
                                <span>访问网站</span>
                            </template>
                            <a href="/" target="_blank" style="font-size: 16px; padding: 0 10px;" role="img">
                                <HomeOutlined />
                            </a>
                        </a-tooltip>
                        <a-tooltip placement="bottom">
                            <template v-slot:title>
                                <span>清除缓存</span>
                            </template>
                            <a @click="clearCache" style="font-size: 16px; padding: 0 10px;" role="img">
                                <ClearOutlined />
                            </a>
                        </a-tooltip>
                        <a-dropdown>
                            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                <a-avatar size="small" src="https://i.gtimg.cn/club/item/face/img/8/15918_100.gif"/>
                                Hello, admin
                                <DownOutlined />
                            </a>
                            <template v-slot:overlay>
                                <a-menu>
                                    <a-menu-item key="0">
                                        <span role="img" aria-label="user" class="anticon anticon-user"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg></span>
                                        个人中心
                                    </a-menu-item>
                                    <a-menu-item key="1">
                                        <span role="img" aria-label="setting" class="anticon anticon-setting"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="setting" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"></path></svg></span>
                                        个人设置
                                    </a-menu-item>
                                    <a-menu-divider />
                                    <a-menu-item key="3">
                                        <span role="img" aria-label="logout" class="anticon anticon-logout"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="logout" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z"></path></svg></span>
                                        退出登录
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                        <a-dropdown>
                            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                <i class="anticon" style="color:rgba(0, 0, 0, 0.5);font-size: 16px;">
                                    <TranslationOutlined />
                                </i>
                                <DownOutlined />
                            </a>
                            <template v-slot:overlay>
                                <a-menu>
                                    <a-menu-item>
                                        <span role="img" aria-label="English">🇺🇸</span> English
                                    </a-menu-item>
                                    <a-menu-item>
                                        <span role="img" aria-label="简体中文">🇨🇳</span> 简体中文
                                    </a-menu-item>
                                    <a-menu-item>
                                        <span role="img" aria-label="繁体中文">🇹🇼</span> 繁体中文
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>

                    </div>
                </div>
            </a-layout-header>
            <a-layout-content class="global-content">
                <transition name="fade-transform" mode="out-in">
                    <router-view :key="key" />
                </transition>
                <a-back-top style="right: 10px" />
            </a-layout-content>
            <a-layout-footer>
                <div class="ant-pro-global-footer-copyright" style="text-align: center">
                    Copyright © 2020 蚂蚁集团技术部出品
                </div>
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
  import {
    DashboardOutlined,
    ShoppingCartOutlined,
    SettingOutlined,
    ClusterOutlined,
    BarsOutlined,
    FormOutlined,
    LineChartOutlined,
    TeamOutlined,
    InsuranceOutlined,
    // PieChartOutlined,
    // MailOutlined,
    // DesktopOutlined,
    // InboxOutlined,
    // AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    ClearOutlined,
    TranslationOutlined,
  } from '@ant-design/icons-vue';

  export default {
    components: {
      DashboardOutlined,
      ShoppingCartOutlined,
      SettingOutlined,
      ClusterOutlined,
      BarsOutlined,
      FormOutlined,
      LineChartOutlined,
      TeamOutlined,
      InsuranceOutlined,
      // PieChartOutlined,
      // MailOutlined,
      // DesktopOutlined,
      // InboxOutlined,
      // AppstoreOutlined,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
      HomeOutlined,
      ClearOutlined,
      TranslationOutlined,
    },
    data() {
      return {
        loadingBar: false,
        loadingPercent: 0,
        selectedKeys: [0],
        openKeys: [''],
        preOpenKeys: ['sub1'],
        nav: [],
        collapsed: false,
        globalLoading: true,
        headerStyle: 'background: #fff; padding: 0;position: fixed; width: calc(100vw - 50px);',
        headerWideStyle: 'background: #fff; padding: 0;position: fixed; width: calc(100vw - 200px);',
      };
    },
    watch: {
      openKeys(val, oldVal) {
        this.preOpenKeys = oldVal;
      },
    },
    mounted() {
      this.init()

    },
    // create() {
    //
    //   // this.getNav()
    //   // this.init()
    // },
    methods: {
      init() {
        setTimeout(() => {
          this.globalLoading = false
        }, 800)
        // if (this.loadingPercent < 100) {
        //   setInterval(() => {
        //     this.loadingPercent = this.loadingPercent + 1
        //   }, 100)
        // }else {
        //   this.loadingBar = false
        // }

        this.getNav()
      },
      getNav() {
        let nav = localStorage.getItem('nav')
        if(nav !== null && JSON.parse(nav).length > 0) {
          this.nav = JSON.parse(nav)
        }else{
          fetch("http://demo.haoyupay.com/admin/api/v3/user/nav")
            .then(res => {
              return res.json();
            })
            .then(res => {
              // 这里返回的数据就是我们想要请求的json数据
              localStorage.setItem('nav', JSON.stringify(res.data))
              this.nav = res.data
            })
        }
      },
      openChange(openKeys) {
        let end = openKeys.pop()
        this.openKeys = [end]
      },
      select(e) {
        console.log(e)
      },
      clearCache() {
        let key = 'clearCache'
        this.$message.loading({ content: '缓存数据清理中...', key });
        setTimeout(() => {
          this.$message.success({ content: '数据缓存已清理完毕，请【Ctrl + F5】强制刷新试试！', key, duration: 2 });
        }, parseInt(Math.random() * 3000))
      }
    },
  };
</script>
<style lang="scss" scoped>
    $loadingBg:rgba(45, 58, 75, .3);
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        transition: color 0.3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }
    .ant-menu-inline-collapsed{
        width: 50px;
    }
    .ant-layout-sider-collapsed .ant-menu-item, .ant-layout-sider-collapsed .ant-menu-submenu .ant-menu-submenu-title{
        padding: 0 15px !important;
    }
    .ant-layout-sider-collapsed li span.title{
        display: none;
    }
    .loading-bar{
        position: fixed;
        z-index: 99;
        top: -11px;
    }
    .sider-logo {
        position: relative;
        display: flex;
        align-items: center;
        padding: 16px;
        line-height: 32px;
        cursor: pointer;
    }
    .ant-layout-sider-collapsed .sider-logo{
        padding:  10px 5px;
    }
    .sider-logo img {
        display: inline-block;
        height: 40px;
        vertical-align: middle;
        transition: height .2s;
    }
    .sider-logo h1 {
        display: inline-block;
        height: 32px;
        margin: 0 0 0 12px;
        color: #fff;
        font-weight: 600;
        font-size: 16px;
        line-height: 32px;
        vertical-align: middle;
        animation: fade-in;
        animation-duration: .2s;
    }
    .global-loading{
        position: fixed!important;
        min-height: 100%;
        width: 100%;
        background-color: $loadingBg;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        z-index: 999;
        opacity: 1;
    }
    .layout-header{
        padding: 0px;
        height: 50px;
        line-height: 50px;
        width: 100%;
        z-index: 9;
    }
    .global-header{
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 16px;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
    }
    .global-header .layout-right{display:flex;float:right;height:50px;margin-left:auto;overflow:hidden}
    .global-header .layout-right a {
        color: rgba(0,0,0,.6);
    }
    .global-header .layout-right a:hover {
        background: rgba(0,0,0,.025);
    }
    .global-header .layout-right .ant-dropdown-trigger{
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 10px;
        cursor: pointer;
        transition: all .3s;
    }
    .global-header .layout-right .ant-dropdown-trigger i{
        font-size: 20px;
    }
    .global-header .layout-right .ant-dropdown-trigger .ant-avatar{
        margin-right: 5px;
    }
    .global-content{
        margin: 70px 15px 16px;
        min-height: calc(100vh - 140px);
        position: relative;
        overflow: hidden;
    }
</style>
