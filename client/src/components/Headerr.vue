<template>
  <header>


    <div class="logotip">
      <img src="../assets/logo.svg" alt="">
    </div>
    <div id="button" class="h_card">
      <select class="language_select button_hover" name="language" id="">
        <option value="English" selected>English</option>
        <option value="Russian" selected>Russian</option>
      </select>
      <form class="h_button button_hover" action="" method="POST">
        <button class="h_but button_hover" style="padding-left: 10px;" type="submit">Перезагрузка <img
            style="padding-right: 10px;" src=" ../assets/header_buttons/refresh.svg" alt=""></button>
      </form>
      <form class="h_button button_hover" action="login" @submit.prevent="login" method="POST">
        
        <router-link class="nav_but " to="/" stype="submit"><img src="../assets/header_buttons/exit.svg" alt=""></router-link>
      </form>
    </div>


  </header>
  
</template>

<script>
const authMode = import.meta.env.VITE_AUTH_MODE;
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();


const router = useRouter();
const login = () => {
  router.push('/'); // Переход на главную страницу
};
</script>

<style>
.h_card {
  display: flex;
  margin-right: 10px;
}

header {
  
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  z-index: 1000;
  padding: 0;
  padding-top: 30px;
  margin-bottom: 300px;

  justify-content: space-between;

  align-items: center;
  background-color: #1B1B1F;
}

.header_nav {
  background-color: white;
  border-radius: 15px;
  padding: 10px;
}

:root {
  --accent-color: #2B2D60;
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

.logotip {
 
margin-left: 10px;
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

.nav_but {
  background: #222228;
  height: 39px;
  width: 60px;
  border: none;
  border-radius: 10px;
  padding: 0px;
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