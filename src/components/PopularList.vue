<template>
  <div class="popular">
    <div class="popular-list">
      <h3>Popular</h3>
      <div class="list">
        <div>
          <a href=""><img src="" alt="" /></a>
        </div>
        <div class="popular-info">
          <a href="" class="popular-name">名字</a>
          <a href="" class="popular-email">@Email</a>
        </div>
        <div>
          <button>跟隨</button>
          <button class="d-none">正在跟隨</button>
        </div>
      </div>
      <div class="list">
        <div>
          <a href=""><img src="" alt="" /></a>
        </div>
        <div class="popular-info">
          <a href="" class="popular-name">名字</a>
          <a href="" class="popular-email">@Email</a>
        </div>
        <div>
          <button>跟隨</button>
          <button class="d-none">正在跟隨</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popular {
  border-left: 1px solid #e6ecf0;
  width: 29%;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.popular-list {
  width: 350px;
  height: 756px;
  margin: 15px 80px 20px 30px;
  background: #f5f8fa;
  border-radius: 14px;
}

.list {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-top: 1px solid #e6ecf0;
}

h3 {
  padding: 10px 15px;
}

img {
  width: 50px;
  height: 50px;
  border: 1px solid;
  border-radius: 50%;
}

.popular-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.popular-name {
  font-size: 15px;
}

.popular-email {
  font-size: 15px;
  color: #657786;
}

button {
  width: 90px;
  height: 35px;
  border: 1px solid #ff6600;
  background: transparent;
  color: #ff6600;
  margin-left: 100px;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background: #ff6600;
  color: #fff;
}
</style>