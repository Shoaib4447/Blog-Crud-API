// Higher order function
// We will design lot of get and post req and whole lot of chances that req might fail in those failure cases we want to wrap up into a try/catch block we don't want to write try/catch in every single controller that not easy

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// const asyncHandler = (requestHandler) => {
//   return async (req, res, next) => {
//     try {
//       await requestHandler(req, res, next);
//     } catch (err) {
//       next(err);
//     }
//   };
// };
