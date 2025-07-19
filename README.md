# Nobin-EX

یک داشبورد شخصی مدرن با ویجت‌های مختلف، ساخته شده با React + TypeScript + Vite در فرانت‌اند و Express.js در بک‌اند.

## ویژگی‌ها

- 🎨 رابط کاربری مدرن با HeroUI
- 📱 طراحی واکنش‌گرا (Responsive)
- 🌤️ ویجت آب و هوا
- 📋 ویجت Todo
- 📅 ویجت تقویم
- 📰 ویجت اخبار
- 👤 ویجت پروفایل
- 🔍 ویجت جستجو
- 💰 ویجت نرخ ارز
- 🕒 ویجت ساعت

## ساختار پروژه

```
nobin-ex/
├── client/          # فرانت‌اند (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── widgets/
│   │   ├── layouts/
│   │   └── ...
│   └── package.json
├── server/          # بک‌اند (Express.js)
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── ...
│   └── package.json
└── package.json     # Root workspace
```

## نصب و راه‌اندازی

### پیش‌نیازها

- Node.js (نسخه 18 یا بالاتر)
- pnpm

### 1. کلون کردن پروژه

```bash
git clone <repository-url>
cd nobin-ex
```

### 2. نصب dependencies

```bash
pnpm install
```

### 3. اجرای پروژه

#### اجرای فقط فرانت‌اند

```bash
pnpm dev:client
```

#### اجرای فقط بک‌اند

```bash
pnpm dev:server
```

#### اجرای همزمان فرانت‌اند و بک‌اند

```bash
pnpm dev:all
```

## دسترسی به برنامه

- **فرانت‌اند**: http://localhost:5173
- **بک‌اند API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## API Endpoints

- `GET /health` - بررسی وضعیت سرور
- `GET /api/` - اطلاعات کلی API
- `GET /api/data` - دریافت داده‌های نمونه
- `GET /api/widgets` - اطلاعات ویجت‌ها
- `POST /api/data` - ارسال داده

## Scripts موجود

```bash
# Development
pnpm dev:client      # اجرای فرانت‌اند
pnpm dev:server      # اجرای بک‌اند
pnpm dev:all         # اجرای همزمان

# Build
pnpm build:client    # ساخت فرانت‌اند
pnpm build:server    # ساخت بک‌اند

# Linting
pnpm fix            # اصلاح خودکار کد
pnpm check          # بررسی کد
```

## تکنولوژی‌های استفاده شده

### فرانت‌اند

- React 19
- TypeScript
- Vite
- HeroUI
- TailwindCSS
- Framer Motion
- React Query
- Axios

### بک‌اند

- Express.js
- CORS
- Helmet
- Morgan
- Compression
- dotenv

## مشارکت

برای مشارکت در پروژه:

1. Fork کنید
2. برنچ جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. برنچ را push کنید (`git push origin feature/amazing-feature`)
5. Pull Request ایجاد کنید
