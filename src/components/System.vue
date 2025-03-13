<template>
  <div>
    <h1>Система</h1>
    <hr />

    <div class="form-list">
      <!--  <div id="inb">-->
      <div>
        <p>Производитель</p>
        <input class="unchange" disabled value="{{Manufacturer}}" type="text" />
      </div>
      <div>
        <p>Серийный номер</p>
        <input class="unchange" disabled value="{{sn}}" type="text" />
      </div>
    </div>
    <div class="form-list">
      <div>
        <p>Модель</p>
        <input class="unchange" disabled value="{{Model}}" type="text" />
      </div>
      <div>
        <p>Версия модели</p>
        <input
          class="unchange"
          disabled
          value="{{Model_version}}"
          type="text"
        />
      </div>
    </div>
    <div>
      <div>
        <p>Версия прошивки</p>
        <input
          class="unchange"
          disabled
          value="{{Firmware_version}}"
          type="text"
        />
      </div>
      <div>
        <p>Время работы</p>
        <input class="unchange" disabled value="{{uptime}}" type="text" />
      </div>
    </div>

    <div class="form-list">
      <div>
        <p>Загрузка ЦП, %</p>
        <input class="unchange" disabled value="{{procload}}" type="text" />
      </div>
      <div>
        <p>Загрузка памяти, %</p>
        <input class="unchange" disabled value="{{mem}}" type="text" />
      </div>
    </div>

    <div>
      <p>Дата и время</p>
      <input class="unchange" disabled value="{{date}}" type="text" />
    </div>

    <div class="form-list">
      <div>
        <p>IP-сервера</p>
        <input class="" value="" type="text" />
      </div>
      <div>
        <p>Ключ сервера</p>
        <input class="" value="" type="text" />
      </div>
    </div>
    <div class="form-list">
      <div>
        <p>Логин</p>
        <input class="" value="root" type="text" />
      </div>
      <div>
        <p>Пароль</p>
        <input class="" value="afwawf" type="password" />
      </div>
    </div>

    <div class="local_button">
      <button class="btn" onclick="">Применить</button>
      <button class="btn btn_cancel" onclick="">Отменить</button>
    </div>
  </div>
</template>

<script></script>

<style></style>
