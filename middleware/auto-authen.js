import { getAccessToken } from '../utils/cookieAuthen';

export default function({ $device, store }) {
    // console.log('Device route name authen ...............:', $device.isMobile);

    if ($device.isMobile) {
        if (!getAccessToken()) {
            store.dispatch('authen/apiLogin', 'VIETTEL');
            console.log('Device route name authen token: none, auto login');
        }
    }
}
