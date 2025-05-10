<template>
  <div>
    <h2>Диапазоны IP-адресов</h2>
    <div v-if="range.start_ip && range.end_ip">
      <p>Текущий диапазон: {{ range.start_ip }} - {{ range.end_ip }}</p>
      <input v-model="newRangeStart" placeholder="Начальный IP" />
      <input v-model="newRangeEnd" placeholder="Конечный IP" />
      <button @click="updateRange">Обновить диапазон</button>
    </div>
    <div v-else>
      <p>Диапазон не установлен</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      range: { start_ip: '', end_ip: '' }, // Инициализация с пустыми значениями для start_ip и end_ip
      newRangeStart: '',
      newRangeEnd: ''
    };
  },
  methods: {
    fetchRange() {
      axios.get('/api/dhcp/ranges')
        .then(response => {
          if (response.data.current_range) {
            this.range = response.data.current_range;
          } else {
            this.range = { start_ip: '', end_ip: '' }; // если нет диапазона, инициализируем пустыми значениями
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateRange() {
      const data = {
        start: this.newRangeStart,
        end: this.newRangeEnd
      };

      // Проверка формата IP-адреса
      const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (!ipPattern.test(this.newRangeStart) || !ipPattern.test(this.newRangeEnd)) {
        alert("Некорректный формат IP-адреса");
        return;
      }

      axios.post('/api/dhcp/ranges', data)
        .then(() => {
          alert('Диапазон обновлён');
          this.fetchRange(); // Обновляем данные после успешного обновления диапазона
        })
        .catch(error => {
          console.error("Ошибка при обновлении диапазона", error);
        });
    }
  },
  created() {
    this.fetchRange(); // загружаем диапазон при создании компонента
  }
};
</script>
