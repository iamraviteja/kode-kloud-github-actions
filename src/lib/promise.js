function PromisePolyfill(cb) {

    const STATE = {
        PENDING: 'pending',
        FULFILLED: 'fulfilled',
        REJECTED: 'rejected'
    }

    var resolveCbs = [];
    var rejectCbs = [];
    var status = STATE.PENDING;
    var value = null;

    const runCallbacks = () => {

        if (status == STATE.PENDING) return;

        if (status == STATE.FULFILLED) {
            resolveCbs.forEach((successCb) => {
                successCb(value);
            });
            resolveCbs = [];
        }

        if (status == STATE.REJECTED) {
            rejectCbs.forEach((errorCb) => {
                errorCb(value);
            });
            rejectCbs = [];
        }
    }

    const onSuccess = (data) => {
        queueMicrotask(() => {
            if (status != STATE.PENDING) return;

            if(data instanceof PromisePolyfill){
                data.then(onSuccess, onFail);
                return;
            }

            status = STATE.FULFILLED;
            value = data;
            runCallbacks();
        })
    }

    const onFail = (error) => {
        queueMicrotask(() => {
            if (status != STATE.PENDING) return;

            if(error instanceof PromisePolyfill){
                error.then(onSuccess, onFail);
                return;
            }

            status = STATE.REJECTED;
            value = error;
            runCallbacks();
        })
    }

    try {
        cb(onSuccess, onFail);
    } catch (error) {
        status = STATE.REJECTED;
        onFail(error);
    }

    PromisePolyfill.prototype.then = function (successCb, errorCb) {
        // return new promise 
        return new PromisePolyfill((resolve, reject) => {
            resolveCbs.push((result) => {
                try {
                    resolve(successCb(result))
                } catch (error) {
                    reject(error)
                }
            });

            rejectCbs.push((result) => {
                try {
                    resolve(errorCb(result))
                } catch (error) {
                    reject(error)
                }
            });

            runCallbacks();
        })
    }

    PromisePolyfill.prototype.catch = function (errorCb) {
        // return new promise 
        return new PromisePolyfill((resolve, reject) => {

            resolveCbs.push((result) => {
                try {
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            });

            rejectCbs.push((result) => {
                try {
                    resolve(errorCb(result))
                } catch (error) {
                    reject(error)
                }
            });

            runCallbacks();
        })
    }
}



module.exports = PromisePolyfill;