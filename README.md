# Teknolojik Yemekler 🍕

Workintech Full Stack Web Development programının S8 challenge projesi. Bilgisayar başında acıkan yazılımcılar için hazırlanmış bir pizza sipariş sitesi.

**Akış:** Anasayfa → Sipariş Formu → Sipariş Onayı

## Özellikler

- Sipariş formunda boyut, hamur, ek malzeme, isim ve not alanları
- Form doğrulama: isim en az 3 karakter, malzeme en az 4 en fazla 10
- Seçimlere ve adede göre anlık fiyat hesaplama
- Form hatalıyken sipariş butonu pasif
- Axios ile [reqres.in](https://reqres.in) API'sine sipariş gönderme
- Gelen yanıtın (sipariş no, tarih) onay sayfasında gösterilmesi
- İnternet hatasında kullanıcıya uyarı mesajı
- Anasayfada kategoriye göre ürün filtreleme
- Mobil ve tablet uyumlu tasarım

## Kullanılan Teknolojiler

- React 18 + Vite
- React Router v5
- Axios
- Cypress (uçtan uca testler)
- axe-core (erişilebilirlik testleri)

## Kurulum

```sh
npm install
npm run dev
```

Proje `http://localhost:5173` adresinde açılır.

## Testler

Testleri çalıştırmadan önce `npm run dev` açık olmalı.

```sh
npm run cypress     # Cypress arayüzünü açar
npm run test:e2e    # Testleri terminalde çalıştırır
```

## Neler Öğrendim

- Kontrollü formlar ve tek bir `handleChange` ile farklı input türlerini yönetmek
- Form doğrulama ve kullanıcıya hata mesajı göstermek
- State lifting ile sayfalar arasında veri taşımak
- Axios ile API isteği atmak ve hataları yakalamak
- Cypress ile test yazmak
