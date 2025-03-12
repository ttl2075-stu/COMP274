# Các hàm cấu hình, chuyển đổi:

## Hàm init

Kiểm tra xem file có canvas hay không
Gọi các hàm initGL, drawGrid, draw _(Hàm vẽ hình)_

## Hàm initGL

Clear màu và kích hoạt các chế độ cần thiết
glOrtho khai báo vùng vẽ (nếu draw ngoài vùng sẽ không cần thực hiện)

## Hàm drawGrid

Hàm vẽ lưới để có thể dễ dàng tính toạ độ khi gọi/ vẽ các đối tượng

## Hàm hex2rgb(hex)

Chuyển đổi màu sắc truyền vào là một mã hex và trả ra mảng chứa các giá trị từ 0-255 theo chuẩn RGB  
Input: Mã màu hex  
Output: [r, g, b]

# Các hàm vẽ

## Hàm tô màu nền

fillBackground (r, g, b)  
Tô lại màu nền và lưới

## Vẽ hình chữ nhật

    drawRetagle(x, y, width, height, color = '#ff33ff')

Tại vị trí toạ độ x, y vẽ chiều dài sang bên phải và chiều cao xuống dưới

## Vẽ hình vuông

    drawSquare(x, y, size, color = '#ff33ff')

Tại vị trí toạ độ x, y vẽ chiều dài sang bên phải và chiều cao xuống dưới
Hàm sử dụng lại hàm `drawRetagle`

## Vẽ hình tròn

    drawCircle(x, y, r, color = '#ff33ff')

Tại vị trí x, y là tâm hình tròn và hình tròn có bán kính là r, được vẽ bắt đầu từ tâm

## Vẽ hình tam giác

    drawTriangle(x1, y1, x2, y2, x3, y3, color = '#ff33ff')

Hàm vẽ hình tam giác, với lần lượt (x1, y1), (x2, y2), (x3, y3) là toạ độ 3 điểm của một tam giác

## Hàm vẽ mặt trời

    drawSun(x, y, r, color = '#f7db02', rays = 12, rayLength = r * 1.5, rayThickness = 2)

Hàm vẽ hình mặt trời với tham số truyền vào:

- x, y: Toạ độ tâm của hình mặt trời
- r: Bán kính của mặt trời
- rays: Số tia nắng (mặc định: 12)
- rayLength: Độ dài của các tia nắng (mặc định: 1.5 \* r)
- rayThickness: Độ dày của tia nắng (mặc dịnh: 2)

### Hàm vẽ các tia nắng

    drawSunWithRays(x, y, r, angle, color = '#f7db02', rays = 12, rayLength = r * 1.5, rayThickness = 2)

## Hàm vẽ mặt trăng

    drawMoon(x, y, r)

Tham số truyền vào (x, y) toạ độ tâm của mặt trăng và r là bán kính của mặt trăng  
Sử dung hàm `drawCircle`

## Hàm vẽ ngôi sao 5 cánh

    drawStar(x, y, outerRadius, color = '#f7db02')

Tham số truyền vào:

- x, y: Toạ độ tâm của ngôi sao
- outerRadius: Độ dài của các cánh sao

## Hàm vẽ lá cờ Việt Nam

    drawVietNamFlag(x, y, width, height = width*(2/3))

Các tham số truyền vào:

- (x, y): Toạ độ của lá cờ.
- width: Chiều dài của lá cờ _(Chiều dài lá cờ được vẽ sang phía bên phải)_
- height=width*(2/3) : Chiều cao của lá cờ *(Chiều cao của lá cờ sẽ được vẽ xuống phía dưới. Không nên sửa tham số này, <u>tham số mặc định theo đúng chuẩn kích thước của Việt Nam nên không cần truyền vào</u>)\*
  Hàm sử dụng lại các hàm `drawRetagle` và `drawStar`
