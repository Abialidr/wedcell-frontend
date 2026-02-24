import { useCallback, useEffect, useRef, useState } from 'react';
import Sidebar from './layout/Sidebar';
import PreviewModal from './PreviewModal';
import { isArray } from 'lodash';
import AppLayerSettings from './layout/AppLayerSettings';
import { DesignFrame, Editor, PageControl, useEditor } from '@adojs/editor';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducer/appEssentials';
import { PROXY, S3PROXY } from '../config';
import { data } from '../data';
import { useRouter } from 'next/router';
import HeaderLayout from './layout/HeaderLayout';
import useWindowSize from '@rooks/use-window-size';
import EditorContent from './pages/EditorContent';
import { ToastContainer, toast } from 'react-toastify';
import { useGetInvitesDataQuery, useGetSingleInviteTemplatesQuery } from 'redux/Api/invites.api';

const Test = () => {
  const router = useRouter();
  const {templateID} = router.query;
  const [inviteDataId, setInviteDataId] = useState();
  const globleuser = useSelector(selectUser);
  const [propertyName, setPropertyName] = useState([]);
  const { actions, state } = useEditor();
  const [inviteData, setInviteData] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [isRenderTime, setIsRenderTime] = useState(0);
  const {
    innerWidth: windowWidth,
    innerHeight: windowHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();

  useEffect(() => {
    try{

      if (isRenderTime < 3 && inviteData.length) {
        if (windowHeight >= 900) {
          const height = windowHeight - 200;
          const scale = height / state.pageSize.height;
          actions.setScale(scale);
        } else {
          const height = windowHeight - 300;
          const scale = height / state.pageSize.height;
          actions.setScale(scale);
        }
        setIsRenderTime(isRenderTime + 1);
      }
  
      if (state && windowWidth < 900) {
        const div = document.querySelector(
          `.mediaquery9 > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child`
        );
        if (div && Object.keys(state.selectedLayers).length) {
          if (state.selectedLayers[0][0] === 'ROOT') {
            div.style.overflow = 'scroll';
          } else {
            const scrollPosition = div.scrollTop;
            div.style.overflow = 'hidden';
            // document.documentElement.style.setProperty(
            //   '--page-scrollable',
            //   'hidden'
            // );
            // div.scrollTop = 100;
          }
        }
  
        if (div) {
          if (state.pageSize.height * state.scale >= windowHeight - 300) {
            div.style['justify-content'] = 'start';
          } else {
            div.style['justify-content'] = 'center';
          }
          if (state.pageSize.width * state.scale >= windowWidth) {
            div.style['align-items'] = 'start';
          } else {
            div.style['align-items'] = 'center';
          }
        }
      }
    }
    catch(e){
 toast.error(`Something Went Wrong`, {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  });
const {data : invitesData} = useGetInvitesDataQuery()
const { data: gettemplates } = useGetSingleInviteTemplatesQuery(templateID);
  useEffect(() => {
    (async () => {
      try{

      if(templateID){
        let res = gettemplates
        res = JSON.parse(JSON.stringify(res))
        res = res.data.find((val)=>val._id == templateID)
        setInviteData(res?.data);
        setPropertyName([]);
        setInviteDataId('');
      }
      else{
        let res = {data :invitesData}
          res = JSON.parse(JSON.stringify(res))
        if (res?.data?.success) {
          const file = res.data.data.invitesData && res.data.data.invitesData;
          file[0].layers.ROOT.props.scale = res.data.data.zoom;
          const property = res.data.data.events ? res.data.data.events : [];
          setInviteData(file);
          setPropertyName(property);
          setInviteDataId(res.data.data._id);
        } else {
          setInviteData(data);
          setPropertyName([]);
          setInviteDataId([]);
        }
      }
    }
     catch(e){
 toast.error(`Something Went Wrong`, {
        position: 'top-right',
        autoClose: 1000,
      });
    }
    })();
  }, [invitesData, templateID,gettemplates]);
  const leftSidebarRef = useRef(null);
  const [openPreview, setOpenPreview] = useState(false);

  const [viewPortWidth, setViewPortWidth] = useState();
  const [viewPortHeight, setViewPortHeight] = useState();
  // useEffect(() => {
  //   const windowHeight = () => {
  //     // setViewPortHeight(window.innerHeight);
  //     setViewPortWidth(window.innerWidth);
  //   };
  //   window.addEventListener('resize', windowHeight);
  //   windowHeight();
  //   return () => {
  //     window.removeEventListener('resize', windowHeight);
  //   };
  // }, []);

  return inviteData?.length ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height:
          router.pathname === '/canva'
            ? '100vh'
            : windowWidth > 900
            ? 'calc(100vh - 175px)'
            : 'calc(100vh - 210px)',
        position: 'relative',
        overflow: 'hidden',
        marginTop: windowWidth < 900 ? "-68px" : "0px", 
        maxHeight: windowHeight ? `${viewPortHeight}px` : 'auto',
      }}
      // style={{
      //   display: 'flex',
      //   flexDirection: 'column',
      //   width: '100vw',
      //   height: '100vh',
      //   maxHeight: viewPortHeight ? `${viewPortHeight}px` : 'auto',
      // }}
    >
      <ToastContainer></ToastContainer>
      <HeaderLayout propertyName={propertyName} />
      {openPreview && <PreviewModal onClose={() => setOpenPreview(false)} />}
      <div
        className='mediaquery1'
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 'auto',
          overflow: 'auto',
          background: '#EBECF0',
        }}
      >
        <div
          ref={leftSidebarRef}
          style={{
            display: 'flex',
            background: 'white',
          }}
        >
          <Sidebar
            openPreview={openPreview}
            setOpenPreview={setOpenPreview}
            propertyName={propertyName}
            setPropertyName={setPropertyName}
            inviteDataId={inviteDataId}
          />
        </div>
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <AppLayerSettings />
          <div
            style={{
              flexGrow: 1,
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
            className='mediaquery9'
          >
            {/* {inviteData.length && <EditorContent data={inviteData} />} */}
            {inviteData.length && <DesignFrame data={inviteData} />}
          </div>
          <div
            className='mediaquery2'
            style={{
              height: 40,
              background: '#fff',
              borderTop: '1px solid rgba(57,76,96,.15)',
              display: 'grid',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <PageControl />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>loading...</>
  );
};

export default Test;
