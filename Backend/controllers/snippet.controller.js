import { asyncHandler} from "../utils/asyncHandler.js";
import { Snippet } from "../models/Snippet.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createSnippet = asyncHandler(async (req,res) => {
    const userId = req.user._id;

    const {title,language,code} = req.body;

    if([title,language,code].some((feild) => {
        return (feild?.trim() === "")
    }))
    {
        throw new ApiError(400,"All feilds are required");
    }

    const snippet = await Snippet.create({
        title,
        language,
        code,
        ownerId : userId
    })

    return res.status(200).json(
        new ApiResponse(200,snippet,"Snippet created successfully")
    )
})

const deleteSnippet = asyncHandler(async (req,res) => {

    const snippetId = req.params.id;

    const snippet = await Snippet.findById(snippetId);

    if(!snippet)
    {
        throw new ApiError(500,"Snippet not found");       
    }

  if (snippet.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this snippet");
  }

    await Snippet.findByIdAndDelete(snippetId);

    return res.status(200)
    .json(new ApiResponse(200, {}, "Snippet deleted successfully"));
})

const updateSnippet = asyncHandler(async (req,res) => {

    const snippetId = req.params.id;
    const snippet = await Snippet.findById(snippetId);

    if(!snippet)
    {
        throw new ApiError(500,"Snippet not found");       
    }

    const {code,language,title} = req.body;

  if (snippet.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this snippet");
  }

    const updatedSnippet = await Snippet.findByIdAndUpdate(
        snippetId,
        {
            $set : {
                    title: title,
                    language: language,
                    code: code,
            }
        },
        {
            new : true
        }
    );

    return res.status(200).json(
        new ApiResponse(200,updatedSnippet,"Snippet updated successfully")
    )
})

const viewSnippet = asyncHandler(async (req,res) => {
    const snippetId = req.params.id;

    const snippet = await Snippet.findById(snippetId);

    if(!snippet)
    {
        throw new ApiError(500,"Snippet not found");       
    }

  if (snippet.ownerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this snippet");
  }

    return res.status(200)
    .json(new ApiResponse(200, snippet, "Snippet fetched successfully"));
})

export {
    createSnippet,
    deleteSnippet,
    updateSnippet,
    viewSnippet
}