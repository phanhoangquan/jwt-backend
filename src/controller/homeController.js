export const handleHomePage = (req, res) => {
    return res.render("home.ejs");
}

export const handleAboutPage = (req,res)=>{
        return res.send("I'am PHAN HOANG QUAN");
}