import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSongs, setToken, clearSongs } from "../../redux/playerSlice.js";
import { Logout } from "../logout/logout.jsx";
import { SingleArtist } from "../single-artist/single-artist.jsx";
import { Login } from "../login/login.jsx";
import img from "../../../public/not-found.jpg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export const App = () => {
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.player.token);
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    dispatch(setToken(token));
  }, []);

  const logOut = () => {
    dispatch(setToken(""));
    dispatch(clearSongs());
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    dispatch(setSongs(data.artists.items));
    setSearchKey("");
  };

  return (
    <div className="bg-[#000] min-h-[100vh] justify-center content-center text-[18px]">
      {!token ? (
        <Login />
      ) : (
        <div className="form__box">
          <form
            className="pt-[30px] mb-[50px] flex justify-center items-center"
            onSubmit={searchArtists}
          >
            <input
              className="text-white bg-transparent border-white border-2 text-[20px] rounded-lg p-[7px]"
              type="text"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button
              className="text-[24px] ml-[15px] text-white"
              type={"submit"}
            >
              Search
            </button>
          </form>
          <Logout logOut={logOut} />
        </div>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route path="/artist/:id" element={<SingleArtist />} />
        </Routes>
      </Router>
    </div>
  );
};
export const Artists = () => {
  const songs = useSelector((state) => state.player.artists);
  const renderArtists = () => {
    return songs.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img
            className="w-[300px] h-[300px] mb-[10px] object-cover rounded-sm"
            src={artist.images[0].url}
            alt={artist.name}
          />
        ) : (
          <img className="w-[300px] h-[300px] mb-[10px] border-lg" src={img} />
        )}
        <Link className="text-white text-[26px]" to={`/artist/${artist.id}`}>
          {artist.name}
        </Link>
      </div>
    ));
  };
  return (
    <div className="grid grid-cols-3 gap-y-[100px] justify-items-center">
      {renderArtists()}
    </div>
  );
};
