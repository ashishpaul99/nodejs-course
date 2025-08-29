const express=require("express");
const path=require("path");
const router=express.Router();

const filePath=path.join(__dirname,'..',"views")
router.get(/^\/$|\/index(.html)?/,(req,res)=>{
  res.sendFile(path.join(filePath,"index.html"));
})

router.get(/^\/new-page(.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'new-page.html'));
});

router.get(/^\/old-page(.html)?$/, (req, res) => {
    res.redirect(301, '/new-page.html');
});

router.get("/test-error", (req, res, next) => {
  try {
    throw new Error("This is a test error!");
  } catch (err) {
    next(err); // pass error to your error middleware
  }
});

module.exports=router;