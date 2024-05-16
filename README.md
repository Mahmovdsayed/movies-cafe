 <div className={token == false ? "hidden" : ""}>
        <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
          <NavbarContent justify="end">
            {/* <Button onClick={()=>console.log(UserToken)}>Click me</Button> */}
            {/* <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            /> */}
            {/* <NavbarMenu>
              {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === menuItems.length - 1
                        ? "danger"
                        : "foreground"
                    }
                    className="w-full"
                    href="#"
                  >
                    {item}
                  </Link>
                </NavbarMenuItem>
              ))}
            </NavbarMenu> */}
            <NavbarBrand>
              <p
                onClick={() => router.push(`/`)}
                className="font-bold text-inherit cursor-pointer"
              >
                <Image
                  radius="none"
                  className="w-[200px]"
                  src="https://see.fontimg.com/api/renderfont4/GOLVG/eyJyIjoiZnMiLCJoIjo3NiwidyI6MTAwMCwiZnMiOjc2LCJmZ2MiOiIjN0YyMEM3IiwiYmdjIjoiIzBBMDIwMiIsInQiOjF9/bW92aWVzIGNhZmU/kocak.png"
                />

              </p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden mt-1 md:flex" justify="center">
            <Tabs
              selectedKey={pathname}
              key="full"
              radius="sm"
              size="sm"
              color="secondary"
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
            <Dropdown backdrop="blur" placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={data.userName}
                  size="sm"
                  src={data.Userimage}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{data.userEmail}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem onClick={() => localStorage.removeItem('userToken')} key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>
      </div>