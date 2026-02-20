import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appEssentials from "./reducer/appEssentials";
import homeReducer from "./reducer/homeReducer";
import { venueApi } from "./Api/venueUser.api.";
import { vendorApi } from "./Api/vendorUser.api.";
import { adminApi } from "./Api/common.api";
import { createWrapper } from "next-redux-wrapper";
import { reviewsApi } from "./Api/reviews.api";
import { chwApi } from "./Api/chw.api";
import { planningToolsApi } from "./Api/planningTools.api";
import { guestListApi } from "./Api/guestList.api";
import { budgetPlannerApi } from "./Api/budgetPlanner.api";
import { invitesApi } from "./Api/invites.api";
import { intheHouseApi } from "./Api/intheHouse.api";
import { signInAndLoginApi } from "./Api/signInAndLogin.api";
import { otherApi } from "./Api/others.api";
import { orderApi } from "./Api/orders.api";
import { diffApi } from "./Api/diff.api";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// export const store = configureStore({
//   reducer: {
//     appEssentials,
//     homeReducer,
//     [adminApi.reducerPath]: adminApi.reducer,
//     [venueApi.reducerPath]: venueApi.reducer,
//     [vendorApi.reducerPath]: vendorApi.reducer,
//     [planningToolsApi.reducerPath]: planningToolsApi.reducer,
//     [reviewsApi.reducerPath]: reviewsApi.reducer,
//     [chwApi.reducerPath]: chwApi.reducer,
//     [guestListApi.reducerPath]: guestListApi.reducer,
//     [budgetPlannerApi.reducerPath]: budgetPlannerApi.reducer,
//     [invitesApi.reducerPath]: invitesApi.reducer,
//     [intheHouseApi.reducerPath]: intheHouseApi.reducer,
//     [signInAndLoginApi.reducerPath]: signInAndLoginApi.reducer,
//     [otherApi.reducerPath]: otherApi.reducer,
//     [orderApi.reducerPath]: orderApi.reducer,
//     [diffApi.reducerPath]: diffApi.reducer,
//   },
//   middleware: (gDM) =>
//     gDM().concat(
//       adminApi.middleware,
//       venueApi.middleware,
//       vendorApi.middleware,
//       planningToolsApi.middleware,
//       reviewsApi.middleware,
//       chwApi.middleware,
//       guestListApi.middleware,
//       budgetPlannerApi.middleware,
//       invitesApi.middleware,
//       intheHouseApi.middleware,
//       signInAndLoginApi.middleware,
//       otherApi.middleware,
//       orderApi.middleware,
//       diffApi.middleware
//     ),
// });
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["appEssentials"],
};
const rootReducer = combineReducers({
  appEssentials,
  homeReducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [venueApi.reducerPath]: venueApi.reducer,
  [vendorApi.reducerPath]: vendorApi.reducer,
  [planningToolsApi.reducerPath]: planningToolsApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [chwApi.reducerPath]: chwApi.reducer,
  [guestListApi.reducerPath]: guestListApi.reducer,
  [budgetPlannerApi.reducerPath]: budgetPlannerApi.reducer,
  [invitesApi.reducerPath]: invitesApi.reducer,
  [intheHouseApi.reducerPath]: intheHouseApi.reducer,
  [signInAndLoginApi.reducerPath]: signInAndLoginApi.reducer,
  [otherApi.reducerPath]: otherApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [diffApi.reducerPath]: diffApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (gDM) =>
      gDM({ serializableCheck: false }).concat(
        adminApi.middleware,
        venueApi.middleware,
        vendorApi.middleware,
        planningToolsApi.middleware,
        reviewsApi.middleware,
        chwApi.middleware,
        guestListApi.middleware,
        budgetPlannerApi.middleware,
        invitesApi.middleware,
        intheHouseApi.middleware,
        signInAndLoginApi.middleware,
        otherApi.middleware,
        orderApi.middleware,
        diffApi.middleware
      ),
  });
export const wrapper = createWrapper(makeStore);
export const persistor = persistStore(makeStore());
