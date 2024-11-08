export default function({ $device, redirect, route }) {
    // console.log('Device route name ...............:', route.name);

    if (route.name !== null || route.path === '/quatang') {
        if ($device.isDesktop) {
            // console.log('Device isDesktop ...............');
            if (route.path === '/quatang') {
                return redirect('/landing');
            } else if (route.name.toLowerCase().indexOf('landing') === -1) {
                return redirect('/landing');
            }
        } else {
            // console.log('Device isMobile ...............');
            if (route.path === '/quatang') {
                return redirect('/account/detail#gift');
            } else if (route.name.toLowerCase().indexOf('landing') !== -1) {
                return redirect('/');
            }
        }
    } else {
        if ($device.isDesktop) {
            // console.log('Device isDesktop ...............');
            return redirect('/landing');
        }
    }
}
