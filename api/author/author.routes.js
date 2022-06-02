const express = require("express");
const router = express.Router();
const {
  AuthorsGet,
  AuthorCreate,
  postsCreate,
  authorDelete,
  authorsUpdate,
} = require("./author.controllers");

router.param("authorId", async (req, res, next, authorId) => {
  const author = await fetchAuthor(authorId, next);
  if (author) {
    req.author = author;
    next();
  } else {
    const err = new Error("author Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", AuthorsGet);
router.post("/", AuthorCreate);
router.delete("/:authorId", authorDelete);
router.put("/:authorId", authorsUpdate);
router.post("/:authorId/posts", postsCreate);

module.exports = router;
