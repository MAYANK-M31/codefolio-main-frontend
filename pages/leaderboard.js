import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { baseurl } from "../public/url";
import styles from "../styles/leaderboard.module.css";
function leaderboard() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const Fetch = async () => {
      await axios({
        method: "get",
        url: `${baseurl}/leaderboard`,
      })
        .then(({ data }) => {
          if (data?.status == 200) {
              var x= data?.data
              x.sort(function(a, b){return a?.score > b?.score});
              console.log(x);
              setdata(x);
          }
        })
        .catch((e) => {
          //handle error
          console.log(e);
          setisDeleting(null);
          return toast.error("Something went wrong");
        });
    };

    Fetch();
  }, []);

  return (
    <>
      <h1 id={styles.headline}>
        <img src="https://s3-alpha-sig.figma.com/img/244f/de34/8b3fef7bf91367c80dbd6061757b841f?Expires=1672617600&Signature=pJqNhyMavn28Rp8uOXhix6gEKMK0jZkqpTsT9RDcImziNmTnlG6h~9Pe8aSK6GZbj7CPTqNurAjsE0cb2IihUzY7ZDyZyURQ0xRtoH4Jp719~YNaVFkbFMZhV2spWFbsf1mYsWnNNrn3gIliVLNAXZkZadyHcTx8q7484zymRggyAqGnC4ZJBWxY9UIU9QuZKoW6j9g800ly6p7YKrW6y3M4xzx4oDWITN3pPfavAq0RUybAEGVXR8evRagfAT4hL6lBczUDu9k4Jz5q75xskMDdBv2~ITsdoTkAKSoUvI6VdwH7jDkNrxcbWDJFE8UBN~nVomhWmWxOVclmtu1FmQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"></img>
        Leaderboard
      </h1>

      <div className={styles.leadercontainer}>
        {data.map((d) => {
          return (
            <div className={styles.profile}>
              <div className={styles.profilepic}>
                <img src={d?.profile} referrerpolicy="no-referrer"></img>
              </div>

              <h3>{d.username}</h3>

              <p>
                Rank:
                <br />
                {d.globalrank}
              </p>

              <div className={styles.stats}>
                <h4>
                  {d.totalCount}
                  <p>Total Solved</p>
                </h4>
                <h4>
                  {d.easy}
                  <p>Easy</p>
                </h4>
                <h4>
                  {d.medium}
                  <p>Medium</p>
                </h4>
                <h4>
                  {d.hard}
                  <p>Hard</p>
                </h4>
              </div>

              <div id={styles.linkbutton}>
                <a
                  href={`https://codefolio-link.vercel.app/${d.username}`}
                  target="_blank"
                >
                  Link
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default leaderboard;
