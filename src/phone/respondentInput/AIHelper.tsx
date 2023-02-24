import { Box } from "@mui/material";
import { Message } from "@mui/icons-material";
import { BouncingDotsLoader } from "../../components/BouncingDotsLoader";
import { useEffect, useState } from "react";

const paperSx = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "300px",
  backgroundColor: "#eee",
  fontSize: "0.9rem",
  gap: "15px",
  padding: "0 10px",
  color: "#777",
};

const DEFAULT_PROMPT = "Additional prompts will be displayed here...";

type Props = {
  aiResponse: string;
  isLoading: boolean;
  promptToSend: string;
};

export const AIHelper = (props: Props) => {
  const { aiResponse, isLoading, promptToSend } = props;
  const [outputText, setOutputText] = useState("");

  useEffect(() => {
    if (isLoading) setOutputText("");
    if (aiResponse && aiResponse !== "no response") {
      const words = aiResponse.split(" ");

      let index = 0;
      const displayWord = () => {
        if (index >= words.length - 1) return;

        setOutputText((prev) => {
          if (index === 0) return words[0];
          return prev + " " + words[index];
        });
        index++;
        setTimeout(displayWord, 100);
      };
      displayWord();
    }
  }, [aiResponse, isLoading]);

  return (
    <Box sx={paperSx}>
      <Message fontSize="large" sx={{ color: "#a442f5" }} />
      {isLoading ? (
        <BouncingDotsLoader />
      ) : (
        <div
          style={{ display: "flex", alignItems: "center", minHeight: "30px" }}
        >
          <p id="output" style={{ textAlign: "left" }}>
            {promptToSend && aiResponse
              ? aiResponse === "no response"
                ? "More detail is needed to provide an adequate response."
                : outputText
              : DEFAULT_PROMPT}
          </p>
        </div>
      )}
    </Box>
  );
};
