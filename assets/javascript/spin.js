(() => {
    const $ = document.querySelector.bind(document);
    const wheel = $('.wheel');
    const btn__wheel = $('.btn__wheel');
    const wheel__result__btn = $('.wheel__result__btn');
    const message = document.querySelectorAll('.redult'); // Sửa lại tên class 'redult' (nếu bị sai chính tả)
    const wheel__result = document.querySelectorAll('.wheel__result');

    console.log(wheel__result)
    let timer = 7000; // Thời gian quay (ms)
    let isRotating = false; // Trạng thái đang quay
    let currentRotate = 0; // Góc hiện tại của bánh xe
    let hasStarted = false; // Trạng thái đã quay hay chưa

    // Danh sách quà tặng
    const listGift = [
        { textName: '売店10％OFF', percent: (100 / 6) / 100 },
        { textName: 'Gカートグローブプレゼント', percent: (100 / 6) / 100 },
        { textName: '売店10％OFF', percent: (100 / 6) / 100 },
        { textName: 'Gカートグローブプレゼント', percent: (100 / 6) / 100 },
        { textName: '売店10％OFF', percent: (100 / 6) / 100 },
        { textName: 'Gカートグローブプレゼント', percent: (100 / 6) / 100 },
    ];

    const size = listGift.length; // Số phần tử quà tặng
    const rotate = 360 / size; // Góc mỗi phần tử
    const skewY = 90 - rotate; // Độ nghiêng của từng phần tử

    // Render các phần tử trên bánh xe
    const renderItem = () => {
        listGift.forEach((item, index) => {
            const itemGift = document.createElement('li');
            itemGift.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;
            itemGift.innerHTML = `
                <p class="text__item ${index % 2 === 0 ? 'even' : ''}" 
                    style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);">
                    <b>${item.textName}</b>
                </p>`;
            wheel.appendChild(itemGift);
        });
    };

    // Gọi hàm render
    renderItem();

    // Hàm xoay bánh xe
    const rotateWheel = (currentRotate, index) => {
        wheel.style.transition = `transform ${timer / 1000}s cubic-bezier(0.075, 0.82, 0.165, 1)`;
        wheel.style.transform = `rotate(${currentRotate - index * rotate - rotate / 2}deg)`;
    };

    // Lấy quà dựa trên randomNumber
    const getGift = (randomNumber) => {
        let currentPercent = 0;
        let list = [];

        listGift.forEach((item, index) => {
            currentPercent += item.percent;
            if (randomNumber <= currentPercent) {
                list.push({ ...item, index });
            }
        });
        return list[0]; // Đảm bảo trả về kết quả đầu tiên
    };

    // Hiển thị kết quả
    const showTextGift = (text) => {
        setTimeout(() => {
            isRotating = false; // Cho phép quay tiếp sau khi hoàn thành
            hasStarted = true; // Đánh dấu đã hoàn tất start
            wheel__result.forEach((element) => {
                element.style.display = 'inline-flex';
                message.forEach((element) => {
                    element.innerHTML = `${text}`;
                });
                wheel__result__btn.style.display="block"
            });
            btn__wheel.textContent = "クーポン獲得"; // Đổi nút thành 'クーポン獲得'
        }, timer); // Hiển thị sau khi hoàn thành thời gian quay
    };

    // Hàm bắt đầu quay
    const start = () => {
        if (isRotating) return; // Ngăn việc bấm liên tục khi đang quay
        isRotating = true; // Đặt trạng thái quay

        const random = Math.random(); // Sinh số ngẫu nhiên
        const gift = getGift(random); // Lấy quà tặng dựa trên xác suất
        currentRotate += 360 + 360 * 5; // Quay thêm 5 vòng
        rotateWheel(currentRotate, gift.index); // Xoay đến vị trí quà tặng
        showTextGift(gift.textName); // Hiển thị kết quả sau khi quay xong
    };

    // Gắn sự kiện click vào nút quay
    btn__wheel.addEventListener('click', () => {
        if (!hasStarted) {
            start(); // Chưa start thì thực hiện quay
        } else {
            // Nếu đã quay xong, cuộn tới header
            const header = document.querySelector('header');
            header.scrollIntoView({ behavior: 'smooth' });
        }
    });
})();
