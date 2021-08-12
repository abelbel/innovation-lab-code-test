import { useReducer } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 20rem;
  margin: auto;
  border-radius: 4px;
  padding: 0.25rem;
  border: 1px solid #ccc;
`;

const StyledLabel = styled.label`
  display: block;
  color: #616161;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const StyledControl = styled.div`
  margin-bottom: 0.5rem;
`;

const StyledFormDiv = styled.div`
  margin: 5rem auto;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  width: 30rem;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  background-color: #f4f0fa;
`;

const StyledButton = styled.button`
  cursor: pointer;
  font: inherit;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  background-color: transparent;
  color: #1a8ed1;
  border: 1px solid #1a8ed1;
  margin: 1rem 1rem;

  :disabled {
    background-color: #d9d8da;
    border-color: 1a8ed1;
    color: 1a8ed1;
  }

  :hover:active {
    background-color: #1a8ed1;
    border-color: #1a8ed1;
    color: white;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
`;

interface FormInterface {
  url: string;
  caption: string;
  isLoading: boolean;
}

const initialFormState: FormInterface = {
  url: "",
  caption: "",
  isLoading: false,
};

const formReducer = (
  state: FormInterface,
  action: { type: string; value: string }
) => {
  if (
    action.type === "SUBMIT_FORM_START" ||
    action.type === "IMPORT_DOG_START"
  ) {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === "SUBMIT_FORM_END") {
    return {
      ...state,
      isLoading: false,
    };
  } else if (action.type === "IMPORT_DOG_END") {
    return {
      ...state,
      isLoading: false,
    };
  } else if (action.type === "INPUT_URL") {
    return {
      ...state,
      url: action.value,
    };
  } else if (action.type === "INPUT_CAPTION") {
    return {
      ...state,
      caption: action.value,
    };
  }
  return {
    ...state,
    isLoading: false,
  };
};

const DogForm = () => {
  const router = useRouter();
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    dispatchForm({ type: "SUBMIT_FORM_START", value: "" });
    const formData = {
      url: formState.url,
      caption: formState.caption,
    };
    await fetch("http://localhost:3000/api/addDog", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatchForm({ type: "SUBMIT_FORM_END", value: "" });
    router.push("/");
  };

  const importDogHandler = async () => {
    dispatchForm({ type: "IMPORT_DOG_START", value: "" });
    const response = await fetch("https://random.dog/woof.json");
    const randomDog = await response.json();
    dispatchForm({ type: "IMPORT_DOG_END", value: randomDog.url });
    dispatchForm({ type: "INPUT_URL", value: randomDog.url });
  };

  const urlInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ type: "INPUT_URL", value: event.target.value });
  };

  const captionInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ type: "INPUT_CAPTION", value: event.target.value });
  };

  const formIsValid = formState.url !== "" && formState.caption !== "";
  return (
    <StyledFormDiv>
      <form action="submit" onSubmit={submitFormHandler}>
        <StyledControl>
          <StyledLabel htmlFor="url">Url</StyledLabel>
          <StyledInput
            data-test-id="url-input"
            type="text"
            id="url"
            readOnly
            onChange={urlInputHandler}
            value={formState.url}
          />
        </StyledControl>
        <StyledControl>
          <StyledLabel htmlFor="caption">Caption</StyledLabel>
          <StyledInput
            data-test-id="caption-input"
            type="text"
            id="caption"
            onChange={captionInputHandler}
            value={formState.caption}
          />
        </StyledControl>
        <FlexDiv>
          <div>
            <StyledButton
              data-test-id="import-btn"
              disabled={formState.isLoading}
              onClick={importDogHandler}
            >
              Import Dog
            </StyledButton>
          </div>
          <div>
            <StyledButton
              data-test-id="submit-btn"
              disabled={formState.isLoading || !formIsValid}
            >
              Submit
            </StyledButton>
          </div>
        </FlexDiv>
      </form>
    </StyledFormDiv>
  );
};

export default DogForm;
