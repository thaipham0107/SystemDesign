# Bản sao học tập cá nhân: System Design (Designed to Scale)

Repo này tạo một **bản sao offline, dùng riêng để học** của khoá học tương tác
**System Design** tại <https://designed-to-scale.vercel.app/>, do
**Dilum Sanjaya** ([@DilumSanjaya](https://x.com/DilumSanjaya)) làm.
Mọi nội dung, hình minh hoạ và mã của khoá học thuộc về tác giả gốc.
Đây **không** phải sản phẩm của chủ repo, và không được triển khai công khai.

## Cách hoạt động

Repo **không chứa** nội dung của trang gốc. Script `scripts/mirror.mjs` tải
trang về máy bạn (thư mục `site/`, đã nằm trong `.gitignore`), gồm: trang chính,
JS/CSS, toàn bộ ~40 bài học, 21 ngôn ngữ (có tiếng Việt), font và icon.
Vì là bản tải nguyên vẹn, giao diện, hình ảnh, animation, phím tắt, tìm kiếm,
chế độ tối, tiến độ học... đều giống y hệt bản gốc, và chạy được khi không có mạng.

## Sử dụng

Cần Node.js 18 trở lên, không cần `npm install`.

```bash
npm run mirror   # tải (hoặc cập nhật) bản sao vào ./site  (~16 MB)
npm start        # mở http://localhost:4173
```

Mẹo: thêm `?lang=vi` vào địa chỉ để học bằng tiếng Việt, ví dụ
<http://localhost:4173/?lang=vi>. Đổi cổng bằng `PORT=8080 npm start`.

## Lưu ý bản quyền

- Chỉ dùng cho việc học cá nhân. Không đăng lại, không deploy công khai,
  không ghi tên mình là tác giả.
- Không commit thư mục `site/` lên repo công khai.
- Nếu thấy hữu ích, hãy ủng hộ tác giả tại trang gốc.
