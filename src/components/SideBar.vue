<template>
    <div class="container mx-auto " id="side_bar">
        <div class="side_bar_p w-[200px] bg-[#222228] rounded-[10px] p-[20px]">
            <Router-link class="" to="/home" >Монитор</Router-link>
        </div>
        <p class="w-[200px] p-[20px] ">Настройки</p>
        <div class="flex flex-col w-[200px] bg-[#222228] rounded-[10px] p-[20px]">
            <Router-link class="" to="/system">Система</Router-link>
            <Router-link class="my-[15px]" href="{mobiles}">Мобильная связь</Router-link>
            <Router-link class="" href="{wifi}">Wi-Fi сеть</Router-link>
            <Router-link class="my-[15px]" to="/system">Локальная сеть</Router-link>
            <Router-link class="" href="{firewall' %}">Брандмауэр</Router-link>
            <Router-link class="my-[15px]" href="{% url 'systemjournal' %}">Системный журнал</Router-link>
            <Router-link class="" href="{% url 'map' %}">Карта</Router-link>
        </div>

    </div>
</template>

<script>
</script>

<style scoped>

</style>
