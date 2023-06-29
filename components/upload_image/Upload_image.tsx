"use client";
import React, { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import s from "./Upload_image.module.scss";
//---------------------------------------------------

interface type_component_props {
  image?: string;
  setUserData: React.Dispatch<React.SetStateAction<object>>;
  isLoading: any;
}
interface type_bucket {
  name: string;
  file?: File | string;
}

//---------------------------------------------------

const supabase = createClient(
  "https://ebdqksslaxbhtxigrgiq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViZHFrc3NsYXhiaHR4aWdyZ2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4OTQ4OTIsImV4cCI6MjAwMzQ3MDg5Mn0.vwI60IImpnxiY6WwdHlCJ4_SuHOKN7WaJPm2qT4iDcI"
);
const CDNURL =
  "https://ebdqksslaxbhtxigrgiq.supabase.co/storage/v1/object/public/profile_img/";

//---------------------------------------------------

export default function Upload_image({
  image,
  setUserData,
  isLoading,
}: type_component_props) {
  //---------------------------------------------------

  const [bucket_img, setBucket_img] = useState<type_bucket>({
    name: "",
    file: "",
  });
  const [src_bucket, setSrc_bucket] = useState("");

  //---------------------------------------------------

  const getBuckerImage = async () => {
    const { data, error } = await supabase.storage.from("profile_img").list("");
    if (error) {
      console.log("error", error);
      alert("Something went wrong");
      return;
    }
    const imgToSet = data?.filter((el) => el.name === bucket_img.name);
    setSrc_bucket(CDNURL + imgToSet[0].name || "");
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    setBucket_img({
      name: uuidv4() + imgFile?.name.slice(imgFile.name.lastIndexOf(".")),
      file: imgFile,
    });
  };

  useEffect(() => {
    const uploadFile = async () => {
      const { error } = await supabase.storage
        .from("profile_img")
        .upload(bucket_img.name, bucket_img.file || "");
      if (error) {
        console.log("error", error);
        alert("Something went wrong");
        return;
      }
      getBuckerImage();
    };

    if (Object.values(bucket_img).some((e) => !!e.length)) {
      console.log("jm");
      uploadFile();
    }
  }, [bucket_img]);

  //---------------------------------------------------
  return (
    <div className={s.container}>
      <div className={s.w_img}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <img
            src={!!src_bucket ? src_bucket : image}
            alt="profile_image"
            className={s.image}
          />
        )}
        <label htmlFor="upload_image" className={s.label}>
          Choose a photo
        </label>
      </div>
      <input
        className={s.input}
        type="file"
        id="upload_image"
        onChange={(e) => uploadFile(e)}
      />
    </div>
  );
}
