'use client'

import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from "@heroui/react";
import { Profile } from "@/types/profile.types";
import { FaCog, FaFilm, FaHeart, FaHome, FaList, FaSignOutAlt, FaTv } from "react-icons/fa";
import { LogoutFunc } from "@/helpers/helpers";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useIsUser } from "@/hooks/isUser";

const NavBar = ({ user }: { user: Profile }) => {
    const { isUser, userName } = useIsUser()
    const pathname = usePathname()

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuItems: { label: string; href: string }[] = [
        { label: "Home", href: "/" },
        isUser ? { label: "Discover", href: "/discover" } : { label: "Sign In", href: "/auth/signin" },
        isUser ? { label: "Profile", href: `/user/${userName}` } : { label: "Sign Up", href: "/auth/signup" },
        { label: "Movies", href: "/movies" },
        { label: "All Tv Shows", href: "/tv-shows" },
        { label: "Actors", href: "/actors" },
        { label: "Search", href: "/search/movies" },
        { label: "Settings", href: "/settings" },
        ...(isUser ? [{ label: "Logout", href: "/" }] : []),
    ];


    return <>
        <Navbar
            position="static"
            isBlurred
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className="cursor-pointer" justify="start">
                <NavbarMenuToggle className="cursor-pointer" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">MOVIES CAFE</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">MOVIES CAFE</p>
                </NavbarBrand>
            </NavbarContent>
            {
                isUser ? <NavbarContent justify="end">
                    <NavbarContent as="div" justify="end">
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform filter grayscale"
                                    color="default"
                                    name={user?.name}
                                    size="sm"
                                    src={user?.avatar?.url}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-medium text-default-500 text-xs md:text-sm">{user?.email}</p>
                                </DropdownItem>
                                <DropdownItem onPress={LogoutFunc} key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarContent>
                </NavbarContent>
                    :
                    <NavbarContent justify="end">
                        <NavbarItem className="hidden md:flex">
                            <Link as={Link} size="sm" href="/auth/signin">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button size="sm" radius="sm" as={Link} color="primary" href="/auth/signup" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </NavbarContent>

            }

            <NavbarMenu >

                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.1, delay: index * 0.05, type: "spring", stiffness: 150 }}
                        >
                            <Link
                                className="w-full text-xl lg:text-4xl lg:my-2 uppercase font-bold"
                                showAnchorIcon={item.label !== "Logout"}
                                color={item.label === "Logout" ? "danger" : pathname === item.href ? "primary" : "foreground"}
                                href={item.href}
                                size="lg"
                                onPress={() => setIsMenuOpen(false)}
                                onClick={item.label === "Logout" ? LogoutFunc : undefined}
                            >
                                {item.label}
                            </Link>
                        </motion.div>

                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    </>;
};

export default NavBar;
