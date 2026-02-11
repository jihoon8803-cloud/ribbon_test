// ==========================================
// 🍂 사장님, 여기서 오늘의 메뉴를 수정하세요! 🍂
// ==========================================
// lineup 배열 안에 메뉴 정보를 입력하면 자동으로 화면에 반영됩니다.
const todaysLineup = [
    {
        name: "딸기 생크림 케이크",
        description: "신선한 딸기와 100% 동물성 생크림의 조화",
        quantity: "5개 남음",
        price: "7,500원",
        isSoldOut: false
    },
    {
        name: "발로나 초코 컵케이크",
        description: "진한 다크 초콜릿의 풍미 가득",
        quantity: "3개 남음",
        price: "4,500원",
        isSoldOut: false
    },
    {
        name: "레몬 마들렌",
        description: "상큼한 레몬 글레이즈가 듬뿍",
        quantity: "여유",
        price: "2,800원",
        isSoldOut: false
    },
    {
        name: "바닐라 까눌레",
        description: "겉바속촉의 정석, 천연 바닐라빈 듬뿍",
        quantity: "품절",
        price: "3,200원",
        isSoldOut: true
    },
    {
        name: "얼그레이 휘낭시에",
        description: "향긋한 얼그레이 향이 가득한 티푸드",
        quantity: "8개 남음",
        price: "3,000원",
        isSoldOut: false
    }
];

// ==========================================
// 👇 여기 아래는 건드리지 않으셔도 됩니다! 👇
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    renderDate();
    renderMenu();
    initVisitorCounter(); // Start visitor counter
});

// ... (renderDate and renderMenu functions remain unchanged) ...

// 📊 방문자 수 카운터 (Real Logic)
// 📊 방문자 수 카운터 (Real Logic - CounterAPI.dev)
function initVisitorCounter() {
    // 유니크한 네임스페이스 (이 부분을 가게 이름 영문으로 변경하세요)
    const NAMESPACE = 'season-bite-dessert-shop-v3';

    // 날짜 포맷 (YYYY-MM-DD)
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // 1. Total 방문자 수 (Total Hits - Increment & Get)
    // api.counterapi.dev 사용
    fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/total/up`)
        .then(res => res.json())
        .then(data => {
            const totalElement = document.getElementById('total-visitors');
            if (totalElement) {
                totalElement.textContent = data.count.toLocaleString();
            }
        })
        .catch(err => {
            console.log('Total Counter Error:', err);
            // 에러 발생 시 0으로 표시하지 않고 기존 텍스트 유지하거나 숨김 처리
        });

    // 2. Today 방문자 수 (Daily Hits - Increment & Get)
    fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/day-${dateKey}/up`)
        .then(res => res.json())
        .then(data => {
            const todayElement = document.getElementById('today-visitors');
            if (todayElement) {
                todayElement.textContent = data.count.toLocaleString();
            }
        })
        .catch(err => {
            console.log('Today Counter Error:', err);
        });
}

// 오늘 날짜 표시 함수
function renderDate() {
    const dateElement = document.getElementById('current-date');
    const today = new Date();

    const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const dayName = days[today.getDay()];

    dateElement.textContent = `${formattedDate} ${dayName}`;
}

// 메뉴 렌더링 함수
function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';

    todaysLineup.forEach(item => {
        const menuCard = document.createElement('div');
        // CSS class name changed to 'menu-item' (same as before but styling is different)
        menuCard.className = `menu-item ${item.isSoldOut ? 'sold-out' : ''}`;

        const badgeText = item.isSoldOut ? 'SOLD OUT' : item.quantity;

        menuCard.innerHTML = `
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p class="menu-desc">${item.description}</p>
                <div class="menu-price">${item.price}</div>
            </div>
            <div class="menu-status">
                <span class="menu-badge">${badgeText}</span>
            </div>
        `;

        container.appendChild(menuCard);
    });
}
