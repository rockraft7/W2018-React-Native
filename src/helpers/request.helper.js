import axios from "axios";
import qs from "qs";
import Toast from "@remobile/react-native-toast";
import AppInsightHelper from "../helpers/app-insight.helper";

const instance = axios.create({
  timeout: 10000
});

const handleError = error => {
  //eslint-disable-next-line
  // console.log(error.response, error.request);
  if (error.response) {
    const message = error.response && error.response.data && error.response.data.message;
    if (message) {
      //eslint-disable-next-line
      // console.log("message", message);
      Toast.showLongBottom(message);
      AppInsightHelper.trackEvent(`API error: ${message}`);
    } else {
      Toast.showLongBottom("An unknown error has occurred!");
      AppInsightHelper.trackEvent(`API error: An unknown error has occurred!`);
    }
  } else if (error.request) {
    //eslint-disable-next-line
    // console.log("error.request", "Network error!");
    Toast.showLongBottom("Network error!");
    AppInsightHelper.trackEvent(`API error: Network error!`);
  } else {
    //eslint-disable-next-line
    // console.log("An unknown error has occurred!");
    Toast.showLongBottom("An unknown error has occurred!");
    AppInsightHelper.trackEvent(`API error: An unknown error has occurred!`);
  }
};

export default class RequestHelper {
  static async getHeader() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": "ef68321d65c24a09b7b0319c8b8152d2"
    };
  }
  static async get(apiUrl, params) {
    const header = await this.getHeader();
    return instance
      .get(apiUrl, {
        headers: header,
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      })
      .then(data => {
        if (data.status === 204) {
          Toast.showLongBottom("Data not found!");
        }
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }
  static async post(apiUrl, data) {
    return instance({
      method: "post",
      url: apiUrl,
      headers: await this.getHeader(),
      data: data
    })
      .then(data => {
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }
  static async put(apiUrl, data) {
    return instance({
      method: "put",
      url: apiUrl,
      headers: await this.getHeader(),
      data: data
    })
      .then(data => {
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }
}
