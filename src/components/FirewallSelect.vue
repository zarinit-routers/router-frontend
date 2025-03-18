<template>
    <div class="firewall-control">
      <div class="toggle-wrapper">
        <label class="switch">
          <input
            type="checkbox"
            v-model="isEnabled"
            @change="handleToggle"
            :disabled="isPending"
          />
          <span class="slider"></span>
        </label>
        <span class="status-label">
          {{ isEnabled ? 'Enabled' : 'Disabled' }}
        </span>
      </div>
      <div v-if="lastUpdate" class="update-info">
        Last updated: {{ lastUpdate }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isEnabled: false, 
        isPending: false,
        lastUpdate: null,
      };
    },
    async mounted() {
      await this.refreshStatus(); 
    },
    methods: {
      async refreshStatus() {
        try {
          const response = await fetch('/api/firewall/status');
          if (!response.ok) throw new Error(`HTTP error ${response.status}`);
          const data = await response.json();
          this.isEnabled = data.active; 
          this.lastUpdate = new Date().toLocaleTimeString();
        } catch (error) {
          console.error('Status check failed:', error);
          this.lastUpdate = 'Update failed';
        }
      },
      async handleToggle() {
        this.isPending = true;
        const action = this.isEnabled ? 'disable' : 'enable';
  
        try {
          const response = await fetch(`/api/firewall/${action}`, {
            method: 'POST',
          });
  
          if (!response.ok) throw new Error(`HTTP error ${response.status}`);
  
          const data = await response.json();
          this.isEnabled = data.active; 
          this.lastUpdate = new Date().toLocaleTimeString();
        } catch (error) {
          this.isEnabled = false;
          console.error(`Failed to ${action} firewall:`, error);
          await this.refreshStatus(); 
          alert(`Failed to ${action} firewall. Current status: ${this.isEnabled ? 'Enabled' : 'Disabled'}`);
        } finally {
          this.isPending = false;
        }
      },
    },
  };
  </script>
  
  <style>
  .firewall-control {
    padding: 20px;
    background: #37343D;
    border-radius: 10px;
    max-width: 300px;
    text-align: center;
  }
  
  .toggle-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .switch {
    position: relative;
    width: 60px;
    height: 34px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #4CAF50;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  .status-label {
    color: #e0e0e0;
    font-size: 16px;
    font-weight: 500;
    margin-left: 15px;
  }
  
  .update-info {
    color: #777;
    font-size: 12px;
    margin-top: 8px;
  }
  </style>