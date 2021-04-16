import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./Button";

import { api } from '../services/api';
import IGenreResponseProps from "../interfaces/IGenreResponseProps";

interface SideBarProps {
  setSelectedGenreId: Dispatch<SetStateAction<number>>;
  selectedGenreId: number; 
}

export function SideBar(props: SideBarProps) {
  const [genres, setGenres] = useState<IGenreResponseProps[]>([]);

  useEffect(() => {
    api.get<IGenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    props.setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )

}