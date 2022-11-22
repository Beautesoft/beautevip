/* eslint-disable no-undef */
const devMode = __DEV__;

//const baseUrl = 'http://103.253.15.102:88/main_api';
const baseUrl = 'http://103.253.15.102:88/mainapi_cloudtest/';
// const baseUrl = "http://192.168.0.5:1337";
const BaseSetting = {
  name: 'TNCCRM',
  displayName: 'TNCCRM',
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
    checkAppointmentSlot: '/checkAppointmentSlot',
    appointmentSearch: '/appointmentSearchF21',
    appTransSearchInvoice: '/appTransSearchInvoiceDetail', //appTransSearchInvoice
    changePasscode: '/changePasscode',
    availableSlots: '/AvailableSlots',
    getStaffMemberList: '/getStaffMemberList',
    cartItemInput: '/CartItemInput',
    cartItemDelete: '/CartItemDelete',
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
    appTransPostSales: '/appTransPostSalesF21',
    mypackages: '/mypackages',
    cartAllItemDelete: '/cartAllItemDelete',
    homeBanner: '/dashBoardF21',
  },
};

export default BaseSetting;
