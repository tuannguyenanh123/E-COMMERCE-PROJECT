import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

import { objToString, shallowEqual } from "../../../Utilities/index";
import "./Register.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addUsers,
  fetchUsers,
  login,
  saveError,
} from "../../../Redux/Reducers/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const listUserDB = useSelector((state) => state.user.listUser);
  // let [errorSubmited, seterrorSubmited] = {
  //   mail: "",
  //   phone: "",
  //   userName: "",
  // };
  const onSubmit = (data, e) => {
    let errorSubmited = [];
    console.log(data);
    e.preventDefault();
    let arr = [];
    if (data) {
      listUserDB.forEach((user, index) => {
        arr.push(shallowEqual(user, { ...data, id: nanoid() }));
      });
    }
    arr.forEach((item) => {
      item.forEach((itemSub) => {
        if (itemSub !== "isAgree") {
          errorSubmited.push(itemSub);
        } else {
          console.log("next");
        }
      });
    });
    dispatch(saveError([...new Set(errorSubmited)]));
    if (listErrorSubmited !== null || listErrorSubmited !== []) {
      dispatch(addUsers({ ...data, id: nanoid() }));
      navigate("/login");
    }
  };
  //start -- view noti when submit form
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const buttons = (
    <span className="button-login-reg">
      <button
        type="submit"
        className="button-login-reg-detail"
        onClick={handleClick({
          vertical: "top",
          horizontal: "right",
        })}
      >
        <span>TẠO TÀI KHOẢN</span>
      </button>
    </span>
  );
  //end -- view noti when submit form
  const listErrorSubmited = useSelector((state) => state.user.listErrorSubmit);
  console.log(listErrorSubmited);
  return (
    <div className="register">
      <div className="register-content">
        <h1 className="heading-title">ĐĂNG KÝ TẠI MRSIMPLE.VN</h1>
        <div className="heading-desc">
          <p>
            Hãy điền vào biểu mẫu sau để đăng ký với <b>MRSIMPLE.VN</b>
          </p>
          <p>
            Chúng tôi sẽ lưu thông tin chi tiết quý khách cung cấp để hỗ trợ
            giao dịch mua của quý khách trên trang web của chúng tôi.
          </p>
        </div>
        <div className="register-main">
          <h2>TÀI KHOẢN NGƯỜI DÙNG</h2>
          {Object.keys(errors).length !== 0 && (
            <div className="errors">
              {listErrorSubmited &&
                listErrorSubmited.map((item, index) => (
                  <React.Fragment key={index}>
                    <span className="error__item">{item} existed</span>
                    <br />
                  </React.Fragment>
                ))}
              {objToString(errors).map((error, index) => (
                <React.Fragment key={index}>
                  <span className="error__item">{error.message}</span>
                  <br />
                </React.Fragment>
              ))}
              <IoCloseSharp />
            </div>
          )}
          <form
            method="post"
            action="#"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="txt-field">
              <input
                type="text"
                name="userName"
                required
                {...register("userName", {
                  required: "Username is required",
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters",
                  },
                })}
              />
              <span></span>
              <label>Họ tên</label>
            </div>
            <div className="txt-field">
              <input
                name="mail"
                required
                {...register("mail", {
                  required: "Email is required",
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                    message: "Invalid email",
                  },
                })}
              />
              <span></span>
              <label>Email</label>
            </div>
            <div className="txt-field">
              <input
                type="number"
                number="phone"
                required
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                    message: "Invalid phone number",
                  },
                })}
              />
              <span></span>
              <label>Điện thoại</label>
            </div>

            <div className="pass">
              <input
                type="checkbox"
                id="isAgree"
                name="isAgree"
                {...register("isAgree", {
                  required: "Checkbox is required",
                })}
              />
              <label htmlFor="isAgree" className="isAgree">
                Tôi chấp nhận
                <a href="#unDev"> chính sách bảo mật về quyền riêng tư</a>
              </label>
            </div>
            {buttons}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
