/**
 * Wraps async route handlers and forwards errors
 * to Express error middleware automatically.
 */

export const catchAsyncErrors = (controller) => {

    return (req, res, next) => {

        Promise.resolve(

            controller(req, res, next)

        ).catch(next);

    };

};

export default catchAsyncErrors;