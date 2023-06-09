"use client";

import style from "./Nav.module.scss";
import { Form } from "@/components";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BuiltInProviderType } from "next-auth/providers";
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { USER, DOGS } from "@/helpers/react_query/ks";
import {
  type_user,
  type_formComponentInput,
  type_formComponentInputError,
} from "@/utils/types/types";
import { handleFormErrors } from "@/helpers/handleFormErrors";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
//------------------------------------------

const supabase = createClient(
  "https://ebdqksslaxbhtxigrgiq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViZHFrc3NsYXhiaHR4aWdyZ2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4OTQ4OTIsImV4cCI6MjAwMzQ3MDg5Mn0.vwI60IImpnxiY6WwdHlCJ4_SuHOKN7WaJPm2qT4iDcI"
);

interface type_bucket {
  name?: string;
  file?: File | undefined;
  localURL?: string;
}

export default function Nav({ data, setSearchedData, loading, setFound }: any) {
  const [searchValue, setSearchValue] = useState("");
  const [FormOpen, setFormOpen] = useState(false);
  const [userData, setUserData] = useState<type_user>({});
  const [BurguerMenuOpen, setBurguerMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  //HANDLERS---------------------------
  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
    handleFilter(e.target.value);
  };
  const handleFilter = (value: string) => {
    const searched = data?.data?.filter((e: any) =>
      value === ""
        ? false
        : e.breed.toLowerCase().includes(value.toLocaleLowerCase())
    );
    setSearchedData({ length: searched.length, data: searched });

    if (!!value.length) {
      setFound(!!searched.length);
    }
  };
  //HANDLERS---------------------------

  //AUTH------------------------------------------
  const { data: session }: any = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  
  useEffect(() => {
    const regex = /^\/profile\/([0-9]+|[a-fA-F0-9]{8}(-[a-fA-F0-9]{4}){3}-[a-fA-F0-9]{12})$/;
    if (!session && regex.test(pathname)) {
      router.push("/dogs");
    }

    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  //AUTH------------------------------------------

  const {
    data: userInfoDB,
    isLoading: userInfoDBLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryFn: async () => await axios.get(`/api/profile/${session?.user.id}`),
    queryKey: [USER, session?.user.id],
    enabled: false,
  });

  useEffect(() => {
    if (session && !isSuccess) {
      refetch();
    }
    if (userInfoDB) {
      setUserData(userInfoDB.data);
    }
  }, [session, isSuccess]);

  //CREATE DOG--------------------------------------------

  const [success, setSuccess] = useState(false);

  const [inpValue, setInpValue] = useState<type_formComponentInput>({
    breed: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    lifeTime_min: "",
    lifeTime_max: "",
    image: "",
    imageFile: "",
    temperament: [],
  });

  const [errors, setErrors] = useState<type_formComponentInputError>({
    breed: "",
  });

  const [BucketImg, setBucketImg] = useState<type_bucket>({});

  const dataToPost = {
    breed: inpValue.breed,
    height_min: parseInt(inpValue.height_min),
    height_max: parseInt(inpValue.height_max),
    weight_min: parseInt(inpValue.weight_min),
    weight_max: parseInt(inpValue.weight_max),
    lifeTime_min: parseInt(inpValue.lifeTime_min),
    lifeTime_max: parseInt(inpValue.lifeTime_max),
    image: inpValue.image || inpValue.imageFile,
    temperament: inpValue.temperament,
    userId: session?.user?.email,
  };

  const addDogData = useMutation({
    mutationFn: async () => await axios.post("/api/dogs", dataToPost),
    onSuccess: (data) => {
      setInpValue({
        breed: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        lifeTime_min: "",
        lifeTime_max: "",
        image: "",
        imageFile: "",
        temperament: [],
      });
      setErrors({
        breed: "",
      });
      queryClient.invalidateQueries([DOGS], { exact: true });
      queryClient.invalidateQueries([USER]);
      router.push(`/create/${data?.data.newDog.id}`);
    },
  });

  let {
    isLoading,
    isError: mutateError,
    isSuccess: mutateSuccess,
  } = addDogData;
  const uploadImage = async () => {
    const { error } = await supabase.storage
      .from("dog_img")
      .upload(BucketImg.name || "", BucketImg.file || "");
    if (error) {
      console.log(error);
      alert("something went wrong");
      return "error";
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setErrors(handleFormErrors(inpValue));
    if (!!!Object.values(errors).length && !!!mutateSuccess) {
      const imageUploaded = await uploadImage();
      if (imageUploaded !== "error") {
        addDogData.mutate();
      }
    }
  };

  useEffect(() => {
    setSuccess(mutateSuccess);
  }, [mutateSuccess]);
  //CREATE DOG--------------------------------------------

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    if (BurguerMenuOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [BurguerMenuOpen]);

  
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = URL.createObjectURL(e.target.files?.[0] || new Blob());
    const imageFile = e.target.files?.[0];

    const regex = /image\/(jpg|png|gif|bmp|jpeg)/;

    if (imageFile && regex.test(imageFile.type)) {
      setBucketImg({
        name: uuidv4() + imageFile?.name.slice(imageFile.name.lastIndexOf(".")),
        file: imageFile,
        localURL: image,
      });
    }
  };
  return (
    <>
      <nav className={style.container}>
        <Link href={"/dogs"} className={`${style.imgWrapper} ${style.hover}`}>
          <Image
            src={"/assets/icons/paw.svg"}
            alt="pawis logo"
            width={30}
            height={30}
          />
        </Link>

        {pathname === "/dogs" && (
          <form className={style.form}>
            <input
              type="text"
              placeholder={loading ? "Loading..." : "Search a dog"}
              className={`${style.input} ${style.hover}`}
              value={searchValue}
              onChange={(e) => handleChange(e)}
            />
          </form>
        )}

        <div className={style.buttonsWrapper}>
          {session?.user ? (
            <>
              <button
                className={`${style.button} ${style.button_create} ${style.hover}`}
                onClick={() => setFormOpen(true)}
              >
                Create Dog
              </button>
              <button
                className={`${style.button} ${style.hover}`}
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </button>
              <Link
                href={`/profile/${session?.user?.id}`}
                className={style.perfil_img_link}
              >
                {userInfoDBLoading ? (
                  <div>Loading...</div>
                ) : (
                  <img
                    src={userData?.user?.image}
                    className={style.perfil_img}
                    alt="profile"
                  />
                )}
              </Link>
            </>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider, i) => (
                  <button
                    key={i}
                    className={`${style.button} ${style.hover}`}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>

        <div
          className={style.burguer_menu}
          onClick={() => setBurguerMenuOpen((prev) => !prev)}
        >
          {Array.from({ length: 3 }, (e, i) => (
            <div
              key={i}
              className={
                BurguerMenuOpen
                  ? `${style.burguer_line} ${style.burguer_close}`
                  : style.burguer_line
              }
            />
          ))}
        </div>
      </nav>
      <MenuResponsive
        session={session}
        userData={userData}
        setFormOpen={setFormOpen}
        signOut={signOut}
        userInfoDBLoading={userInfoDBLoading}
        setBurguerMenuOpen={setBurguerMenuOpen}
        providers={providers}
        signIn={signIn}
        BurguerMenuOpen={BurguerMenuOpen}
      />

      <Form
        type="Create"
        FormOpen={FormOpen}
        setFormOpen={setFormOpen}
        inpValue={inpValue}
        setInpValue={setInpValue}
        errors={errors}
        setErrors={setErrors}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isError={mutateError}
        success={success}
        BucketImg={BucketImg}
        setBucketImg={setBucketImg}
        handleChangeFile={handleChangeFile}
      />
    </>
  );
}

interface User {
  name: string;
  email: string;
  image: string;
  id?: string;
}
interface type_session {
  user?: User;
  expires?: string;
}

export function MenuResponsive({
  session,
  userData,
  setFormOpen,
  signOut,
  signIn,
  userInfoDBLoading,
  setBurguerMenuOpen,
  BurguerMenuOpen,
  providers,
}: {
  session: type_session;
  userData: type_user;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  setBurguerMenuOpen: Dispatch<SetStateAction<boolean>>;
  signOut: any;
  signIn: any;
  userInfoDBLoading: any;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  BurguerMenuOpen: boolean;
}) {
  
  return (
    <div
      className={style.container_resp}
      style={{
        transform: BurguerMenuOpen ? "translateX(0%)" : "translateX(-100%)",
      }}
    >
      <div className={style.w_content_resp}>
        {session?.user ? (
          <>
            {userInfoDBLoading ? (
              <div>Loading...</div>
            ) : (
              <Link
                href={`/profile/${session?.user?.id}`}
                className={style.perfil_img_link_resp}
              >
                <img
                  src={userData?.user?.image}
                  className={style.perfil_img}
                  alt="profile"
                />
              </Link>
            )}
            <button
              className={`${style.button} ${style.hover}`}
              onClick={() => {
                signOut();
                setBurguerMenuOpen(false);
              }}
            >
              Signt Out
            </button>
            <button
              className={`${style.button} ${style.button_create} ${style.hover}`}
              onClick={() => {
                setFormOpen(true);
                setBurguerMenuOpen(false);
              }}
            >
              Create Dog
            </button>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, i) => (
                <button
                  key={i}
                  className={`${style.button} ${style.button_create} ${style.hover}`}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
