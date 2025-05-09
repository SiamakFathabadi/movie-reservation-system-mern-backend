import { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/userMd.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = catchAsync(async (req, res, next) => {
  const {
    password = null,
    role = null,
    ...others
  } = req.body; /* if not pass role or password default value is null */

  const userExist = await User.findOne({ username: others.username });
  if (userExist) {
    return next(new HandleERROR("User already exists", 400));
  }

  const passReg = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
  if (!passReg.test(password)) {
    return next(
      new HandleERROR(
        "Password must be at least 8 characters long, and must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        400
      )
    );
  }
  const hashPassword = bcryptjs.hashSync(password, 10);

  const user = await User.create({ ...others, password: hashPassword });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_JWT,
    { expiresIn: "7d" }
  ); // 7 days expiration

  res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        name: user.username,
        email: user.email,
        role: user.role,
        _id: user._id,
      },
    },
    message: "Register successfully",
  });
});

/* TODO: is it correct? [login with name or email and password][phoneNumber][googleAccount] */
export const login = catchAsync(async (req, res, next) => {
  const { username=null, email=null, password=null } = req.body;

  /* check if either name+password or email+password is provided */
  if ((!username && !email) || !password) {
    return next(
      new HandleERROR(
        "Provide either username and password or email and password",
        400
      )
    );
  }

  const query = username ? { username } : { email };
  const user = await User.findOne(query).select("+password");

  if (!user) {
    return next(new HandleERROR("Invalid credentials", 400));
  }

  /* verify password  */
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return next(new HandleERROR("Invalid credentials", 400));
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_JWT,
    { expiresIn: "7d" }
  ); // 7 days expiration

  res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        _id: user._id,
      },
    },
    message: "Login successfully",
  });
});


/* TODO: GOOGLE ACCOUNT && PHONE */