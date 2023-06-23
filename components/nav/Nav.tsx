"use client";

import style from "./Nav.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Form } from "@/components";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

import { LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

//------------------------------------------

export default function Nav({ data, setSearchedData, loading, setFound }: any) {
  const [searchValue, setSearchValue] = useState("");
  const [FormOpen, setFormOpen] = useState(false);
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
  //AUTH------------------------------------------
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  console.log(session);
  //AUTH------------------------------------------
  const pathname = usePathname();
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
                onClick={() => signOut()}
              >
                Sign Out
              </button>
              <Link href={"/"} className={style.perfil_img_link}>
                <Image
                  src={session?.user.image || ""}
                  fill
                  className={style.perfil_img}
                  alt="profile"
                />
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
      </nav>

      <Form type="Create" FormOpen={FormOpen} setFormOpen={setFormOpen} />
    </>
  );
}
