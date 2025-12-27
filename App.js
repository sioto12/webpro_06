"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let servant = [
  { id:0, name:"ヤマトタケル", class:"セイバー", attribute:"天", policy:"中立", trait:"善", image: "/public/images/fgo/ヤマトタケル.png" },
  { id:1, name:"メリュジーヌ", class:"ランサー", attribute:"地", policy:"中立", trait:"悪", image: "/public/images/fgo/メリュジーヌ.png" },
  { id:2, name:"バーヴァンシー", class:"アーチャー", attribute:"地", policy:"混沌", trait:"悪", image: "/public/images/fgo/バーヴァンシー.png" },
  { id:3, name:"太公望", class:"ライダー", attribute:"地", policy:"中立", trait:"善", image: "/public/images/fgo/太公望.png" },
  { id:4, name:"トネリコ", class:"キャスター", attribute:"地", policy:"秩序", trait:"中庸", image: "/public/images/fgo/トネリコ.png" },
  { id:5, name:"光のコヤンスカヤ", class:"アサシン", attribute:"獣", policy:"秩序", trait:"悪", image: "/public/images/fgo/光のコヤンスカヤ.png" },
  { id:6, name:"モルガン", class:"バーサーカー", attribute:"地", policy:"秩序", trait:"悪", image: "/public/images/fgo/モルガン.png" },
  { id:7, name:"シエル", class:"ムーンキャンサー", attribute:"人", policy:"秩序", trait:"善", image: "/public/images/fgo/シエル.png" },
  { id:8, name:"オルガマリー", class:"ビースト", attribute:"星", policy:"秩序", trait:"悪", image: "/public/images/fgo/オルガマリー.png" },
];

// 一覧
app.get("/fgo", (req, res) => {
  res.render('fgo', {data: servant} );
});

// Create
app.get("/fgo/create", (req, res) => {
  res.redirect('/public/fgo_new.html');
});

// Read
app.get("/fgo/:number", (req, res) => {
  const number = req.params.number;
  const detail = servant[ number ];
  res.render('fgo_detail', {data: detail} );
});


// Delete
app.get("/fgo/delete/:number", (req, res) => {
  servant.splice( req.params.number, 1 );
  res.redirect('/fgo' );
});

// Create
app.post("/fgo", (req, res) => {
  const id = servant.length;
  const name = req.body.name;
  const s_class = req.body.class;
  const attribute = req.body.attribute;
  const policy = req.body.policy;
  const trait =  req.body.trait;
  const image = req.body.image;
  servant.push( { id: id, name: name, class: s_class, attribute: attribute, policy: policy, trait: trait, image: image } );
  console.log( servant );
  res.render('fgo', {data: servant} );
});

// Edit
app.get("/fgo/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = servant[ number ];
  res.render('fgo_edit', {id: number, data: detail} );
});

// Update
app.post("/fgo/update/:number", (req, res) => {
  servant[req.params.number].name = req.body.name;
  servant[req.params.number].class = req.body.class;
  servant[req.params.number].attribute = req.body.attribute;
  servant[req.params.number].policy = req.body.policy;
  servant[req.params.number].trait = req.body.trait;
  servant[req.params.number].image = req.body.image;
  console.log( servant );
  res.redirect('/fgo' );
});

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

let game = [
  { id:0, name:"ゼルダの伝説", model:"ファミリーコンピュータ", page:"https://www.nintendo.com/jp/famicom/software/zelda1/index.html", image:"/public/images/ゼルダ/ゼルダの伝説.png"},
  { id:1, name:"リンクの冒険", model:"ファミリーコンピュータ", page:"https://www.nintendo.com/jp/famicom/software/zelda2/index.html", image:"/public/images/ゼルダ/リンクの冒険.png"},
  { id:2, name:"ゼルダの伝説　神々のトライフォース", model:"スーパーファミコン,ゲームボーイアドバンス", page:"https://www.nintendo.co.jp/n02/shvc/zl/index.html", image:"/public/images/ゼルダ/神々のトライフォース.png"},
  { id:3, name:"ゼルダの伝説　夢を見る島", model:"ゲームボーイ,Nintendo Switch", page:"https://www.nintendo.com/jp/switch/ar3na/index.html", image:"/public/images/ゼルダ/夢を見る島.png"},
  { id:4, name:"ゼルダの伝説　時のオカリナ", model:"NINTENDO 64,ニンテンドー3DS", page:"https://www.nintendo.co.jp/3ds/aqej/#/", image:"/public/images/ゼルダ/時のオカリナ.png"},
  { id:5, name:"ゼルダの伝説　ムジュラの仮面", model:"NINTENDO 64,ニンテンドー3DS", page:"https://www.nintendo.co.jp/3ds/ajrj/index.html", image:"/public/images/ゼルダ/ムジュラの仮面.png"},
  { id:6, name:"ゼルダの伝説　ふしぎの木の実", model:"ゲームボーイカラー", page:"https://www.nintendo.co.jp/n02/dmg/az7jaz8j/index.html", image:"/public/images/ゼルダ/ふしぎの木の実.png"},
  { id:7, name:"ゼルダの伝説　風のタクト", model:"ニンテンドー ゲームキューブ, Wii U", page:"https://www.nintendo.co.jp/wiiu/bczj/index.html", image:"/public/images/ゼルダ/風のタクト.png"},
  { id:8, name:"ゼルダの伝説　4つの剣", model:"ゲームボーイアドバンス", page:"https://www.nintendo.com/jp/games/feature/nintendo-classics/a-5190_j/index.html", image:"/public/images/ゼルダ/4つの剣.png"},
  { id:9, name:"ゼルダの伝説　4つの剣＋", model:"ゲームキューブ", page:"https://www.nintendo.co.jp/ngc/g4sj/index.html", image:"/public/images/ゼルダ/4つの剣＋.png"},
  { id:10, name:"ゼルダの伝説　ふしぎのぼうし", model:"ゲームボーイアドバンス", page:"https://www.nintendo.co.jp/n08/bzmj/index.html", image:"/public/images/ゼルダ/ふしぎのぼうし.png"},
  { id:11, name:"ゼルダの伝説　トワイライトプリンセス", model:"ゲームキューブ, Wii U", page:"https://www.nintendo.co.jp/wiiu/azaj/index.html", image:"/public/images/ゼルダ/トワイライトプリンセス.png"},
  { id:12, name:"ゼルダの伝説　夢幻の砂時計", model:"ニンテンドーDS", page:"https://www.nintendo.co.jp/ds/azej/index.html", image:"/public/images/ゼルダ/夢幻の砂時計.png"},
  { id:13, name:"ゼルダの伝説　大地の汽笛", model:"ニンテンドーDS", page:"https://www.nintendo.co.jp/ds/bkij/index.html", image:"/public/images/ゼルダ/大地の汽笛.png"},
  { id:14, name:"ゼルダの伝説　スカイウォードソード", model:"Wii, Nintendo Switch", page:"https://www.nintendo.com/jp/switch/az89a/index.html", image:"/public/images/ゼルダ/スカイウォードソード.png"},
  { id:15, name:"ゼルダの伝説　神々のトライフォース２", model:"ニンテンドー3DS", page:"https://www.nintendo.co.jp/3ds/bzlj/index.html", image:"/public/images/ゼルダ/神々のトライフォース２.png"},
  { id:16, name:"ゼルダの伝説　トライフォース３銃士", model:"ニンテンドー3DS", page:"https://www.nintendo.co.jp/3ds/ea3j/index.html", image:"/public/images/ゼルダ/トライフォース３銃士.png"},
  { id:17, name:"ゼルダの伝説　ブレス　オブ　ザ　ワイルド", model:"Nintendo Switch, Nintendo Switch2", page:"https://www.nintendo.com/jp/zelda/botw/index.html", image:"/public/images/ゼルダ/ブレワイ.png"},
  { id:18, name:"ゼルダの伝説　ティアーズ　オブ　ザ　キングダム", model:"Nintendo Switch, Nintendo Switch2", page:"https://www.nintendo.com/jp/zelda/totk/index.html", image:"/public/images/ゼルダ/ティアキン.png"},
  { id:19, name:"ゼルダの伝説　知恵のかりもの", model:"Nintendo Switch", page:"https://www.nintendo.com/jp/switch/bdgea/index.html", image:"/public/images/ゼルダ/知恵のかりもの.png"},

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
  game[req.params.number].model = req.body.model;
  game[req.params.number].page = req.body.page;
  game[req.params.number].image = req.body.image;
  console.log( game );
  res.redirect('/zelda' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
