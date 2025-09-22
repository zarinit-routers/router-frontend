import { getToken } from "../auth";
import {ref}  from "vue";
import axios from "axios";




const getCloudStatus =  () => {
    const result = ref({status: {connected: false}});
    
        axios.get('/api/cloud/status',{
            headers: {
                Authorization:  getToken()
            }
        }).then(response => {
            result.value = response.data;
        });
        return result;
    
}


export { getCloudStatus };