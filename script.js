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
function initVisitorCounter() {
    // 유니크한 네임스페이스 설정 (실제 배포시 충돌 방지를 위해 난수 포함 권장하지만, 여기선 고정값 사용)
    const NAMESPACE = 'season-bite-dessert-shop';

    // 날짜 포맷 (YYYY-MM-DD)
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    // 1. Total 방문자 수 (Total Hits)
    // countapi.xyz 무료 API 사용
    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/total`)
        .then(res => res.json())
        .then(data => {
            const totalElement = document.getElementById('total-visitors');
            if (totalElement) {
                totalElement.textContent = data.value.toLocaleString(); // 쉼표 추가 (10,000)
            }
        })
        .catch(err => console.log('Counter API Error:', err));

    // 2. Today 방문자 수 (Daily Hits based on Date)
    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/day-${dateKey}`)
        .then(res => res.json())
        .then(data => {
            const todayElement = document.getElementById('today-visitors');
            if (todayElement) {
                todayElement.textContent = data.value.toLocaleString();
            }
        })
        .catch(err => console.log('Counter API Error:', err));
}

// 오늘 날짜 표시 함수
function renderDate() {
