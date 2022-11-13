import { BiLogOut } from "react-icons/bi";
export const Logout = ({ logOut }) => {
  return (
    <button
      className="absolute right-[50px] top-[30px] text-[26px] text-white flex items-center"
      onClick={logOut}
    >
      <span className="pr-[20px]">Logout</span>
      <BiLogOut />
    </button>
  );
};
