E-Commerce Admin Paneli (React)

![Ekran görüntüsü 2024-04-13 213004](https://github.com/bahattinercan/e-commerce-admin/assets/92323340/2d71d864-0c7c-4c3c-92f8-97aeb7e08148)
![Ekran görüntüsü 2024-04-13 213027](https://github.com/bahattinercan/e-commerce-admin/assets/92323340/966ac9ff-6dec-4a99-8fe7-7f2fcf86088b)
![Ekran görüntüsü 2024-04-13 213106](https://github.com/bahattinercan/e-commerce-admin/assets/92323340/cf083c25-762f-4a1f-b8e2-6cb6ca4187ad)
![Ekran görüntüsü 2024-04-13 213143](https://github.com/bahattinercan/e-commerce-admin/assets/92323340/065aa7c5-0631-44dc-be29-3e2daf5434a1)

## Kurulum

```bash
npm install
cp .env.example .env.local   # opsiyonel, API adresini değiştirmek için
npm run dev                  # http://localhost:5173
```

Varsayılan API adresi `http://localhost:4000`. Farklı bir adres için `.env.local` içinde
`VITE_API_URL` tanımlayın.

## Giriş

Panel artık login ekranıyla korunur:

1. Backend'de bir admin kullanıcısı oluşturun:
   `cd ../e-commerce-backend && npm run create-admin -- admin@example.com sifreniz`
2. Admin panelinde bu email/şifre ile giriş yapın.

Giriş akışı: `POST /login` ile token alınır, ardından `GET /adminVerify` ile hesabın
admin yetkisi olduğu doğrulanır; yetkisi olmayan hesaplar panele alınmaz. Token
`localStorage`'da (`admin-auth-token`) tutulur ve ürün ekleme/silme/görsel yükleme
isteklerinde `auth-token` header'ı olarak gönderilir. Token geçersizse (401/403)
oturum temizlenip login ekranına dönülür.

## Kontroller

```bash
npm run lint
npm run build
```
