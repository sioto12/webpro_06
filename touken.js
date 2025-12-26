"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let katana = [
  { id:0, name:"加州清光", job:"始まりの一振り", family:"打刀", page:"https://www.toukenranbu.jp/character/085/",song: "https://www.youtube.com/watch?v=bwnQ7yqVo4M&list=PLx5p-H-FQKZt56jKmvjAgkwD0H_DxCQcj&index=5", image:"/public/images/刀剣乱舞/加州清光.png" },
  { id:1, name:"山姥切長義", job:"近侍", family:"打刀", page:"https://www.toukenranbu.jp/character/158/", song: "https://www.youtube.com/watch?v=EO5PTg2U3U0&list=PLx5p-H-FQKZt56jKmvjAgkwD0H_DxCQcj&index=78", image:"/public/images/刀剣乱舞/山姥切長義.png" },
  { id:2, name:"乱藤四郎", job:"総務番長", family:"短刀", page:"https://www.toukenranbu.jp/character/045/", song: "https://www.youtube.com/watch?v=t8bifrHHx0Q&list=PLx5p-H-FQKZt56jKmvjAgkwD0H_DxCQcj&index=30" , image:"/public/images/刀剣乱舞/乱藤四郎.png"},
  { id:3, name:"山姥切国広", job:"清掃番長", family:"打刀", page:"https://www.toukenranbu.jp/character/095/", song: "https://www.youtube.com/watch?v=ovzHvICgsCU&list=PLx5p-H-FQKZt56jKmvjAgkwD0H_DxCQcj&index=9", image:"/public/images/刀剣乱舞/山姥切国広.png" },
  { id:4, name:"博多藤四郎", job:"勘定番長", family:"短刀", page:"https://www.toukenranbu.jp/character/043/", song: "https://www.youtube.com/watch?v=sNt1CvxGbEY&list=PLx5p-H-FQKZt56jKmvjAgkwD0H_DxCQcj&index=29", image:"/public/images/刀剣乱舞/博多藤四郎.png" },
  { id:5, name:"源清麿", job:"教育番長", family:"打刀", page:"https://www.toukenranbu.jp/character/176/", song: "", image:"/public/images/刀剣乱舞/源清麿.png" },
  { id:6, name:"水心子正秀", job:"蔵番長", family:"打刀", page:"https://www.toukenranbu.jp/character/174/", song: "", image:"/public/images/刀剣乱舞/水心子正秀.png" },
  { id:7, name:"物吉貞宗", job:"厨番長", family:"脇差", page:"https://www.toukenranbu.jp/character/067/", song: "https://www.youtube.com/watch?v=IYv6HP1lzXY&list=PLx5p-H-FQKZt56jKmvjAgkwD0H_DxCQcj&index=41", image:"/public/images/刀剣乱舞/物吉貞宗.png" },
];

// 一覧
app.get("/touken", (req, res) => {
  res.render('touken', {data: katana} );
});

// Create
app.get("/touken/create", (req, res) => {
  res.redirect('/public/touken_new.html');
});

// Read
app.get("/touken/:number", (req, res) => {
  const number = req.params.number;
  const detail = katana[ number ];
  res.render('touken_detail', {data: detail} );
});


// Delete
app.get("/touken/delete/:number", (req, res) => {
  katana.splice( req.params.number, 1 );
  res.redirect('/touken' );
});

// Create
app.post("/touken", (req, res) => {
  const id = katana.length;
  const name = req.body.name;
  const job = req.body.job;
  const family = req.body.family;
  const page = req.body.page
  const song = req.body.song;
  const image = req.body.image;
  katana.push( { id: id, name: name, job: job, family: family, page: page,song: song, image:image} );
  console.log( katana );
  res.render('touken', {data: katana} );
});

// Edit
app.get("/touken/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = katana[ number ];
  res.render('touken_edit', {id: number, data: detail} );
});

// Update
app.post("/touken/update/:number", (req, res) => {
  katana[req.params.number].name = req.body.name;
  katana[req.params.number].job = req.body.job;
  katana[req.params.number].family = req.body.family;
  katana[req.params.number].page = req.body.page;
  katana[req.params.number].song = req.body.song;
  katana[req.params.number].image = req.body.image;
  console.log( katana );
  res.redirect('/touken' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));