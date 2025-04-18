<template>
    <div>
      <h2>Диапазоны IP-адресов</h2>
      <div>
        <p>Текущий диапазон: {{ range.start }} - {{ range.end }}</p>
        <input v-model="newRangeStart" placeholder="Начальный IP" />
        <input v-model="newRangeEnd" placeholder="Конечный IP" />
        <button @click="updateRange">Обновить диапазон</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        range: {},
        newRangeStart: '',
        newRangeEnd: ''
      };
    },
    methods: {
      fetchRange() {
        axios.get('/api/dhcp/ranges')
          .then(response => {
            this.range = response.data.range;
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
        axios.post('/api/dhcp/ranges', data)
          .then(() => {
            alert('Диапазон обновлён');
            this.fetchRange();
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    created() {
      this.fetchRange();
    }
  };
  </script>
  