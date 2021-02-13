import { getPost, getPosts, getUserPosts } from "./getPost";
import deletePost from "./deletePost";
import _createPost from "./createPost";
import _toggleLike from "./toggleLike";

export const getPostById = getPost;
export const getAllPosts = getPosts;
export const getPostsByUser = getUserPosts;

export const deletePostById = deletePost;
export const createPost = _createPost;
export const toggleLike = _toggleLike;