import { useRouter } from "next/router";
import Link from "next/link";
import { DataContext } from "pages/_app";
import { useContext } from "react";

const HeaderMenu = () => {
  const { storeData, searchQuery, setSearchQuery } = useContext(DataContext);

  const router = useRouter();

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header>
      {router.pathname === "/" ? (
        <div className="navbar-maximized">
          <div className="container mx-auto font-white relative">
            <div className="pt-20 display-flex align-center justify-around px-5">
              <div className="search-box-container mr-auto">
                <label>
                  <input
                    className="search-box border-white"
                    placeholder="חיפוש מוצר"
                    onChange={(e) => handleSearchQuery(e)}
                    value={searchQuery}
                  />
                </label>
                <img className="search-icon" src="/icons/icon-search.svg" />
              </div>
              <div className="display-flex align-center mr-auto justify-between w-250">
                <div className="display-flex align-center justify-evenly w-full c-p">
                  <img src="/icons/icon-navigation.svg" />
                  <span className="mr-5">לאן מגיעים?</span>
                </div>
                <div className="display-flex align-center justify-evenly w-full mr-35 c-p">
                  <img src="/icons/icon-user.svg" />
                  <span className="mr-5">התחברות</span>
                </div>
              </div>
            </div>
            <div className="display-flex align-center mt-30">
              <img src="/images/logo.png" />
              <div>
                <div className="text-title mb-5">{storeData?.name}</div>
                <div className="display-flex align-center my-3 c-p">
                  <svg
                    className="ml-5 font-white"
                    width="16px"
                    height="16px"
                    viewBox="0 0 16 16"
                    version="1.1"
                  >
                    <title>5787A4CF-E477-4052-B600-AC339D58DC01</title>
                    <g id="Store" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g
                        id="HP-"
                        transform="translate(-1380.000000, -169.000000)"
                        stroke="none"
                        fill="currentColor"
                      >
                        <g id="Store" transform="translate(1097.000000, 90.000000)">
                          <g id="Text" transform="translate(0.000000, 38.000000)">
                            <g id="More-info" transform="translate(0.000000, 40.000000)">
                              <g id="icon/info-2" transform="translate(283.000000, 1.000000)">
                                <path
                                  d="M8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 Z M8,1.45454545 C4.38504527,1.45454545 1.45454545,4.38504527 1.45454545,8 C1.45454545,11.6149547 4.38504527,14.5454545 8,14.5454545 C11.6149547,14.5454545 14.5454545,11.6149547 14.5454545,8 C14.5454545,4.38504527 11.6149547,1.45454545 8,1.45454545 Z M8,6.63636364 C8.40166164,6.63636364 8.72727273,7.00945968 8.72727273,7.46969697 L8.72727273,7.46969697 L8.72727273,10.8030303 C8.72727273,11.2632676 8.40166164,11.6363636 8,11.6363636 C7.59833836,11.6363636 7.27272727,11.2632676 7.27272727,10.8030303 L7.27272727,10.8030303 L7.27272727,7.46969697 C7.27272727,7.00945968 7.59833836,6.63636364 8,6.63636364 Z M7.48574052,4.30392234 C7.76975819,4.01990467 8.23024181,4.01990467 8.51425948,4.30392234 C8.79827714,4.58794001 8.79827714,5.04842363 8.51425948,5.3324413 C8.23024181,5.61645896 7.76975819,5.61645896 7.48574052,5.3324413 C7.20172286,5.04842363 7.20172286,4.58794001 7.48574052,4.30392234 Z"
                                  id="Combined-Shape"
                                />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  אודות | אזורי חלוקה
                </div>
                <div className="display-flex align-center my-3 c-p">
                  <img className="ml-5" src="/icons/icon-location-2.svg" />
                  {storeData?.store?.businessFullAddressWithCity}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="navbar-minimized">
        <div className="container mx-auto h-full display-flex align-center justify-between px-5">
          <div className="display-flex align-center">
            <a>
              <img className="logo-img round w-60 h-60" src="/images/logo.png" alt="logo" />
            </a>
            <div className="text-title mb-5 mr-10">{storeData?.name}</div>
          </div>
          {router.pathname !== "/checkout" ? (
            <>
              <div className="search-box-container ml-10">
                <label>
                  <input
                    className="search-box"
                    placeholder="חיפוש מוצר"
                    onChange={(e) => handleSearchQuery(e)}
                    value={searchQuery}
                  />
                </label>
                <img className="search-icon" src="/icons/icon-search.svg" />
              </div>
              <div className="display-flex align-center w-250">
                <img className="h-32 w-32" src="/icons/icon-delivery-rounded.svg" />
                <div className="mr-10">
                  <span className="text-weight-400">משה דיין 20, תל אביב</span>
                  <br />
                  <span className="text-weight-300">מחר, 12:00-16:00</span>
                </div>
              </div>
              <div className="display-flex c-p align-center">
                <img className="h-32 w-32" src="/icons/icon-user.svg" />
                <div className="display-flex align-center mr-5 ml-5">
                  <span className="text-weight-400">היי אינסה!</span>
                  <svg className="mr-10 h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <div className="c-p">
              <Link href="/cart">
                <a className="display-flex align-center">
                  <span className="ml-5">חזרה לסל הקניות</span>
                  <img src="/icons/icon-arrow-left.svg" />
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderMenu;
