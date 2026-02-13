function getDeviceType(): string | null {
    /*
    这个函数基于用户代理字符串来检测设备类型。
    它返回'Mobile'，'Tablet'，'Desktop'，如果用户代理不可用，则返回"unknown"。
    */
    const userDevice: string | null = (navigator.userAgent || null);
    if (!userDevice) {
        return "unknown";
    }
    let deviceType: string | null = (null);
    if (/Mobi|Android/i.test(userDevice)) {
        deviceType = 'Mobile';
    } else if (/Tablet|iPad/i.test(userDevice)) {
        deviceType = 'Tablet';
    } else {
        deviceType = 'Desktop';
    }
    return deviceType;
}

function getWebpageOpenTime(): number | null {
    /*
    这个函数检索网页打开时的时间。
    它返回时间戳（以毫秒为单位）或在不可用时返回 null。
    */
    if (performance && performance.timing && performance.timing.navigationStart) {
        return performance.timing.navigationStart;
    }
    return null;
}

function parseCookies(): Record<string, string> {
    /*
    这个函数解析文档中的所有cookie并返回一个键值对对象。
    */
    if (!document.cookie) return {};

    return document.cookie
        .split(';')
        .map(item => item.trim())
        .reduce<Record<string, string>>((acc, item) => {
            const index = item.indexOf('=');
            if (index > -1) {
                const name = item.slice(0, index);
                const value = decodeURIComponent(item.slice(index + 1));
                acc[name] = value;
            }
            return acc;
        }, {});
}

function getAllCookiesNames(): string[] {
    /*
    这个函数返回一个包含所有cookie名称的数组。
    */
    return Object.keys(parseCookies());
}

function getAllCookiesValues(): string[] {
    /*
    这个函数返回一个包含所有cookie值的数组。
    */
    return Object.values(parseCookies());
}

function getAllLocalStorageKeys(): string[] {
    /*
    这个函数返回一个包含localStorage中所有键的数组。
    */
    const keys: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== null) {
            keys.push(key);
        }
    }

    return keys;
}

export { getDeviceType, getWebpageOpenTime, getAllCookiesNames, getAllCookiesValues, getAllLocalStorageKeys };