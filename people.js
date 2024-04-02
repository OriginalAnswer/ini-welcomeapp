const peopleDB = [
    // A team
    {team:"A",name:"홍길동",company:"INI"},

    // B team
    {team:"B",name:"임꺽정",company:"삼성"},
    
    // C team
    {team:"C",name:"",company:""},
    
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
listOL = document.querySelector(".list-ol");
peopleDB.forEach((item) => {
    if(item.name !== ""){
        // box
        const itemElement = document.createElement('li');
        itemElement.classList.add('item', 'itembox');

        // box>.current_team
        const itemSectionTeam = document.createElement('span');
        itemSectionTeam.classList.add('item-team');
        itemSectionTeam.textContent = item.team;
        
        // box>.current_name
        const itemSectionName = document.createElement('span');
        itemSectionName.classList.add('item-name');
        itemSectionName.textContent = item.name;
        // box>.current_company
        const itemSectionCompany = document.createElement('span');
        itemSectionCompany.classList.add('item-company');
        itemSectionCompany.textContent = item.company;
        
        itemElement.appendChild(itemSectionTeam);
        itemElement.appendChild(itemSectionName);
        itemElement.appendChild(itemSectionCompany);
        listOL.appendChild(itemElement)
    }
});

// 검색기능
const inputSearch = document.getElementById('input-search');
const pp = document.querySelectorAll('.item'); 

function search() {
    // 입력된 검색어 가져오기
    const searchValue = inputSearch.value.toLowerCase();
    console.log(searchValue);
    // 각 제품에 대해 검색어와 일치하는지 확인하여 필터링
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
