import { getAccessToken } from '../utils/cookieAuthen';

export default function({ redirect }) {
    if (!getAccessToken()) {
        return redirect('/account/login');
    }
}
