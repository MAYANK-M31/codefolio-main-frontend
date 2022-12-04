import react, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { baseurl } from "../public/baseurl";

export default function profile() {
  const router = useRouter();

  const { username } = router.query;
  const { isLoading, error, data } = useQuery(
    "repoData",
    () =>
      fetch(`${baseurl}/profile?username=${username}`).then((res) =>
        res.json()
      ),
    {
      enabled: !!username,
    }
  );

  if (error) return console.error(error);

  return (
    <div>
      <p>{username}</p>
      {!isLoading ? (
        <div>
          <img src={data?.gfg?.data?.profile?.userAvatar}></img>
          <p>{JSON.stringify(data)}</p>
        </div>
      ) : (
        <p>LOADING..</p>
      )}
    </div>
  );
}
