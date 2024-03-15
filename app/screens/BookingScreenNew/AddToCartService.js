import { getApiData } from '../../config/apiHelper';
import BaseSetting from '../../config/settings';

const addToCart = async (userData, orderData, navigation, appointmentRequest, Toast) => {
    try {
        const request = {
            phoneNumber: userData?.customerPhone,
            customerCode: userData?.customerCode,
            itemCode: orderData?.itemCode,
            itemDescription: orderData?.itemDescription,
            itemQuantity: 1,
            itemPrice: orderData?.price,
            siteCode: userData?.siteCode,
            redeemPoint: '0',
            itemType: 3,
            apptDate: appointmentRequest.appointmentDate,
            apptFrTime: appointmentRequest.appointmentTime,
            appointmentDuration: appointmentRequest.appointmentDuration,
            apptStaff: appointmentRequest.appointmentStaffCode
        };
        console.log("addToCart -Request", request)
        const result = await getApiData(BaseSetting?.endpoints?.cartItemInput, 'post', request);

        console.log('addToCart ~ response', result);

        // Handle success or failure
        if (result?.success === "1") {
            Toast.show('Added to cart.');
            navigation.navigate('ShoppingBag')
        } else {
            // Handle failure scenario
            Toast.show(result?.error);
            console.error('Add to cart failed:', result?.message);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};

export default addToCart;
