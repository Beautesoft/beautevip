/* eslint-disable no-undef */
const devMode = __DEV__;

//const baseUrl = 'http://103.253.15.102:88/main_api';
export const baseUrl = 'http://103.253.15.75:7026/Main_API_Train/';
//export const baseUrl = 'http://sequoiasg.ddns.net:7015/mainapi/';  // my demo url
// const baseUrl = "http://192.168.0.5:1337";
const BaseSetting = {
  name: 'nailqueen',
  displayName: 'nailqueen',
  appVersionCode: '1',
  baseUrl,
  api: `${baseUrl}/api`,
  shareEndPoint: baseUrl,
  socketUrl: baseUrl,
  endpoints: {
    deleteUser: '/deleteUser',
    forgotPasscodeReset: '/forgotPasscodeReset',
    signUpOtp: '/signUpOtp',
    customerLogin: '/customerLogin',
    signUpOtpVerify: '/signUpOtpVerify',
    signUpCustomer: '/signUpCustomer',
    // bookAppointment: '/bookAppointmentTnc',
    bookAppointment: '/bookAppointmentTncNew',
    checkAppointmentSlot: '/CheckAppointmentSlotNew',
    appointmentSearch: '/appointmentSearchF21',
    appTransSearchInvoice: '/appTransSearchInvoiceDetail', //appTransSearchInvoice
    changePasscode: '/changePasscode',
    availableSlots: '/AvailableSlots',
    availableSlotsTnc: '/AvailableSlotsTnc',
    availableDatesTnc: '/AvailableDatesTnc',
    rescheduleAppointment:'/rescheduleAppointment',
    getStaffMemberList: '/getStaffMemberList',
    cartItemInput: '/CartItemInput',
    cartItemDelete: '/CartItemDelete',
    appCartItemSlotValidation:'/appCartItemSlotValidation',
    customerReferalCode: '/customerReferalCode',
    sendOtp: '/sendOtp',
    updateCustomerProfile: '/updateCustomerProfile',
    getSaloonList: '/getSaloonList?siteCode=&userID=',
    appointmentCancel: '/appointmentCancel',
    feedbackF21: '/feedbackF21',
    profilePicture: '/updateProfileF21',
    profilePic: '/profilePicture',
    createAddress: '/createAddress',
    updateAddress: '/updateAddress',
    stripeCustomerCreate: '/StripeCustomerCreate',
    stripePaymentIntentCreate: '/StripePaymentIntentCreate',
    stripePaymentIntentConfirm: '/StripePaymentIntentConfirm',
    appTransPostSales: '/appTransPostSalesTnc',
    mypackages: '/mypackages',
    myProducts: '/myProducts',
    cartAllItemDelete: '/cartAllItemDelete',
    homeBanner: '/dashBoardF21',
    setFcmToken: '/fcmTokenForCustomerApp',
    availableSlotsTnc: '/AvailableSlotsTnc',
    AvailableStaffsTnc: '/AvailableStaffsTnc',
    updateNotificationStatus: '/updatePushNotificationStatus',
    getClientDetails: '/getClientDetails',
    appUpdatePaymentDetails:'/appUpdatePaymentDetails',
    appHitpayCallback:'/appHitpayCallback',
  },
};

export default BaseSetting;
