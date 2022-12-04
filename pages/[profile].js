import react, { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { baseurl } from "../public/baseurl";

export default function profile() {
  const router = useRouter();

  const username = router?.asPath && router?.asPath.split("/")[1]

  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch(`${baseurl}/profile?username=${username}`).then(
      (res) => res.json()
    )
  );
  return (
    <div>
      <p>{username}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
