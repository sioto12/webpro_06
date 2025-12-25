"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let servant = [
  { id:0, name:"ヤマトタケル", class:"セイバー", attribute:"天", policy:"中立", trait:"善", image: "https://appmedia.jp/wp-content/uploads/2025/02/180817_d3058.webp" },
  { id:1, name:"メリュジーヌ", class:"ランサー", attribute:"地", policy:"中立", trait:"悪", image: "https://appmedia.jp/wp-content/uploads/2021/09/d63888db0252f3c1135b7371946fdbac.webp" },
  { id:2, name:"バーヴァンシー", class:"アーチャー", attribute:"地", policy:"混沌", trait:"悪", image: "https://appmedia.jp/wp-content/uploads/2025/03/120751_abo8l.webp" },
  { id:3, name:"太公望", class:"ライダー", attribute:"地", policy:"中立", trait:"善", image: "https://appmedia.jp/wp-content/uploads/2025/02/133950_zps6k.webp" },
  { id:4, name:"トネリコ", class:"キャスター", attribute:"地", policy:"秩序", trait:"中庸", image: "https://appmedia.jp/wp-content/uploads/2025/02/171743_5sbqa.webp" },
  { id:5, name:"光のコヤンスカヤ", class:"アサシン", attribute:"獣", policy:"秩序", trait:"悪", image: "https://appmedia.jp/wp-content/uploads/2025/02/130520_ol3n2.webp" },
  { id:6, name:"モルガン", class:"バーサーカー", attribute:"地", policy:"秩序", trait:"悪", image: "https://appmedia.jp/wp-content/uploads/2021/09/734f9bf482e4ce71c761ecd54f453b32.webp" },
  { id:7, name:"シエル", class:"ムーンキャンサー", attribute:"人", policy:"秩序", trait:"善", image: "https://appmedia.jp/wp-content/uploads/2025/02/190005_ez9vj.webp" },
  { id:8, name:"オルガマリー", class:"ビースト", attribute:"星", policy:"秩序", trait:"悪", image: "https://appmedia.jp/wp-content/uploads/2025/03/193941_dl5ti.webp" },
];

// 一覧
app.get("/fgo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('fgo', {data: servant} );
});

// Create
app.get("/fgo/create", (req, res) => {
  res.redirect('/public/fgo_new.html');
});

// Read
app.get("/fgo/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = servant[ number ];
  res.render('fgo_detail', {data: detail} );
});


// Delete
app.get("/fgo/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  servant.splice( req.params.number, 1 );
  res.redirect('/fgo' );
});

// Create
app.post("/fgo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
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
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = servant[ number ];
  res.render('fgo_edit', {id: number, data: detail} );
});

// Update
app.post("/fgo/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  servant[req.params.number].name = req.body.name;
  servant[req.params.number].class = req.body.class;
  servant[req.params.number].attribute = req.body.attribute;
  servant[req.params.number].policy = req.body.policy;
  servant[req.params.number].trait = req.body.trait;
  servant[req.params.number].image = req.body.image;
  console.log( servant );
  res.redirect('/fgo' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));