// console.log('Phone Hunting')
const loadPhone = async (searchText , isShowAll) => {
  const res = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  // 1.
  const phoneContainer = document.getElementById('phone-container');
  // clear phone container cards before adding new cards
  phoneContainer.textContent = '';
  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  }
  else {
    showAllContainer.classList.add('hidden');
  }

  // console.log('is show all', isShowAll);
  // display only first 12 phones if not show all
  if (!isShowAll) {
    //  display only first 12 phone
    phones = phones.slice(0, 12);
  }

  //  console.log(phones.length);

  phones.forEach(phone => {
    // console.log(phone);
    // 2.Create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card  bg-gray-100 p-4 shadow-xl`;
    // 3.set inner HTML
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      
                      <p>${phone.slug}</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        
        `;
    // 4.Append child
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner:
  toggleLoadingSpinner(false);
}


const handleShowDetail = async (id) => {
  // console.log('Click Show Details',id)
  // load individual or phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  // console.log(data);
  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img  src="${phone.image}" alt=""  />
  <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>ChipSet
  :</span>${phone?.mainFeatures?.chipSet
    }</p>
  <p><span>DisplaySize
  :</span>${phone?.mainFeatures?.displaySize
    }</p>
  <p><span>Memory
  :</span>${phone?.mainFeatures?.memory
    }</p>
 
  <p><span>Bluetooth
  :</span>${phone?.others?.Bluetooth
    }</p>
  <p><span>GPS:</span>${phone?.others?.GPS}</p>
  <p><span>
  NFC:</span>${phone?.others?.
      NFC}</p>
  <p><span>Radio:</span>${phone?.others?.Radio}</p>
  <p><span>USB
  :</span>${phone?.others?.USB
    }</p>
  <p><span>WLAN
  :</span>${phone?.others?.WLAN
    }</p>
  }</p>
  <p><span>ReleaseDate:</span>${phone?.releaseDate
  }</p>
  <p><span>Slug:</span>${phone?.slug}</p>
  
  `
  // show the Modal
  show_details_modal.showModal();
}
// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
  // console.log(searchText);

}
// search handle recap
// const hadleSearch2 = () =>{
//   toggleLoadingSpinner(true);
//   const searchField = document.getElementById('search-field2')
//   const searchText = searchField.value; 
//   loadPhone(searchText);
// }
//  loading Spinner function

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  }
  else {
    loadingSpinner.classList.add('hidden');
  }

}
// handle show all
const handleShowAll = () => {

  handleSearch(true);
}
loadPhone();
