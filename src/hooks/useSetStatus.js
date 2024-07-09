import { useSelector } from "react-redux";
import { APIInstance } from "../api";

export const useSetStatus = () => {
  const { _ACCOUNT_NO } = useSelector((state) => state.user);

  const setStatusAPI = (
    statusFor,
    id,
    flag,
    type,
    setheaderData,
    headerData
  ) => {
    const val = flag ? false : true;
    APIInstance.post(`account/${_ACCOUNT_NO}/${statusFor}`, {
      media_type: type,
      media_id: id,
      [statusFor]: val,
    }).then((res) => {
      if (res.data.success === true) {
        setheaderData({ ...headerData, [statusFor]: val });
      }
    });
  };

  return { setStatusAPI };
};
