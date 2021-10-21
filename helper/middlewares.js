function checkFieldsBook(req, res, next) {
    const { title, author, pubYear } = req.body;
    if (title && author && pubYear) {
        if (!Number.isInteger(pubYear)) {
            res.status(400).json({ message: 'Year must be an integer' })
        } else {
            if(pubYear > 2021 || pubYear < 1454){
                res.status(400).json({ message: 'Year must be between 1454 and 2021' });
            }else{
                next();
            }
        }
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}
module.exports = {
    checkFieldsBook
}