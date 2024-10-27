import React, { useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Popover } from 'antd';
import { useGetAllNotificationsQuery } from "../../redux/features/user/userAccess.api";
import { debounce } from "lodash";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location
  
  const handleCreatePost = () => {
    navigate(`/create-post`);
  };

  const { data, refetch } = useGetAllNotificationsQuery(undefined);

  const debouncedFetch = useCallback(
    debounce(() => {
      refetch();
    }, 5000),
    [ refetch]
  );

  useEffect(() => {
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  const handleRedirect = (id) => {
    navigate(`/post/${id}`);
  };

  const content = (
    <div
      className="w-80 max-h-80 overflow-y-auto"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+
      }}
    >
      <style>
        {`
          .w-80::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="flex flex-col gap-3">
        {data?.data?.map((item) => (
          <button key={item._id} onClick={()=>{handleRedirect(item.postId._id)}}>
            <div>
            <span className="font-semibold">{`${item.postId.userEmail}`}</span>
            <span> asked: </span>
            <span className="font-semibold">{`${item.headLine}`}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="navbar bg-base-100 py-5">
      <div className="navbar-start">
        <div className="w-36">
          <img className="w-full" src="/logo.png" alt="" />
        </div>
      </div>
      <div className="form-control"></div>
      <div className="navbar-end gap-10">
        {location.pathname !== "/create-post" && (
          <button
            onClick={handleCreatePost}
            className="btn btn-primary"
          >
            Create Post
          </button>
        )}
       
        <Popover placement="bottom" content={content}>
          <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
          </button>
        </Popover>

        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
