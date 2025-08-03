// /controllers/summary.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateWithGemini } from "../utils/gemini.util.js"; // Import the utility

const getResponse = asyncHandler(async (req, res) => {
  // 1. Get the code from the request body's "prompt" key
  const { prompt } = req.body;

  // 2. Validate that the prompt exists and is not empty
  if (!prompt || prompt.trim() === "") {
    throw new ApiError(400, "Code prompt is required.");
  }

  // 3. Call the Gemini utility to get the summary
  //    It's helpful to add context to the prompt for better results.
  const summaryText = await generateWithGemini(
    `Provide a concise summary for the following code snippet:\n\n${prompt}`
  );

  // 4. Return the successful response.
  //    The structure { summary: summaryText } matches what your frontend expects.
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { summary: summaryText },
        "Summary generated successfully"
      )
    );
});

export { getResponse };