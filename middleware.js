import { NextResponse } from "next/server";
import { baseurl } from "./public/baseurl";

export async function middleware(req) {
  const Token = req.cookies.get("token")?.value;

  const { status, data } = await fetch(`${baseurl}/signin/verify`, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + Token,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  }).then((res) => res.json());

  if (Token == undefined || status != 200) {
    return NextResponse.redirect(new URL("/",req.nextUrl))
  }else{
      const response =  NextResponse.next()
      response.cookies.set("username",data?.username)
      return response
  }
}

export const config = {
    matcher:["/:path/dashboard","/:path/profile","/:path/dashboard/:path"]
}