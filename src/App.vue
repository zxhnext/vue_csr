<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<style>
  body{ margin: 0;padding: 0;font-family: "MicrosoftYaHei";overflow: hidden;}
  body,html{-webkit-text-size-adjust: none;width: 100%;height: 100%;touch-action: none;}
  *{text-decoration: none;list-style: none;}
  img{border: 0px;}
  ul,li,dl,dd,dt,p,ol,h1,h2,h3,h4,h5{padding: 0;margin: 0;}
  .fl{float: left;}
  .fr{float: right;}
  a,input,button{ outline:none;border: none; background: transparent; }
  :root{
    --mianColor: #ffc001;
    --absolutely: 100%;
  }
  html, body{
    width: var(--absolutely);
    height: var(--absolutely);
    background: black;
  }
  #app {
    color: green;
  }
</style>