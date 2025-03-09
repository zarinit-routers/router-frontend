<script setup>


const authMode = import.meta.env.VITE_AUTH_MODE;
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import Headerr from './components/Headerr.vue';
import SideBar from './components/SideBar.vue';

const route = useRoute();
const isLoginPage = route.path === '/';


const router = useRouter();
const login = () => {
    router.push('/'); // Переход на главную страницу
  };
</script>

<template>
<Headerr></Headerr>
<div class="app_card" >
  <SideBar></SideBar>
  
  <!-- <HelloWorld v-if="authMode === 'router'" msg="Vite + Vue" /> -->
  <router-view style="margin-left: 210px;"/>
</div>

</template>

<style>

.app_card{
  margin-top: 90px;
  display: flex;
}
body {
  padding-left: 20%;
  padding-right: 20%;
  background-color: #1B1B1F;
  font-family: "Inter";
  position: relative;
  display: flex;
  justify-content: center;
}

input[type=text],
select {
  &:focus {
    outline-style: solid;
    outline-color: var(--accent-color);
    outline-width: 0.2rem;
  }
}

.language_select {
  padding: 10px;
  width: 130px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #222228;

  margin: 0 5px 0 5px;
  font-family: Inter;
  font-weight: 300;
  font-size: 14px;
  line-height: 16.94px;
  letter-spacing: 0%;

}

.p_setting {
  margin: 15px 0px 15px 0px;
  font-size: 13px;
  color: white;
  padding-left: 18px;
}

#logo {
  width: 189px;
  height: 64px;

}

#side_bar {
  position: absolute;
  /* Абсолютное позиционирование */

  width: 200px;
  /* Ширина сайдбара */
  height: 100vh;
  /* Высота на весь экран */

}

.side_bar_p {
  width: 182px;
  padding: 12px 0px 12px 18px;
  background: #222228;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

a {
  text-decoration: none;
  color: white;
  font-size: 13px;
}

#header {

  padding-top: 2%;
  padding-bottom: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#button {

  float: right;
  display: flex;
}



.h_button_card {
  display: flex;
}

.h_button {


  margin: 0 5px 0 5px;



}

.h_button :hover {
  transition: all;
  transition-duration: 0.3s;
  cursor: pointer;
  opacity: 0.8;
}


.h_but {

  background: #222228;
  height: 39px;
  border: none;
  border-radius: 10px;
  width: 200px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.but {
  background: #222228;
  height: 39px;
  width: 60px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}




#content {
  margin-left: 210px;
  /* Отступ слева для контента */

}

ul.journal {
  padding: .1rem;
}

li.journal-item {
  font-family: monospace;
  list-style: none;
  margin: 0;
}

.side_bar_settings {
  margin: 6px 0px;
}
</style>
