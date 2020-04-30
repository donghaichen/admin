<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}" >
      <div class="logo-c">
<!--        <img src="@/assets/img/logo-tran.png" alt="logo" class="logo">-->
<!--        <span>后台管理系统</span>-->
      </div>
      <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            Item 1
          </template>
          <MenuItem name="1-1">Option 1</MenuItem>
          <MenuItem name="1-2">Option 2</MenuItem>
          <MenuItem name="1-3">Option 3</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            Item 2
          </template>
          <MenuItem name="2-1">Option 1</MenuItem>
          <MenuItem name="2-2">Option 2</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            Item 3
          </template>
          <MenuItem name="3-1">Option 1</MenuItem>
          <MenuItem name="3-2">Option 2</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '220px'}">
      <Header :style="{position: 'fixed', width: 'calc(100% - 220px)', padding: 0,zIndex: 2020, right:0, top:0}" class="layout-header-bar">
        <div class="i-layout-header-trigger i-layout-header-trigger-min">
          <Icon @click.native="collapsedSider" type="ios-menu" size="24"/>
        </div>
        <div class="i-layout-header-trigger i-layout-header-trigger-min">
          <Icon @click.native="collapsedSider" type="ios-sync" size="20"/>
        </div>
        <Breadcrumb>
          <BreadcrumbItem>主控台</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <div class="custom-content">
          <div class="search">
            <Input placeholder="搜索 ..." />
          </div>
          <div class="i-layout-header-trigger i-layout-header-trigger-min">
            <Tooltip content="打开网站前台">
              <Icon type="ios-home-outline" size="22" @click="home" />
            </Tooltip>
          </div>
          <div class="i-layout-header-trigger i-layout-header-trigger-min">
            <Tooltip content="报告 BUG">
              <Icon type="ios-bug-outline" @click="bug" size="22"/>
            </Tooltip>
          </div>
          <div class="i-layout-header-trigger i-layout-header-trigger-min">
            <Tooltip content="通知">
              <Icon type="ios-notifications-outline" @click="notice" size="22"/>
            </Tooltip>
          </div>
          <div class="i-layout-header-trigger i-layout-header-trigger-min" :style="{width: 'auto'}">
            <!-- 下拉菜单 -->
            <Dropdown @on-click="userOperate" @on-visible-change="showArrow">
              <div class="pointer">
                <span><Avatar :src="user.avatar" :style="{margin: '0 5px'}" />Hello, {{user.username}}</span>
                <Icon v-show="arrowDown" type="md-arrow-dropdown"/>
                <Icon v-show="arrowUp" type="md-arrow-dropup"/>
              </div>
              <DropdownMenu slot="list">
                <!-- name标识符 -->
                <DropdownItem name="userInfo"><Icon type="ios-contact-outline" />基本资料</DropdownItem>
                <DropdownItem name="userUpdate"><Icon type="ios-settings-outline" />修改资料</DropdownItem>
                <DropdownItem divided name="login"><Icon type="ios-log-out" />退出登陆</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div class="i-layout-header-trigger i-layout-header-trigger-min" :style="{marginRight: '-15px'}">
            <Dropdown :style="{'paddingRight': 0}">
              <Icon type="md-globe" size="22"/>
              <DropdownMenu slot="list">
                <DropdownItem>简体中文</DropdownItem>
                <DropdownItem>繁體中文</DropdownItem>
                <DropdownItem>English</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

        </div>

      </Header>
      <Content :style="{padding: '0 16px 16px',marginTop: '64px'}">
        <Drawer :closable="false" width="640" v-model="drawer">
          <p>基本信息</p>
          <div class="drawer-profile">
            <Row>
              <Col span="12">
                <Tag type="border">用户名 : </Tag>{{user.username}}
              </Col>
              <Col span="12">
                <Tag type="border">头像  : </Tag><Avatar :src="imgUrl(user.avatar)" icon="ios-person" />
              </Col>
              <Col span="12">
                <Tag type="border">昵称  : </Tag>{{user.nickname}}
              </Col>
              <Col span="12">
                <Tag type="border">邮箱  : </Tag>{{user.email}}
              </Col>
              <Col span="12">
                <Tag type="border">用户状态 : </Tag>
                <Tag type="dot" color="success" v-if="user.status == 1">正常</Tag>
                <Tag type="dot" color="warning" v-if="user.status == 2">禁用</Tag>
                <Tag type="dot" color="error" v-if="user.status !== 1 && user.status !== 2">未知</Tag>
              </Col>
              <Col span="12">
                <Tag type="border">注册时间 : </Tag>{{user.created_at}}
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <Tag type="border">注册IP : </Tag>{{user.created_ip}}
              </Col>
              <Col span="12">
                <Tag type="border">更新时间 : </Tag>{{user.updated_at}}
              </Col>
            </Row>

          </div>
          <Divider />
          <p>个人简介</p>
          <div class="drawer-profile">
            <Row>
              <Col span="24" class="desc">
                {{user.desc}}
              </Col>
            </Row>
          </div>
          <Divider />
          <p>联系方式</p>
          <div class="drawer-profile">
            <Row>
              <Col span="12">
                <Tag type="border">手机号 : </Tag>{{user.mobile}}
              </Col>
              <Col span="12">
                <Tag type="border">个人主页: </Tag>{{user.url}}
              </Col>
            </Row>
          </div>
        </Drawer>
        <Card>
          <!-- 子页面 -->
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </Card>
      </Content>
      <Footer class="layout-footer-center"  :style="{fontSize: '12px'}">
        Code based on Vue, iView development,
        <a :style="{color: '#666'}">
          view more to github <i class="ivu-icon ivu-icon-ios-heart"></i></a>
      </Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      user: {
        username: 'admin',
        avatar: 'http://www.nbycym.com//upload/user/2019-10/72/7c85198acffe6596805bae5f9bf6d9d583ea13.png'
      },
      showLoading: true, // 是否显示loading
      isCollapsed: false,
      arrowUp: false, // 用户详情向上箭头
      arrowDown: true, // 用户详情向下箭头
    }
  },
  computed: {
      },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    },
    // 控制用户三角箭头显示状态
    showArrow(flag) {
      this.arrowUp = flag
      this.arrowDown = !flag
    },
    // 用户操作
    userOperate(name) {
      switch(name) {

        case 'login':
          // 退出登陆 清除用户资料
          localStorage.setItem('token', '')
          this.$router.replace({name})
          break
        case 'userUpdate':
          this.gotoPage(name,{
            uid:localStorage.getItem('uid')
          })
          break
        case 'userInfo':
          this.drawer = true
          break
      }
    },
    home: function () {

    },
    bug: function () {

    },
    notice: function () {

    },
    gotoPage: function(name, params = {}){
      this.$router.push({  //核心语句
        name:name,   //跳转的路径
        query:params,   //跳转的参数
      })
      this.showLoading = false
    },
    imgUrl(src)
    {
      if(src.length <= 0)
      {
        return false
      }
      if(src.substr(0,4).toLowerCase() != "http")
      {
        src = this.api.static.baseUrl + src;
      }
      return src
    },
  }
}
</script>
<style>
  .layout{
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-footer-center{
    text-align: center;
  }
  .ivu-drawer-content{
  margin-top: 64px;
  }
  .ivu-drawer-content p{
    font-size: 16px;
    color: rgba(0,0,0,0.85);
    line-height: 24px;
    display: block;
    margin-bottom: 16px;
  }
  /*header*/
  .i-layout-header-trigger {
    display: block;
    float: left;
    width: 35px;
    height: 64px;
    text-align: center;
    cursor: pointer;
    transition: all .2s ease-in-out;
  }
  .i-layout-header-trigger:hover {
    background: #f8f8f9;
  }
  .i-layout-header-trigger:first-child {
   margin-left: 10px;
  }

  .layout-header-bar .ivu-breadcrumb {
    float: left;
    color: #999;
    font-size: 12px;
    margin-top: -2px;
    margin-left: 8px;
  }
  .layout-header-bar .custom-content{
    float: right;
    height: auto;
    padding-right: 20px;
    line-height: 64px;
  }
  .layout-header-bar .custom-content .search{
    float: left;
    width: 130px;
  }
  .layout-header-bar .custom-content input{
    outline: none;
    border: none;
    background: transparent;
  }
  .layout-header-bar .custom-content input:focus{
    outline: none!important;
    border: none!important;
    box-shadow: none!important;
  }
  .layout-header-bar .ivu-dropdown-item i{
    margin-right: 10px;
  }

  /* 侧边栏 */
  .ivu-layout-sider{
    background: #2f4050;
    width: 220px!important;
    min-width: 220px!important;
    max-width: 220px!important;
    flex: 0 0 220px!important;
    position: fixed;
    height: 100vh;
    left: 0px;
    overflow: auto;
  }
  .ivu-menu-dark {
    background: #2f4050;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
    background: #293846;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu {
    /*border-left: 3px solid #0092DC;*/
    background: #293846;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
    color: #fff;
    background: #293846;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{
    border-left: 2px solid #0092DC;
    background: #293846!important;
  }

  .logo-c {
    display: flex;
    align-items: center;
    color: rgba(255,255,255,.8);
    font-size: 16px;
    margin: 20px 0;
    justify-content: center;
  }
  .logo {
    width: 40px;
    margin-right: 10px;
  }
</style>
