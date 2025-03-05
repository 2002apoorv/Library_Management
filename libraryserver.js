const express=require("express");

const app=express();
app.use(express.json());

const books=[{
    name:"Harry Potter 1",
    copies:5
}]

app.post("/",function(req,res){
    const newbook=req.body.newbook;
    if(newbook.name && newbook.copies>0){
        books.push(newbook);
        res.status(200).json({
            message:"Book Added succesfully"
        })
    }
    else{
        res.status(500).json({
            message:"Book not added enter correct book info"
        })
    }
    
})

app.get("/",function(req,res){
    //const numberofbooks=books[0].copies+books[1].copies;
    //const name=books[0].name;
    res.send(books);
    
})

app.post("/issue",function(req,res){
    const bookname=req.body.bookname;
    for(let i=0;i<books.length;i++){
        if(bookname==books[i].name && books[i].copies>0 ){
            books[i].copies=books[i].copies-1;
            res.status(200).json({message:"The book is issued succesfully"});
        }
        else{
            res.status(200).json({message:"Book is not Available in the library"});
        }
    }
})

app.get("/total",function(req,res){
    let total=0;
    for(let i=0;i<books.length;i++){
        total=total+books[i].copies;
    }

    res.status(200).json({total,message:"Success"});
})

app.listen(4003);
