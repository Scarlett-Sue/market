import { host } from 'config';
export const Host = host;
export const url = {
  login: host + '/user/login.do', // 登录

  userDetail: host + '/user/get.do',
  userAdd: host + '/user/add.do',
  userUpdate: host + '/user/update.do',
  userRemove: host + '/user/delete.do',
  userList: host + '/user/list.do',

  logList: host + '/log/list.do',

  supplierDetail: host + '/supplier/get.do',
  supplierAdd: host + '/supplier/add.do',
  supplierUpdate: host + '/supplier/update.do',
  supplierRemove: host + '/supplier/delete.do',
  supplierList: host + '/supplier/list.do',
  supplierAllList: host + '/supplier/all.do',

  dealerDetail: host + '/dealer/get.do',
  dealerAdd: host + '/dealer/add.do',
  dealerUpdate: host + '/dealer/update.do',
  dealerRemove: host + '/dealer/delete.do',
  dealerList: host + '/dealer/list.do',
  dealerAllList: host + '/dealer/all.do',

  depotDetail: host + '/depot/get.do',
  depotAdd: host + '/depot/add.do',
  depotUpdate: host + '/depot/update.do',
  depotRemove: host + '/depot/delete.do',
  depotList: host + '/depot/list.do',
  depotAllList: host + '/depot/all.do',

  areaDetail: host + '/area/get.do',
  areaAdd: host + '/area/add.do',
  areaUpdate: host + '/area/update.do',
  areaRemove: host + '/area/delete.do',
  areaList: host + '/area/list.do',
  areaAllList: host + '/area/all.do',

  cargoDetail: host + '/cargo/get.do',
  cargoAdd: host + '/cargo/add.do',
  cargoUpdate: host + '/cargo/update.do',
  cargoRemove: host + '/cargo/delete.do',
  cargoList: host + '/cargo/list.do',
  cargoAllList: host + '/cargo/all.do',

  detailDetail: host + '/detail/get.do',
  detailAdd: host + '/detail/add.do',
  detailUpdate: host + '/detail/update.do',
  detailRemove: host + '/detail/delete.do',
  detailList: host + '/detail/list.do',
  detailAllList: host + '/detail/all.do',

  purchaseDetail: host + '/purchase/get.do',
  purchaseAdd: host + '/purchase/add.do',
  purchaseUpdate: host + '/purchase/update.do',
  purchaseRemove: host + '/purchase/delete.do',
  purchaseList: host + '/purchase/list.do',
  purchaseAllList: host + '/purchase/all.do',

  shipmentDetail: host + '/shipment/get.do',
  shipmentAdd: host + '/shipment/add.do',
  shipmentUpdate: host + '/shipment/update.do',
  shipmentRemove: host + '/shipment/delete.do',
  shipmentList: host + '/shipment/list.do',
  shipmentAllList: host + '/shipment/all.do',
};
