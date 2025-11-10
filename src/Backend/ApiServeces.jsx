import axios from "axios";
import Cookies from 'universal-cookie';

export const getData = async (url, customHeaders = {}) => {
 const cookies = new Cookies();
  const token = cookies.get("access_token");
  const headers = {
    Authorization: token ? `Bearer ${token}` : "",
    ...customHeaders,
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
     console.error("AXIOS ERROR:", error); 
    throw error.response ? error.response.data : error;
  }
};

export const postData = async (url, body = {}, customHeaders = {}, isFormData = false) => {
  const headers = {
    ...customHeaders,
  };

  if (isFormData) {
    delete headers["Content-Type"];
  }

  try {
    const response = await axios.post(url, body, { headers });
    return response.data; // لاحظ: axios response كامل
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const postDataWithToken = async (
  url,
  body = {},
  customHeaders = {},
  isFormData = false
) => {
  const cookies = new Cookies();
  const token = cookies.get("access_token"); // 🔑 جلب التوكن من الكوكيز

  const headers = {
    Authorization: `Bearer ${token}`, // ✅ أضف التوكن هنا
    ...customHeaders,
  };

  if (isFormData) {
    delete headers["Content-Type"]; // FormData بيضيفه تلقائيًا
  } else {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await axios.post(url, body, { headers });
    return response.data; // ترجع فقط البيانات المهمة
  } catch (error) {
    console.error("❌ postDataWithToken error:", error.response?.data || error);
    throw error.response ? error.response.data : error;
  }
};

export const putData = async (url, body = {}, customHeaders = {}, isFormData = false) => {
  const token = getToken();

  const headers = {
    "X-Use-Cookie": "false",
    Authorization: token ? `Bearer ${token}` : "",
    ...customHeaders,
  };

  if (isFormData) {
    delete headers["Content-Type"];
  }

  try {
    const response = await axios.put(url, body, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export const patchData = async (
  url,
  body = {},
  customHeaders = {},
  isFormData = false
) => {
  // const token = getToken();
const cookies = new Cookies();
  const token = cookies.get("access_token");
  const headers = {
    "X-Use-Cookie": "false",
    Authorization: token ? `Bearer ${token}` : "",
    ...customHeaders,
  };

  // لا تضف Content-Type إذا كانت FormData
  if (isFormData) {
    delete headers["Content-Type"];
  }

  try {
    const response = await axios.patch(url, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    // console.error("AXIOS ERROR:", error);
    throw error.response ? error.response.data : error;
  }
};