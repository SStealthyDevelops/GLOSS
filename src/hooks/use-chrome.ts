import { useEffect, useState } from "react";

export function useIsChromium() {
    const [isChromium, setIsChromium] = useState<boolean | null>(null);

    useEffect(() => {
        const ua = navigator.userAgent;

        const isIOS = /iphone|ipad|ipod/i.test(ua);

        const isChromiumUA =
            /chrome|chromium|crios|edg|opr|brave/i.test(ua);

        const isSafari =
            /safari/i.test(ua) && !/chrome|chromium|crios/i.test(ua);

        const isFirefox = /firefox/i.test(ua);

        setIsChromium(
            isChromiumUA &&
            !isSafari &&
            !isFirefox &&
            !isIOS
        );
    }, []);

    return isChromium;
}