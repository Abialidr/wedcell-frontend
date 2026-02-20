import "../styles/globals.css";
import "../styles/bootstrap.min.css";
import "../styles/index.css";
// import Layout from '../Components/layout/Layout';
import { Provider } from "react-redux";
import { store, wrapper, persistor } from "../redux/store";
import "../styles/picker.css";
import "../styles/swiper.css";
import "../styles/Shop.css";
// import '../styles/banner.css';
import "../styles/Wedfilter.css";
// import '../styles/Profiles.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { useCallback, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Colours from "../Components/constants.js/Colors";
import { App as CapacitorApp } from "@capacitor/app";
import { Editor } from "@adojs/editor";
import { isArray } from "lodash";
import { useGetFontByLidosQuery } from "redux/Api/diff.api";
import Layout from "Components/NewLayout/Layout";
import { allFonts } from "../config/constants";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { S3PROXY } from "../config";
import { PersistGate } from "redux-persist/integration/react";

library.add(fas, far, fab);
function MyApp({ Component, pageProps }) {
  // const [test, setTest] = useState();
  // const { data: result, error } = useGetFontByLidosQuery(test);
  const getFonts = useCallback(async (query) => {
    try {
      const buildParams = (data) => {
        const params = new URLSearchParams();

        Object.entries(data).forEach(([key, value]) => {
          if (isArray(value)) {
            value.forEach((v) => params.append(key, v));
          } else {
            params.append(key, value);
          }
        });

        return params;
      };
      // setTest(buildParams(query));
      let fontsByLido = allFonts ? allFonts : [];
      fontsByLido = JSON.parse(JSON.stringify(fontsByLido));
      fontsByLido = fontsByLido.map((data) => {
        delete data._id;
        delete data.urls;
        const fonts = data.fonts.map((font) => {
          font.urls = [`${S3PROXY}/public/fonts/${data.name}.woff2`];
          return font;
        });
        data.fonts = fonts;
        return data;
      });
      return fontsByLido;
    } catch (e) {}
  }, []);
  useEffect(() => {
    CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack) {
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const router = useRouter();
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const theme = createTheme({
    palette: {
      primary: {
        main: Colours.Champagne_Gold.Dark,
      },
    },
  });
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <Provider store={store}>
        <Editor
          config={{
            assetPath: `${S3PROXY}/public/assets`,
            frame: {
              defaultImage: {
                url: `${S3PROXY}/public/assets/images/webp/frame-placeholder.webp`,
                width: 1200,
                height: 800,
              },
            },
          }}
          getFonts={getFonts}
        >
          {/* <Head>
        <title>Find Dream Wedding on Local Search Engine - WedField</title>
        <meta
          name='description'
          content='WedField, No. 1 Local Search Engine, For Hotels, Farm House, Resort, Banquet Hall, Photographers, Makeup artist, Mehndi artist and more. Find Addresses, Phone numbers, review and rating, photos of businesses.'
        />
        <link
          name='canonical'
          href='https://wedfield.com/'
        />
      </Head> */}
          <ThemeProvider theme={theme}>
            <Layout>
              <GoogleAnalytics gaId="GTM-M7N7S9JN" />
              <GoogleTagManager gaId="G-QQ8BR05BWM" />

              <Component {...props} key={router.asPath} />
            </Layout>
          </ThemeProvider>
        </Editor>
      </Provider>
    </PersistGate>
  );
}
// export default wrapper.withRedux(MyApp);
export default MyApp;
