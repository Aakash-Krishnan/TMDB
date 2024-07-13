import { useSelector } from "react-redux";

//$ constants and APIS
import { APIInstance } from "../api";
import { ACTION_TYPES, getApiUrls, urlType } from "../constants";

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
        dispatch({ type: ACTION_TYPES.SET_PAGE, payload: -1 });
        return;
      }
      dispatch({ type: ACTION_TYPES.SET_DATA, payload: res.data.results });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.ERROR, payload: err });
    } finally {
      dispatch({ type: ACTION_TYPES.SETTLED });
    }
  };

  return { getMyCollectionsAPI };
};
