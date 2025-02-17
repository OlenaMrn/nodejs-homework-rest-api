const jwt = require("jsonwebtoken");


const { userModel } = require("../models");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;
const { User } = userModel;

const authenticate = async (request, response, next) => {
  const { authorization = "" } = request.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }
    request.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
