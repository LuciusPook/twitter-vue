<template>
  <div class="content">
    <div class="ring">
      <p>Alphitter</p>
      <span></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  // left: 0;
  z-index: 99;
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border: 3px solid #3c3c3c;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

p {
  line-height: 145px;
  text-align: center;
  font-family: sans-serif;
  font-size: 17px;
  color: #ff6600;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-shadow: 0 0 10px #ff6600;
  animation: word 1s infinite linear;
  animation-direction: alternate;
}

.ring:before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 150px;
  height: 150px;
  border: 3px solid transparent;
  border-top: 3px solid #ff6600;
  border-right: 3px solid #ff6600;
  border-radius: 50%;
  animation: animateCircle 2s linear infinite;
}

span {
  display: block;
  position: absolute;
  top: calc(50% - 2px);
  left: 50%;
  width: 50%;
  height: 4px;
  background: transparent;
  transform-origin: left;
  animation: animate 2s linear infinite;
}

span:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ff6600;
  top: -6px;
  right: -8px;
  box-shadow: 0 0 20px #ff6600;
}

@keyframes animateCircle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes animate {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}

@keyframes word {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>