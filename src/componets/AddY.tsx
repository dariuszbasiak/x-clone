import {
  Card,
  CardActions,
  CardContent,
  TextareaAutosize,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../models/app-state.interface";
import { MAX_MESSAGE_LENGTH } from "../shared/const";

export function AddY() {
  const text = useRef<any>();
  const authState = useSelector((state: AppState) => state.auth);
  const revalidator = useRevalidator();
  const [input, setInput] = useState({
    touched: false,
    hasError: true,
  });

  const inputProps = {
    minRows: 2,
  };

  const handlePost = async () => {
    if (text?.current?.value) {
      await postNewText();

      revalidator.revalidate();
    }
  };
  const handleInput = () => {
    setInput((state) => ({
      ...state,
      touched: true,
      hasError:
        MAX_MESSAGE_LENGTH < text.current?.value?.length &&
        text.current?.value?.length > 0,
    }));
  };

  const postNewText = async () => {
    await fetch("http://localhost:3001/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text?.current?.value,
        author_id: authState.user?.id,
        name: authState.user?.name,
      }),
    });

    text.current.value = "";
    revalidator.revalidate();
  };
  return (
    <div className="pb-2">
      <Card>
        <CardContent>
          <TextareaAutosize
            className="size-full border-solid border-sky-500 border-2 rounded-s"
            ref={text}
            {...inputProps}
            onInput={handleInput}
          />
          {input.touched && (
            <p className={`${input.hasError && "text-red-900"} text-xs`}>
              Character's left:{" "}
              {MAX_MESSAGE_LENGTH - text.current?.value?.length}{" "}
            </p>
          )}
        </CardContent>
        <CardActions>
          <Button onClick={handlePost} disabled={input.hasError}>
            Post!
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
