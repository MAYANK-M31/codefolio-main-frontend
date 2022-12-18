import axios from "axios";
import { getCookie } from "cookies-next";
import Router from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { baseurl } from "../public/baseurl";
import styles from "../styles/Links.module.css";

export default function Links({ data, editable = false }) {
  const Token = getCookie("token");

  let [linkData, setlinkData] = useState(data?.user?.links);
  let [isDeleting, setisDeleting] = useState(null);

  const DeleteLink = async (id) => {
    setisDeleting(id);

    const body = {
      id: id,
    };

    await axios({
      method: "delete",
      url: `${baseurl}/update/newlink`,
      data: body,
      headers: {
        Authorization: "Bearer " + Token,
      },
    })
      .then(({ data }) => {
        setisDeleting(null);
        if (data.status != 200) return toast.error(data?.message);
        setlinkData((curr) => curr.filter((e) => e.id != id));
        toast.success("Deleted Successfully");
      })
      .catch((e) => {
        //handle error
        console.log(e);
        setisDeleting(null);
        return toast.error("Something went wrong");
      });
  };

  return (
    <div className={styles.LinksDiv}>
      <div className={styles.NavBar}>
        <div className={styles.headingdiv}>
          <h1>Links</h1>
          {editable && (
            <img
            id="addlink"
              onClick={() => {
                Router.push(Router.asPath + "/link");
              }}
              src="/icons/circle-add.svg"
            />
          )}
        </div>

        <div className={styles.closeBox}>
          <div
            style={{ backgroundColor: "#27C93F" }}
            className={styles.close}
          ></div>
          <div
            style={{ backgroundColor: "#FFBD2E" }}
            className={styles.close}
          ></div>
          <div
            style={{ backgroundColor: "#FF5F56" }}
            className={styles.close}
          ></div>
        </div>
      </div>

      <div className={styles.linksBtnDiv}>
        {/* LEETCODE */}

        {data && data?.user?.websites?.leetcode && data?.user?.websites?.leetcode?.trim().length != 0 && (
          <a
            href={"https://leetcode.com/" + data?.user?.websites?.leetcode}
            className={styles.LinkBtn}
          >
            <img src="/icons/leetcode-black.svg" />
            <h3>Leetcode</h3>
          </a>
        )}

        {/* GFG */}
        {data && data?.user?.websites?.gfg && data?.user?.websites?.gfg?.trim().length != 0 && (
          <a
            href={
              "https://auth.geeksforgeeks.org/user/" + data?.user?.websites?.gfg
            }
            className={styles.LinkBtn}
          >
            <img src="/icons/gfg.png" />
            <h3>GeeksForGeeks</h3>
          </a>
        )}

        {/* LinkedIN */}
        {linkData &&
          linkData.length > 0 &&
          linkData.map((d) => (
            <a
              style={{ transform: editable && "none" }}
              key={d?.id}
              onClick={(e) => {
                editable && e.preventDefault();
              }}
              href={d?.url}
              className={styles.LinkBtn}
            >
              <img style={{display: !d?.logo ? "none":null}} src={d?.logo} />
              <h3>{d?.title}</h3>
              {editable && (
                <img
                  style={{ opacity: isDeleting == d?.id ? 0.5 : 1 }}
                  onClick={() => {
                    isDeleting == d?.id ? null : DeleteLink(d?.id);
                  }}
                  className={styles.delete}
                  src="/icons/dustbin.svg"
                />
              )}
            </a>
          ))}
      </div>
      <Toaster />
    </div>
  );
}
