"use client";
import { useParams, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { MdLocalMovies, MdVerified } from "react-icons/md";
import { IoTvSharp, IoSearchSharp, IoLogOut } from "react-icons/io5";
import { FaHeart, FaUserAlt, FaUsers } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import { FcAbout } from "react-icons/fc";

import {
  ClerkProvider,
  SignedOut,
  RedirectToSignIn,
  SignedIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Button,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  DropdownItem,
  DropdownTrigger,
  Image,

  Dropdown,
  NavbarMenu,
  NavbarMenuItem,
  DropdownMenu,
  Avatar,
  Link,
} from "@nextui-org/react";

import { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import { MoonIcon } from "../../icons/MoonIcon";
import { SunIcon } from "../../icons/SunIcon";
import { Tabs, Tab } from "@nextui-org/react";
import { UserIcon } from "@/icons/UserIcon";
import { useUserContext } from "@/Context/UserContext";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/state";

export default function Nav() {
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {

  }, [user])
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);



  const logout = () => {
    dispatch(setLogout())
    router.push('/')
  }

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { slug } = useParams();
  return (
    <>
      {user != null ? "" :
        <div className={user != null ? "hidden" : ""}>
          <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
            <NavbarContent justify="end">
              <NavbarBrand>
                <p
                  onClick={() => router.push(`/`)}
                  className="font-bold text-inherit cursor-pointer"
                >
                  MOVIES CAFE
                </p>
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden mt-1 md:flex" justify="center">
              <Tabs
                selectedKey={pathname}
                key="full"
                radius="sm"
                size="sm"
                color="danger"
                aria-label="Options"
              >
                <Tab
                  id="/movies"
                  as={Link}
                  href="/movies"
                  key="/movies"
                  title={
                    <div className="flex items-center space-x-1">
                      <MdLocalMovies />
                      <span>Movies</span>
                    </div>
                  }
                />
                <Tab
                  id="/tv"
                  href="/tv"
                  key="/tv"
                  as={Link}
                  title={
                    <div className="flex items-center space-x-1">
                      <IoTvSharp />

                      <span>TV Shows</span>
                    </div>
                  }
                />
                <Tab
                  id="/search"
                  href="/search"
                  key="/search"
                  as={Link}
                  title={
                    <div className="flex items-center space-x-1">
                      <IoSearchSharp />
                      <span>Search</span>
                    </div>
                  }
                />
                <Tab
                  id="/actors"
                  as={Link}
                  href="/actors"
                  key="/actors"
                  title={
                    <div className="flex items-center space-x-1">
                      <FaUsers />
                      <span>Actors</span>
                    </div>
                  }
                />
              </Tabs>
            </NavbarContent>

            <NavbarContent justify="end">
              <NavbarItem className="space-x-1">

                <Button as={Link} href="/login" size="sm" radius="sm" variant="flat" color="danger">Login Now</Button>

              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </div>
      }


      {
        user != null ?
          <div>
            <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
              <NavbarContent justify="end">
                <NavbarBrand>
                  <p
                    onClick={() => router.push(`/`)}
                    className="font-bold text-inherit cursor-pointer"
                  >
                    MOVIES CAFE
                  </p>
                </NavbarBrand>
              </NavbarContent>

              <NavbarContent className="hidden mt-1 md:flex" justify="center">
                <Tabs
                  selectedKey={pathname}
                  key="full"
                  radius="sm"
                  size="sm"
                  color="danger"
                  aria-label="Options"
                >
                  <Tab
                    id="/movies"
                    as={Link}
                    href="/movies"
                    key="/movies"
                    title={
                      <div className="flex items-center space-x-1">
                        <MdLocalMovies />
                        <span>Movies</span>
                      </div>
                    }
                  />
                  <Tab
                    id="/tv"
                    href="/tv"
                    key="/tv"
                    as={Link}
                    title={
                      <div className="flex items-center space-x-1">
                        <IoTvSharp />

                        <span>TV Shows</span>
                      </div>
                    }
                  />
                  <Tab
                    id="/search"
                    href="/search"
                    key="/search"
                    as={Link}
                    title={
                      <div className="flex items-center space-x-1">
                        <IoSearchSharp />
                        <span>Search</span>
                      </div>
                    }
                  />
                  <Tab
                    id="/actors"
                    as={Link}
                    href="/actors"
                    key="/actors"
                    title={
                      <div className="flex items-center space-x-1">
                        <FaUsers />
                        <span>Actors</span>
                      </div>
                    }
                  />
                </Tabs>
              </NavbarContent>

              <NavbarContent as="div" justify="end">
                <Dropdown backdrop="transparent" shadow="lg" placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="danger"
                      name={user?.username}
                      size="sm"
                      src={user?.image}
                    />
                  </DropdownTrigger>
                  <DropdownMenu shouldFocusWrap selectionMode="single" aria-label="Profile Actions" color="danger" variant="shadow">
                    <DropdownItem as={Link} showDivider href={`/user/${user?._id}`} startContent={<FaUserAlt />} key="profile" className="h-14 gap-2 text-black dark:text-white">
                      <p className="font-semibold capitalize flex items-center">{user?.username}  <span className={user?.verifed == true ? " text-md  ms-1 md:ms-2" : "hidden"}>
                        {" "}
                        <MdVerified />
                      </span></p>
                      <p className="font-medium ">{user?.email}</p>
                    </DropdownItem>
                    <DropdownItem className="text-black dark:text-white" as={Link} href={`/user/${user?._id}`} startContent={<FaHeart />} key="favourites">Favourites</DropdownItem>
                    <DropdownItem className="text-black dark:text-white" as={Link} href={`/settings`} startContent={<IoSettingsSharp />} key="settings">Settings</DropdownItem>
                    <DropdownItem startContent={<IoLogOut />} onClick={() => logout()} key="logout" color="danger">
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarContent>
            </Navbar>
          </div>
          : ""
      }



      <div className=" flex mt-4 justify-center lg:hidden md:hidden ">
        <Tabs
          selectedKey={pathname}
          key="full"
          radius="sm"
          size="sm"
          color="danger"
          aria-label="Options"
        >
          <Tab
            id="/movies"
            as={Link}
            href="/movies"
            key="/movies"
            title={
              <div className="flex items-center space-x-1">
                <MdLocalMovies />
                <span>Movies</span>
              </div>
            }
          />
          <Tab
            id="/tv"
            as={Link}
            href="/tv"
            key="/tv"
            title={
              <div className="flex items-center space-x-1">
                <IoTvSharp />

                <span>TV Shows</span>
              </div>
            }
          />
          <Tab
            id="/search"
            as={Link}
            href="/search"
            key="/search"
            title={
              <div className="flex items-center space-x-1">
                <IoSearchSharp />
                <span>Search</span>
              </div>
            }
          />
          <Tab
            id="/actors"
            href="/actors"
            key="/actors"
            as={Link}
            title={
              <div className="flex items-center space-x-1">
                <FaUsers />
                <span>Actors</span>
              </div>
            }
          />
        </Tabs>
      </div>
    </>
  );
}
