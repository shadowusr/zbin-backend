export function Blacklist(regex: RegExp) {
    return function(target: Record<string, any>, key: string) {

        let val : string = target[key];

        const getter = () =>  {
            return val;
        };
        const setter = (next) => {
            if (next) {
                val = next.replace(regex, '');
            }
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });

    };
}
