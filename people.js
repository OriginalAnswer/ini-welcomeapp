const peopleDB = [
    // A team
    {team:"A",name:"김세연",company:"세인트로그"},
    {team:"A",name:"김은수",company:"영암관광개발#영암CC"},
    {team:"A",name:"김준후",company:"(주)푸드코아"},
    {team:"A",name:"엄홍길",company:"휴먼재단"},
    {team:"A",name:"오무현",company:"케이버스건설"},
    {team:"A",name:"오현숙",company:"서정대학교"},
    {team:"A",name:"정동수",company:"글로벌유니티홀딩스"},
    {team:"A",name:"정운찬",company:"40대 국무총리,동반성장연구소"},
    {team:"A",name:"조전혁",company:"광운대학교"},
    {team:"A",name:"최성욱",company:"엠에스전자"},

    // B team
    {team:"B",name:"김종혁",company:'INI'},
    {team:"B",name:"민태홍",company:'알렉산더민 갤러리'},
    {team:"B",name:"박동우",company:'군인공제회'},
    
    // C team
    {team:"C",name:"김유라",company:"내가국수다"},
    {team:"C",name:"신아라",company:"마인테크놀러지"},
    
    // D team
    {team:"D",name:"",company:""},
    
    // E team
    {team:"E",name:"",company:""},
    
    // F team
    {team:"F",name:"",company:""},
    
    // G team
    {team:"G",name:"",company:""},
    
    // H team
    {team:"H",name:"",company:""},
    
    //  guest
    {team:"Guest",name:"",company:""},
]
const form = document.querySelector("#list-form")
peopleDB.forEach((item) => {
    if(item.name !== ""){
        // box
        const itemElement = document.createElement('label');
        itemElement.classList.add('item');

        // box>checkbox
        const itemCheckbox = document.createElement('input');
        itemCheckbox.classList.add('item-checkbox');
        itemCheckbox.setAttribute('type','checkbox');
        itemCheckbox.setAttribute('value', `${item.team},${item.name},${item.company}`);

        // box>.current_team
        const itemSectionTeam = document.createElement('span');
        itemSectionTeam.classList.add('item-team');
        itemSectionTeam.textContent = " " + item.team;
        
        // box>.current_name
        const itemSectionName = document.createElement('span');
        itemSectionName.classList.add('item-name');
        itemSectionName.textContent = " " + item.name;
        // box>.current_company
        const itemSectionCompany = document.createElement('span');
        itemSectionCompany.classList.add('item-company');
        itemSectionCompany.textContent = " " + item.company;
        
        itemElement.appendChild(itemCheckbox);
        itemElement.appendChild(itemSectionTeam);
        itemElement.appendChild(itemSectionName);
        itemElement.appendChild(itemSectionCompany);
        form.appendChild(itemElement)
    }
});

// 검색기능
const inputSearch = document.getElementById('input-search');
const pp = document.querySelectorAll('.item'); 

function search() {
    const searchValue = inputSearch.value.toLowerCase();
    console.log(searchValue);
    const pp = document.querySelectorAll('.item'); 
    for (var i = 0; i < pp.length; i++) {
        const itemName = pp[i].getElementsByClassName("item-name")[0].textContent.toLowerCase();
        if (itemName.includes(searchValue)) {
            pp[i].classList.remove('dpnone');// 보이기
        } else {
            pp[i].classList.add('dpnone'); // 숨기기
        }
    }
}


const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    const selectedItems = [];
    const checkboxes = form.querySelectorAll('.item-checkbox');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            const valueParts = checkbox.value.split(',');
            const team = valueParts[0];
            const name = valueParts[1];
            const company = valueParts[2];
            selectedItems.push({ team, name, company });
        }
    });
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    showSelectedItems(selectedItems);
});

// 페이지가 로드될 때 실행되는 함수
window.addEventListener('load', function() {
    const storedItems = JSON.parse(localStorage.getItem('selectedItems'));

    if (storedItems) {
        const checkboxes = form.querySelectorAll('.item-checkbox');

        checkboxes.forEach(function(checkbox) {
            const valueParts = checkbox.value.split(',');
            const team = valueParts[0];
            const name = valueParts[1];
            const company = valueParts[2];
            
            storedItems.forEach(function(item) {
                if (item.team === team && item.name === name && item.company === company) {
                    checkbox.checked = true;
                }
            });
        });

        // 선택된 항목들을 실시간으로 보여주기
        showSelectedItems(storedItems);
    
    }
});


function showSelectedItems(selectedItems) {
    console.log(selectedItems);
    const selectedItemsList = document.querySelector('.selected-items-list');
    selectedItemsList.innerHTML = '';

    selectedItems.forEach(function(item) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardTeamElement = document.createElement('div');
        cardTeamElement.classList.add('card-team');
        cardTeamElement.textContent = "TEAM " + item.team;

        const cardNameElement = document.createElement('div');
        cardNameElement.classList.add('card-name');
        cardNameElement.textContent = item.name;
        
        const cardCompanyElement = document.createElement('div');
        cardCompanyElement.classList.add('card-company');
        cardCompanyElement.textContent = item.company;


        cardElement.appendChild(cardTeamElement);
        cardElement.appendChild(cardNameElement);
        cardElement.appendChild(cardCompanyElement);
        selectedItemsList.appendChild(cardElement);
    });
}



function checkreset(){
    const checkboxs = document.querySelectorAll('.item-checkbox');
    checkboxs.forEach((c) => {
        c.checked = false;
    })
    const submit = document.querySelector('.submit-button');
    submit.click();
}
window.addEventListener('load', function() {
    // 페이지 로드 시 실행되는 코드

    // 로컬 스토리지에서 저장된 selectedItems 데이터 가져오기
    const storedItems = JSON.parse(localStorage.getItem('selectedItems'));

    // 선택된 항목들을 실시간으로 보여주는 함수 호출
    showSelectedItems(storedItems);

    // 1초마다 선택된 항목들을 다시 보여주는 기능
    setInterval(function() {
        const storedItems = JSON.parse(localStorage.getItem('selectedItems'));
        showSelectedItems(storedItems);
    }, 1000); // 1000ms = 1초
});