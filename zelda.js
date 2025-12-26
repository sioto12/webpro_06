"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let game = [
  { id:0, name:"ゼルダの伝説", model:"ファミリーコンピュータ", page:"https://www.nintendo.com/jp/famicom/software/zelda1/index.html", image:"/public/images/ゼルダの伝説/ゼルダの伝説.png"},
  { id:1, name:"リンクの冒険", model:"ファミリーコンピュータ", page:"https://www.nintendo.com/jp/famicom/software/zelda2/index.html", image:"/public/images/ゼルダの伝説/リンクの冒険.png"},
  { id:2, name:"ゼルダの伝説　神々のトライフォース", model:"スーパーファミコン,ゲームボーイアドバンス", page:"https://www.nintendo.co.jp/n02/shvc/zl/index.html", image:"/public/images/ゼルダの伝説/神々のトライフォース.png"},
  { id:3, name:"ゼルダの伝説　夢を見る島", model:"ゲームボーイ,Nintendo Switch", page:"https://www.nintendo.com/jp/switch/ar3na/index.html", image:"/public/images/ゼルダの伝説/夢を見る島.png"},
  { id:4, name:"ゼルダの伝説　時のオカリナ", model:"NINTENDO 64,ニンテンドー3DS", page:"https://www.nintendo.co.jp/3ds/aqej/#/", image:"/public/images/ゼルダの伝説/時のオカリナ.png"},
  { id:5, name:"ゼルダの伝説　ムジュラの仮面", model:"NINTENDO 64,ニンテンドー3DS", page:"https://www.nintendo.co.jp/3ds/ajrj/index.html", image:"/public/images/ゼルダの伝説/ムジュラの仮面.png"},
  { id:6, name:"ゼルダの伝説　ふしぎの木の実", model:"ゲームボーイカラー", page:"https://www.nintendo.co.jp/n02/dmg/az7jaz8j/index.html", image:"/public/images/ゼルダの伝説/ふしぎの木の実.png"},
  { id:7, name:"ゼルダの伝説　風のタクト", model:"ニンテンドー ゲームキューブ, Wii U", page:"https://www.nintendo.co.jp/wiiu/bczj/index.html", image:"/public/images/ゼルダの伝説/風のタクト.png"},
  { id:8, name:"ゼルダの伝説　4つの剣", model:"ゲームボーイアドバンス", page:"https://www.nintendo.com/jp/games/feature/nintendo-classics/a-5190_j/index.html", image:"/public/images/ゼルダの伝説/4つの剣.png"},
  { id:9, name:"ゼルダの伝説　4つの剣＋", model:"ゲームキューブ", page:"https://www.nintendo.co.jp/ngc/g4sj/index.html", image:"/public/images/ゼルダの伝説/4つの剣＋.png"},
  { id:10, name:"ゼルダの伝説　ふしぎのぼうし", model:"ゲームボーイアドバンス", page:"https://www.nintendo.co.jp/n08/bzmj/index.html", image:"/public/images/ゼルダの伝説/ふしぎのぼうし.png"},
  { id:11, name:"ゼルダの伝説　トワイライトプリンセス", model:"ゲームキューブ, Wii U", page:"https://www.nintendo.co.jp/wiiu/azaj/index.html", image:"/public/images/ゼルダの伝説/トワイライトプリンセス.png"},
  { id:12, name:"ゼルダの伝説　夢幻の砂時計", model:"ニンテンドーDS", page:"https://www.nintendo.co.jp/ds/azej/index.html", image:"/public/images/ゼルダの伝説/夢幻の砂時計.png"},
  { id:13, name:"ゼルダの伝説　大地の汽笛", model:"ニンテンドーDS", page:"https://www.nintendo.co.jp/ds/bkij/index.html", image:"/public/images/ゼルダの伝説/大地の汽笛.png"},
  { id:14, name:"ゼルダの伝説　スカイウォードソード", model:"Wii, Nintendo Switch", page:"https://www.nintendo.com/jp/switch/az89a/index.html", image:"/public/images/ゼルダの伝説/スカイウォードソード.png"},
  { id:15, name:"ゼルダの伝説　神々のトライフォース２", model:"ニンテンドー3DS", page:"https://www.nintendo.co.jp/3ds/bzlj/index.html", image:"/public/images/ゼルダの伝説/神々のトライフォース２.png"},
  { id:16, name:"ゼルダの伝説　トライフォース３銃士", model:"ニンテンドー3DS", page:"https://www.nintendo.co.jp/3ds/ea3j/index.html", image:"/public/images/ゼルダの伝説/トライフォース３銃士.png"},
  { id:17, name:"ゼルダの伝説　ブレス　オブ　ザ　ワイルド", model:"Nintendo Switch, Nintendo Switch2", page:"https://www.nintendo.com/jp/zelda/botw/index.html", image:"/public/images/ゼルダの伝説/ブレワイ.png"},
  { id:18, name:"ゼルダの伝説　ティアーズ　オブ　ザ　キングダム", model:"Nintendo Switch, Nintendo Switch2", page:"https://www.nintendo.com/jp/zelda/totk/index.html", image:"/public/images/ゼルダの伝説/ティアキン.png"},
  { id:19, name:"ゼルダの伝説　知恵のかりもの", model:"Nintendo Switch", page:"https://www.nintendo.com/jp/switch/bdgea/index.html", image:"/public/images/ゼルダの伝説/知恵のかりもの.png"},

];

// 一覧
app.get("/zelda", (req, res) => {
  res.render('zelda', {data: game} );
});

// Create
app.get("/zelda/create", (req, res) => {
  res.redirect('/public/zelda_new.html');
});

// Read
app.get("/zelda/:number", (req, res) => {
  const number = req.params.number;
  const detail = game[ number ];
  res.render('zelda_detail', {data: detail} );
});


// Delete
app.get("/zelda/delete/:number", (req, res) => {
  game.splice( req.params.number, 1 );
  res.redirect('/zelda' );
});

// Create
app.post("/zelda", (req, res) => {
  const id = game.length;
  const name = req.body.name;
  const model = req.body.model;
  const page = req.body.page;
  const image = req.body.image;
  game.push( { id: id, name: name, model: model, page: page, image:image} );
  console.log( game );
  res.render('zelda', {data: game} );
});

// Edit
app.get("/zelda/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = game[ number ];
  res.render('zelda_edit', {id: number, data: detail} );
});

// Update
app.post("/zelda/update/:number", (req, res) => {
  game[req.params.number].name = req.body.name;
  game[req.params.number].job = req.body.job;
  game[req.params.number].model = req.body.model;
  game[req.params.number].page = req.body.page;
  game[req.params.number].image = req.body.image;
  console.log( game );
  res.redirect('/zelda' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));