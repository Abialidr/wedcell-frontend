import React, { useEffect, useState } from "react";
// import { useAsync } from 'react-use';
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@adojs/editor";
import { SerializedPage } from "@adojs/core";
import { data } from "./../../../data";
import { PROXY, S3PROXY } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import {
  useGetInviteTemplatesQuery,
  useGetSingleInviteTemplatesQuery,
} from "redux/Api/invites.api";
import Image from "next/image";
const TemplateContent = ({ onClose }) => {
  const [update, setUpdate] = useState(false);

  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { actions, activePage } = useEditor((state) => ({
    activePage: state.activePage,
  }));
  const [page, setPage] = useState(1);
  const { data: gettemplates, isFetching: tempateLoading } =
    useGetInviteTemplatesQuery(page);
  const [pageCount, setPageCount] = useState("");
  const [totalres, settotalres] = useState();

  const useFunc = async () => {
    const response = { data: gettemplates };

    setTemplates(response?.data?.data);
    setPageCount(gettemplates?.totalPage);
    settotalres(gettemplates?.total);
    setIsLoading(false);
  };
  useEffect(() => {
    try {
      useFunc();
    } catch (e) {
      toast.error(`Something Went Wrong`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }, [update, gettemplates]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const [id, setId] = useState();
  const { data: singleTemplate, refetch } =
    useGetSingleInviteTemplatesQuery(id);
  const addPage = async (id) => {
    setId(id);
  };
  const addingPage = async () => {
    try {
      const data = singleTemplate?.data[0].data;
      if (data) {
        actions.setData(data);
        if (isMobile) {
          onClose();
        }
      }
    } catch (e) {
      toast.error(`Something Went Wrong`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };
  useEffect(() => {
    addingPage();
  }, [singleTemplate]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        overflowY: "auto",
        display: "flex",
      }}
    >
      <ToastContainer></ToastContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          height: 48,
          borderBottom: "1px solid rgba(57,76,96,.15)",
          padding: "0 20px",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: "15px",
            color: "#181C32",
            flexGrow: 1,
            marginBottom: "0px",
          }}
        >
          Templates
        </p>
        <div
          style={{
            fontSize: 20,
            flexShrink: 0,
            width: 32,
            height: 32,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
        >
          <XIcon />
        </div>
      </div>
      <div
        style={{ flexDirection: "column", overflowY: "auto", display: "flex" }}
      >
        <div
          style={{
            // flexGrow: 1,
            // overflowY: 'auto',
            // display: 'grid',
            // gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
            // gridGap: 8,
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            width: "100%",
            // border: '1px solid ',
            height: "fit-content",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {tempateLoading ? (
            <div>Loading...</div>
          ) : (
            templates?.map((item, index) => {
              return (
                <div
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    border: "1px solid gray",
                    width: "100%",
                  }}
                  className="templatesImgsCanva"
                  key={index}
                  onClick={() => addPage(item?._id)}
                >
                  <img
                    style={{ width: "100%" }}
                    src={`${S3PROXY}${item.Images}`}
                    loading="lazy"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        {page === 1 ? (
          <span></span>
        ) : (
          <>
            <span
              onClick={() => handlePageChange(page - 1)}
              style={{ fontSize: "20px" }}
            >
              {"<"}
            </span>
          </>
        )}
        <span style={{ fontSize: "20px" }}>
          {tempateLoading ? "Loading..." : `${page} of ${pageCount}`}
        </span>
        {page === pageCount ? (
          <span></span>
        ) : (
          <span
            onClick={() => handlePageChange(page + 1)}
            style={{ fontSize: "20px" }}
          >
            {">"}
          </span>
        )}
      </div>
    </div>
  );
};

export default TemplateContent;
