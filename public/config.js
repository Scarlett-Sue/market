window.config = {
  // ksxf: 'http://172.20.24.50:8080/ksxf-synthesize',
  // ksxf: 'http://zrzy.cqdlzx.com/cers',
  // ksxf: 'http://test.router.fishliu.com/ksxf-core',

  // ksxf: 'http://172.20.24.50:8617/',
  // ksxf: 'http://172.16.0.124:8617/', // yanx
  // ksxf: 'http://172.16.2.18:8622/', // zhangx
  ksxf: 'http://172.20.24.50:8618/',
  // ksxf: 'http://192.168.3.17:8080/ksxf',
  // ksxf: 'http://58.144.151.76:8080/ksxf-synthesize',
  // ksxf: 'http://test.router.fishliu.com/ksxf-core',
  // ksxf: 'http://58.144.151.76:8080/ksxf-synthesize',
  // ksxfFile: 'http://172.20.24.50:8080/static/ksxf-synthesize',
  // ksxf: 'http://192.168.11.186:8081/ksxf-core',
  // ksxf: 'http://172.16.3.239:8081/ksxf-core',
  // ksxf: 'http://172.16.4.195:8080/ksxf-core',
  // ksxf: 'http://192.168.11.31:8081/ksxf-core',
  yzt: 'http://172.20.24.50:8080/ksxf-synthesize',
  // ksxfFilePath: 'http://172.20.24.50/static/ksxf-synthesize',
  // window.config.yzt = 'http://zrzy.cqdlzx.com/ksxf-core';
  ksxfFilePath: 'http://zrzy.cqdlzx.com/static/ksxf-synthesize',
  sslt: 'http://zrzy.cqdlzx.com/oms/static/stylejson/',
  zhsq: 'http://zhsq.digitalcq.com/d2cpro/oms/static/stylejson/',
  baseMapUrl: 'http://zhsq.digitalcq.com/D2CJsonV2/zhsqdt/ZHSQDT_IMAGE_New.json',
  // baseUrl: 'http://172.20.24.50:8083/dc-core/',
  // staticUrl: 'http://172.20.24.50:8083/dc-core/static',
  baseUrl: 'http://zrzy.cqdlzx.com/dc-core/',
  staticUrl: 'http://zrzy.cqdlzx.com/dc-core/static',
};
if (!parseInt(window.location.host)) {
  window.config.ksxf = 'http://zrzy.cqdlzx.com/ksxf-synthesize';
  // window.config.ksxf = 'http://172.20.24.50:8080/ksxf-synthesize';
  // window.config.ksxf = 'http://58.144.151.76:8080/ksxf-synthesize';

  // window.config.ksxf = 'http://172.16.0.194:8080/ksxf';
  // window.config.ksxf = 'http://58.144.151.76:8080/ksxf-synthesize';
  window.config.yzt = 'http://zrzy.cqdlzx.com/ksxf-core';
  window.config.ksxfFilePath = 'http://zrzy.cqdlzx.com/static/ksxf-synthesize';
}
