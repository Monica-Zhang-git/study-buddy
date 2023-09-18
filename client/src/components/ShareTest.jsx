import { useMutation } from "react-query";
import axios from "axios";
import { makeRequest } from "../axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function ShareTest() {
  const { currentUser } = useContext(AuthContext);
  const mutation = useMutation((newTodo) => {
    return makeRequest.post("/post", newTodo);
  });

  return (
    <div>
      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ desc: "hello", userId: currentUser._id });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}

export default ShareTest;
