<template>
  <div class="menu">
    <div class="navbar">
      <div class="nav-list">
        <div class="link">
          <img
            src="https://i.ibb.co/WD1YSyW/Logo.jpg"
            alt="Logo"
            class="logo"
          />
          <a href=""
            ><img src="" alt="" class="icon-img" />首頁</a
          >
          <a href=""
            ><icon iconName="icon_userUser" />
            <img src="" alt="user" class="icon-img" />個人資料</a
          >
          <a href=""><img src="" alt="" class="icon-img" />設定</a>
          <button>推文</button>
        </div>
        <div class="logout">
          <a href=""><img src="" alt="" class="icon-img" />登出</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  width: 25%;
}

.navbar {
  height: 100%;
  padding: 14px 0 14px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #e6ecf0;
}

.nav-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logo {
  width: 30px;
  height: 30px;
}

.icon-img {
  width: 24px;
  height: 24px;
  margin-right: 21px;
}

.icon-img:hover {
  color: #ff6600;
}

.logo {
  margin-bottom: 35px;
}

a {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
  font-weight: bold;
}

a:hover {
  color: #ff6600;
}

button {
  width: 210px;
  height: 38px;
}

.logout a {
  margin: 0;
}
</style>