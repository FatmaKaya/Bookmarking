# Bookmarking

### Açıklama

Kullanıcıların yapabileceği basit bir kitap arama ve yer imi ekleyebilmesi için geliştirilmiş API.

Google Kitaplar API'sini kullanarak ilgili kitapları başlığa, yazara veya anahtar kelimelere göre arayın.

##### Uygulamanın üzerinden yapılabilecek işlemler aşağıda listelenmiştir:
- Kitap arama ve sonuçları görme.
- Eposta ve parola ile kayıt olma. (Aynı eposta ile birden fazla kayıt yapılamaz.)
- Hesaba giriş yapmak.
- Hesaba giriş yaptıysam kitap yer imi ekleme. (Aynı kitaba birden fazla kez yer imi eklenemez.)
- Hesaba giriş yaptıysam kitabı yer iminden kaldırma.
- Yer imi listesi.

##### Kullanılan Teknolojiler
- Nodejs
- Express.js
- Sequelize ORM 
- MySQL 

### İndirilen Projenin Çalıştırılması

[Database script - Postman Collection](https://github.com/FatmaKaya/Bookmarking/tree/main/sql-postman) 

Paketilerin kurulumu ve uygulama çalıştırılması:

```sh
yarn install
```
```sh
yarn start
```

### Kaynak 
- [Nodejs-Express-Sequelize-Mysql](https://www.bezkoder.com/node-js-express-sequelize-mysql/) - Proje oluşturma aşamaları
- [Sequelize - Relations](https://medium.com/@eth3rnit3/sequelize-relationships-ultimate-guide-f26801a75554) - İlişki oluşturma aşamaları
- [Express Tutorial](https://expressjs.com/en/guide/using-middleware.html) - Error handling ve middleware işlemleri

