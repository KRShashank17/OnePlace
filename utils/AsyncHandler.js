const AsyncHandler = (fn)=>{
    return async (req, res, next)=>{
        try {
            // console.log("Async working...");
            await Promise.resolve(fn(req, res, next));
        } catch (error) {
            const statusCode = error.statusCode || 500;
            const errMessage = error.message || "Internal Server Error";
            res.status(statusCode).json({
                success: false,
                message: errMessage
            })
        }
    }
}

// const AsyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

export default AsyncHandler