import { isObject, isString } from 'lodash';
import { store } from '../redux/store/configureStore';
import BaseSetting from '../config/settings';

export function getApiData(endpoint, method, data, headers) {
  const authState = store?.getState() || {};
  const { token } = authState?.auth?.userData?.token || '';
  const { uuid } = authState?.auth || '';
  const authHeaders = {
    'Content-Type': 'application/json',
    authorization: token ? `Bearer ${token}` : '',
  };

  return new Promise((resolve, reject) => {
    let query = '';
    let qs = '';
    for (const key in data) {
      query += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`;
    }
    const params = {};
    params.method = method.toLowerCase() === 'get' ? 'get' : 'post';
    if (headers) {
      params.headers = headers;
    } else {
      params.headers = authHeaders;
    }
    console.log(params.headers);
    if (params.method === 'post') {
      if (
        params.headers &&
        params.headers['Content-Type'] &&
        params.headers['Content-Type'] === 'application/json'
      ) {
        params.body = JSON.stringify(data);
      } else {
        params.body = query;
      }
    } else {
      qs = `?${query}`;
    }

    console.log('params=--', params, endpoint);

    if (
      params.method === 'post' &&
      params.headers &&
      params.headers['Content-Type'] &&
      params.headers['Content-Type'] === 'application/json'
    ) {
      console.log(JSON.stringify(data));
    } else {
      let str = '';
      if (data && Object.keys(data).length > 0) {
        Object.keys(data).map((dk) => {
          str += `${dk}:${data[dk]}\n`;
        });
      }
      console.log(str);
    }
    console.log(
      'BaseSetting.api + endpoint + qs====>>>>',
      BaseSetting.api + endpoint + qs,
    );
    fetch(BaseSetting.api + endpoint + qs, params)
      .then((response) => response.json())
      .then((resposeJson) => {
        if (resposeJson.status !== 200 && resposeJson.status !== 401) {
          // const datas = {
          //   message: 'Could not find this method',
          //   url: BaseSetting.api + endpoint + qs,
          //   params,
          // };
          // setBugsNagLog(JSON.stringify(datas));
        }

        if (
          isObject(resposeJson) &&
          isString(resposeJson.message) &&
          resposeJson.message === 'Unauthorized'
        ) {
          console.log('Unauthorized===>>>');
          // navigation.navigate('RedirectLS');
          resolve(resposeJson);
        } else {
          resolve(resposeJson);
        }
      })
      .catch((err) => {
        // const datas = {
        //   message: `Api Error in ${endpoint}`,
        //   url: BaseSetting.api + endpoint + qs,
        //   params,
        //   err,
        // };
        // setBugsNagLog(JSON.stringify(datas));

        console.log('error_apihelper', err);
        reject(err);
      });
  });
}

export function getApiDataProgress(
  endpoint,
  method,
  data,
  headers,
  onProgress,
) {
  return new Promise((resolve, reject) => {
    const url = BaseSetting.api + endpoint;
    const oReq = new XMLHttpRequest();
    const authState = store?.getState() || {};
    const { token } = authState?.auth?.userData || '';
    const authHeaders = {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    };
    oReq.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded * 100) / event.total;
        if (onProgress) {
          onProgress(progress);
        }
      } else {
        // Unable to compute progress information since the total size is unknown
      }
    });

    const query = new FormData();
    let imageArr = [];
    let videoArr = [];

    if (data?.image) {
      imageArr = data.image;

      delete data.image;
    }

    if (data?.video) {
      console.log('CALLED++++>>>');
      videoArr = data.video;

      delete data.video;
    }

    console.log('VIDEO______++++++', videoArr);

    if (data && Object.keys(data).length > 0) {
      Object.keys(data).map((k) => query.append(k, data[k]));
    }

    if (imageArr.length !== 0) {
      imageArr.map((item) => {
        query.append('image', item);
      });
    }

    if (videoArr.length !== 0) {
      videoArr.map((item) => {
        query.append('video', item);
      });
    }

    const params = query;
    oReq.open(method, url, true);
    console.log(params);
    console.log('data=========', params);
    console.log(url);
    oReq.setRequestHeader('Content-Type', 'multipart/form-data');
    if (isObject(headers)) {
      Object.keys(headers).map((hK) => {
        oReq.setRequestHeader(hK, headers[hK]);
      });
    }

    if (token) {
      oReq.setRequestHeader('Authorization', `Bearer ${token}`);
    }

    oReq.send(params);
    oReq.onreadystatechange = () => {
      if (oReq.readyState === XMLHttpRequest.DONE) {
        try {
          const resposeJson = JSON.parse(oReq.responseText);
          if (
            isObject(resposeJson) &&
            isString(resposeJson.message) &&
            resposeJson.message === 'Unauthorized'
          ) {
            resolve(resposeJson);
          } else {
            resolve(resposeJson);
          }
        } catch (exe) {
          // const datas = {
          //   message: `Api Error in ${endpoint}`,
          //   url: endpoint,
          //   params,
          // };
          // setBugsNagLog(JSON.stringify(datas));
          console.log(exe);
          reject(exe);
        }
      }
    };
  });
}
