import { extend } from 'umi-request';
import { notification } from 'antd';

const service = extend({});

service.interceptors.response.use(async (respones) => {
  if (respones.ok) {
    // 本程序只接收json类型的数据 故只做json处理
    const json = await respones.json();
    return json;
  }
  notification.error({
    description: `${respones.status}: 请求失败`,
    message: '请求异常',
  });
  return new Error(`${respones.status}: 请求失败`);
});

/**
 * 将对象类型的data格式化为URLSearchParams类型的字符串
 * @param {string | object} data
 * @returns
 */
function dataFormat(data) {
  let format;
  if (typeof data === 'object' || typeof data === 'string') {
    format = new URLSearchParams(data);
  } else {
    format = new URLSearchParams();
  }
  format.set('cors', 'true');
  return format.toString();
}
/**
 * 统一处理配置项
 * @param {object} cfg 配置对象
 * @param {string} cfg.url
 * @param {string | object} cfg.data
 * @param {string} cfg.mothed
 * @returns
 */
const request = (cfg) => {
  const { url, data, ...rest } = cfg;
  // 格式化data
  const formatData = dataFormat(cfg.data);
  let formatUrl = cfg.url;
  if (formatData) {
    // 将data添加到url后面，本项目只发起get请求 故这样处理
    formatUrl = `${formatUrl}?${formatData}`;
  }

  return service(formatUrl, {
    ...rest,
    method: 'get',
  });
};

export default request;
