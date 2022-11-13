import { SlSocialSpotify } from "react-icons/sl";
export const Login = () => {
  const CLIENT_ID = "f2b82b34769e43b2ba6de39837c1e263";
  const REDIRECT_URI = "http://localhost:8081";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  return (
    <div className="min-h-[100vh] flex justify-center text-white items-center text-[24px] sm:text-[48px]">
      <SlSocialSpotify />
      <a
        className="ml-[15px]"
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        Login to Spotify
      </a>
    </div>
  );
};
