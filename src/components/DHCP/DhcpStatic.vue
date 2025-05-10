<template>
    <div>
      <h2>Статические арендованные IP</h2>
      <ul>
        <li v-for="staticLease in staticLeases" :key="staticLease.mac">{{ staticLease.ip }} - {{ staticLease.mac }}</li>
      </ul>
      <input v-model="mac" placeholder="MAC-адрес" />
      <input v-model="ip" placeholder="IP-адрес" />
      <button @click="addStaticLease">Добавить статическую аренду</button>
      <button @click="removeStaticLease">Удалить статическую аренду</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        staticLeases: [],
        mac: '',
        ip: ''
      };
    },
    methods: {
      fetchStaticLeases() {
        axios.get('/api/dhcp/static/list')
          .then(response => {
            this.staticLeases = response.data.leases;
          })
          .catch(error => {
            console.error(error);
          });
      },
      addStaticLease() {
        const data = { mac: this.mac, ip: this.ip };
        axios.post('/api/dhcp/static/add', data)
          .then(() => {
            alert('Статическая аренда добавлена');
            this.fetchStaticLeases();
          })
          .catch(error => {
            console.error(error);
          });
      },
      removeStaticLease() {
        const data = { mac: this.mac, ip: this.ip };
        axios.post('/api/dhcp/static/remove', data)
          .then(() => {
            alert('Статическая аренда удалена');
            this.fetchStaticLeases();
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    created() {
      this.fetchStaticLeases();
    }
  };
  </script>
  