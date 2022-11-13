import { useParams, useNavigate } from "react-router-dom";
import img from "../../../public/not-found.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setSingleArtist } from "../../redux/playerSlice";
import axios from "axios";
export const SingleArtist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const artists = useSelector((state) => state.player.artists);
  const getBack = () => navigate("/", { replace: true });

  const artist = artists.find((val) => val.id === id);

  return (
    <div className="container  px-15 mt-[100px] mx-auto text-white">
      <div className="flex mb-[200px]">
        {artist.images.length ? (
          <img
            className="rounded-xl object-cover mb-[30px] mr-[50px] w-[300px] h-[300px]"
            src={artist.images[0].url}
            alt={artist.name}
          />
        ) : (
          <img
            className="rounded-xl object-cover mb-[30px] mr-[50px] w-[300px] h-[300px]"
            src={img}
          />
        )}
        <div>
          <p className="uppercase font-light text-gray-300">{artist.type}</p>
          <p className="text-[28px] mb-[50px]">{artist.name}</p>
          <p className="text-[24px] mb-[30px]">
            Genres: {artist.genres[0]}, {artist.genres[1]}
          </p>
          <h6>
            Followers :
            <span className="ml-[5px] underline text-[24px] font-light text-gray-300">
              {artist.followers.total}
            </span>
          </h6>
        </div>
      </div>
      <button
        className="text-[36px] border-2  border-red p-[15px] rounded-md "
        onClick={getBack}
      >
        Get Back
      </button>
    </div>
  );
};
