# Nobin-EX Server

بک‌اند Express.js برای پروژه Nobin-EX

## نصب و راه‌اندازی

### 1. نصب dependencies

```bash
cd server
pnpm install
```

### 2. تنظیم environment variables

```bash
cp .env.example .env
```

### 3. اجرای سرور در حالت development

```bash
pnpm run dev
```

### 4. اجرای سرور در حالت production

```bash
pnpm start
```

## API Endpoints

### Health Check

- `GET /health` - بررسی وضعیت سرور

### API Routes

- `GET /api/` - اطلاعات کلی API
- `GET /api/data` - دریافت داده‌های نمونه
- `GET /api/widgets` - اطلاعات ویجت‌ها
- `POST /api/data` - ارسال داده

## ساختار پروژه

```
server/
├── src/
│   ├── routes/          # مسیرهای API
│   ├── controllers/     # کنترلرها
│   ├── middleware/      # میدلورها
│   └── config/          # تنظیمات
├── package.json
└── README.md
```

## پورت پیش‌فرض

سرور روی پورت `3001` اجرا می‌شود.

## تست API

پس از اجرای سرور:

- Health Check: http://localhost:3001/health
- API Info: http://localhost:3001/api
