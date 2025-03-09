<template>
    <div class="" id="side_bar">
        <div class="side_bar_p">
            <Router-link class="side_bar_settings" to="/home" >Монитор</Router-link>
        </div>
        <p class="p_setting">Настройки</p>
        <div class="side_bar_p">
            <Router-link class="side_bar_settings" to="/system">Система</Router-link>
            <Router-link class="side_bar_settings" href="{mobiles}">Мобильная связь</Router-link>
            <Router-link class="side_bar_settings" href="{wifi}">Wi-Fi сеть</Router-link>
            <Router-link class="side_bar_settings" to="/system">Локальная сеть</Router-link>
            <Router-link class="side_bar_settings" href="{firewall' %}">Брандмауэр</Router-link>
            <Router-link class="side_bar_settings" href="{% url 'systemjournal' %}">Системный журнал</Router-link>
            <Router-link class="side_bar_settings" href="{% url 'map' %}">Карта</Router-link>
        </div>

    </div>
</template>

<script>
</script>

<style scoped>

</style>
