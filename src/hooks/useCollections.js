import { useSelector } from "react-redux";

//$ constants and APIS
import { APIInstance } from "../api";
import { getApiUrls, urlType } from "../constants";

export const useCollections = () => {
  const { _ACCOUNT_NO } = useSelector((state) => state.user);

  const getMyCollectionsAPI = async ({ page, view, listType, dispatch }) => {
    try {
      if (page === -1) {
        return;
      }
      const res = await APIInstance(
        getApiUrls({
          urlFor: urlType.WATCHLISTS_FAVORITES,
          getFor: listType,
          type: view,
          page: page,
          _ACCOUNT_NO,
        })
      );
      if (res.data.results.length === 0) {
        dispatch({ type: "SET_PAGE", payload: -1 });
        return;
      }
      dispatch({ type: "SET_DATA", payload: res.data.results });
    } catch (err) {
      console.error("COLLECTION ERROR", err);
      dispatch({ type: "ERROR", payload: err });
    } finally {
      dispatch({ type: "SETTLED" });
    }
  };

  return { getMyCollectionsAPI };
};
