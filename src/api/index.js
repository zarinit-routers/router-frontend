import { getToken } from "../auth";
import { ref } from "vue";
import axios from "axios";

const getCloudStatus = () => {
  const result = ref({ status: { connected: false } });

  axios
    .get("/api/cloud/status", {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((response) => {
      result.value = response.data;
    })
    .catch((error) => {
      console.log("Failed get status of cloud connection", error);
    });
  return result;
};
const getCloudConfig = () => {
  const result = ref({ passphrase: "", organizationId: "" });

  axios
    .get("/api/cloud/config", {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((response) => {
      result.value = response.data;
    })
    .catch((error) => {
      console.log("Failed get status of cloud connection", error);
    });
  return result;
};

export { getCloudStatus, getCloudConfig };
