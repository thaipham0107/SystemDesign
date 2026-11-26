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

## Xem trên điện thoại: Cloudflare Pages (riêng tư)

Workflow `.github/workflows/deploy-cloudflare.yml` tự tải trang trong GitHub Actions
và đưa lên Cloudflare Pages (không commit nội dung gốc vào repo). Nó chạy mỗi lần
push, mỗi thứ Hai (để cập nhật theo bản gốc), hoặc bấm tay trong tab **Actions**.

Làm một lần:

1. **Tạo API token**: Cloudflare dashboard → *My Profile → API Tokens → Create Token*
   → *Create Custom Token*, quyền **Account → Cloudflare Pages → Edit**.
2. **Lấy Account ID**: dashboard → *Workers & Pages*, cột bên phải có *Account ID*.
3. **Thêm vào GitHub**: repo → *Settings → Secrets and variables → Actions*,
   tạo 2 secret `CLOUDFLARE_API_TOKEN` và `CLOUDFLARE_ACCOUNT_ID`.
4. **Chạy deploy**: tab *Actions → Deploy to Cloudflare Pages → Run workflow*.
   Xong sẽ có địa chỉ `https://system-design-study.pages.dev`
   (nếu tên bị trùng, tạo biến `CF_PAGES_PROJECT` trong *Variables* với tên khác).
5. **Khoá lại chỉ cho mình bạn** (bắt buộc, vì đây là nội dung của tác giả):
   *Workers & Pages → system-design-study → Settings → General → Access policy → Enable*.
   Sau đó vào *Zero Trust → Access → Applications*, sửa ứng dụng vừa tạo:
   - Thêm cả tên miền chính `system-design-study.pages.dev` (mặc định chỉ khoá bản preview).
   - Policy: *Allow*, *Include → Emails →* email của bạn.
   Khi mở trên điện thoại, Cloudflare gửi mã đăng nhập vào email; nhập mã là vào được.

Mẹo trên điện thoại: mở `https://system-design-study.pages.dev/?lang=vi`, rồi
*Thêm vào màn hình chính* để dùng như một ứng dụng.

## Lưu ý bản quyền

- Chỉ dùng cho việc học cá nhân. Không đăng lại, không deploy công khai,
  không ghi tên mình là tác giả.
- Không commit thư mục `site/` lên repo công khai.
- Nếu thấy hữu ích, hãy ủng hộ tác giả tại trang gốc.
