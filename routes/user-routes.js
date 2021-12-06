const router = require("express").Router();
const { User } = require("../Models");
const { signToken, compare, parseToken } = require("../utils/auth");
const axios = require("axios")
router.post("/user", async (req, res) => {
  try {
  
    let user = await User.create(req.body);
    let token = await signToken(user);
    res.status(200).json({ _id: user._id, token });
  } catch (err) {
    console.log(err)
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).select("password")
    console.log(req.body)
    if (!user || !compare(user, req.body)) {
      throw new Error("Invalid Credentials. Please try again!");
    }
    let token = await signToken(user);
    res.status(200).json({ _id: user._id, token: token});
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/browse", async (req, res) => {
try{
  let nytBestSellers = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=` + process.env.REACT_APP_NYT)
  let classics = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:%22classic+literature%22&tbs=,bkt:b&maxResults=30`)
  

  nytBestSellers = nytBestSellers.data.results.books.map(book => {
    
    return {
      id: book.primary_isbn13,
      author: book.contributor,
      title: book.title,
      description: book.description,
      thumbnail: book.book_image,
      externalLink: book.amazon_product_url
    }
  })

  classics = classics.data.items.map(book => {

    let title = book.volumeInfo.title;
    let authors;
    if (book.volumeInfo.authors) {
      authors = "by" + " " + book.volumeInfo.authors[0];
    } else {
      authors = "No Author Available";
    }
    let image;
    if (book.volumeInfo.imageLinks) {
      image =
        book.volumeInfo.imageLinks.thumbnail ||
        book.volumeInfo.imageLinks.smallThumbnail;
    } else {
      image = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png`;
    }
    let description;
    if (book.volumeInfo.description) {
      description = book.volumeInfo.description;
    } else {
      description = "No Description Available";
    }

    return {
      id: book.id,
      author: authors,
      title: title,
      description: description,
      thumbnail: image,
      externalLink: book.volumeInfo.infoLink
    }
  })


  res.status(200).json({nytBestSellers, classics})


}catch(err){
  console.log(err.message)
  res.status(400).send(err.message);
}

 





})





module.exports = router;
