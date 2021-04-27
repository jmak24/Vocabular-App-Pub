exports.handler = (event, context, callback) => {
  event.response.autoConfirmUser = true;
  // Auto verify email on sign up
  if (event.request.userAttributes.hasOwnProperty("email")) {
    event.response.autoVerifyEmail = true;
  }
  callback(null, event);
};
