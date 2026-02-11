// ==========================================
// 🧁 사장님, 여기서 오늘의 메뉴를 수정하세요! 🧁
// ==========================================
// lineup 배열 안에 메뉴 정보를 입력하면 자동으로 화면에 반영됩니다.
const todaysLineup = [
    {
        name: "딸기 생크림 케이크",
        description: "신선한 딸기와 100% 동물성 생크림의 조화",
        quantity: "5개 남음", // 수량 텍스트
        price: "7,500원",
        isSoldOut: false // 품절이면 true, 판매중이면 false
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
        isSoldOut: true // 품절 처리
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
});

// 오늘 날짜 표시 함수
function renderDate() {
    const dateElement = document.getElementById('current-date');
    const today = new Date();
    
    // YYYY. MM. DD 형식으로 변환
    const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;
    
    // 요일 추가 (선택사항)
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = days[today.getDay()];
    
    dateElement.textContent = `${formattedDate} (${dayName})`;
}

// 메뉴 렌더링 함수
function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = ''; // 기존 내용 초기화

    todaysLineup.forEach(item => {
        const menuCard = document.createElement('div');
        menuCard.className = `menu-item ${item.isSoldOut ? 'sold-out' : ''}`;
        
        // 품절 여부에 따른 뱃지 텍스트
        const badgeText = item.isSoldOut ? 'SOLD OUT' : item.quantity;

        menuCard.innerHTML = `
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p class="menu-desc">${item.description}</p>
                <span class="menu-price">${item.price}</span>
            </div>
            <div class="menu-status">
                <span class="menu-badge">${badgeText}</span>
            </div>
        `;

        container.appendChild(menuCard);
    });
}
