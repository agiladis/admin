const baseUrl = 'https://hammerhead-app-zfi4g.ondigitalocean.app/katalog';

const getCatalogue = async () => {
  try {
    const response = await fetch(`${baseUrl}`);
    const responseJson = await response.json();
    if (responseJson.error) {
      console.log(responseJson.message);
    } else {
      renderListCatalogue(responseJson.data);
    }
  } catch (error) {
    console.log(error);
  }
};

// Create


// Render
const renderListCatalogue = (listsCatalogue) => {
  const listCataloguelement = document.querySelector('#listBook');
  listCataloguelement.innerHTML = '';

  let number = 1;
  listsCatalogue.forEach(catalogue => {
    // parse dateTime
    const currentDate = new Date(catalogue.updatedAt);
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();

    const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

    listCataloguelement.innerHTML += `
      <tr>
        <td class="text-center">${number++}</td>
        <td>${catalogue.type}</td>
        <td>${catalogue.name}</td>
        <td>Rp. ${catalogue.price}</td>
        <td class="font-italic text-center">${dateString}</td>
        <td class="text-center">
          <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-edit">
            <i class="fas fa-pencil-alt"></i> Edit
          </button>
          <a class="btn btn-danger btn-sm" href="#">
            <i class="fas fa-trash"> </i>
            Delete
          </a>
        </td>
      </tr>
    `;
  });

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  // document.addEventListener('DOMContentLoaded', () => {
  //   const  inputBookId
  //   const buttonUpdate = document.querySelector('#buttonUpdate');

  //   buttonSave.addEventListener('click', () => {
  //     const catalogue = {
  //       id: 
  //       type
  //       name
  //       price
  //       satuan
  //     }
  //   });
  // });

};
getCatalogue();
