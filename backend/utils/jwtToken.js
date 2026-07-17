export const generateToken = (
    user,
    message,
    statusCode,
    res
) => {

    // ===========================================
    // Generate JWT Token
    // ===========================================

    const token = user.generateJsonWebToken();

    // ===========================================
    // Select Cookie Name
    // ===========================================

    const cookieName =

        user.role === "Admin"

            ? "adminToken"

            : "patientToken";

    // ===========================================
    // Cookie Expiration
    // ===========================================

    const cookieExpireDays =

        Number(process.env.COOKIE_EXPIRE) || 7;

    // ===========================================
    // Send Response
    // ===========================================

    res
        .status(statusCode)
        .cookie(cookieName, token, {

            expires: new Date(

                Date.now() +

                cookieExpireDays *

                24 *

                60 *

                60 *

                1000

            ),

            httpOnly: true,

            secure: process.env.NODE_ENV === "production",

            sameSite: "lax"

        })

        .json({

            success: true,

            message,

            token,

            user

        });

};