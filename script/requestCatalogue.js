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
const insertCatalogue = async (catalogue) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(catalogue)
    };
    console.log(catalogue);
    
    const response = await fetch(`${baseUrl}`, options)
    const responseJson = await response.json();
    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      // renderAllBooks(responseJson.books);
      getCatalogue();
    }
  } catch (error) {
    showResponseMessage(error)
  }
};

// Delete
const removeCatalogue = (catalogueId) => {
  fetch(`${baseUrl}/${catalogueId}`, {
    method: 'DELETE',
  })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        // showResponseMessage(responseJson.message);
        getCatalogue();
      })
      .catch(error => {
        showResponseMessage(error);
      });
};

// Render
const renderListCatalogue = (listsCatalogue) => {
  const listCatalogueElement = document.querySelector('#listCatalogue');
  listCatalogueElement.innerHTML = '';

  let number = 1;
  listsCatalogue.forEach(catalogue => {
    // parse dateTime
    const currentDate = new Date(catalogue.updatedAt);
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();

    const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

    listCatalogueElement.innerHTML += `
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
          <button type="button" id=${catalogue.id} class="button-delete btn btn-danger btn-sm">
            <i class="fas fa-trash"> </i>
            Delete
          </button>
        </td>
      </tr>
    `;
  });

  // Delete
  const buttonUpdate = document.querySelector('#buttonUpdate');
  const buttonDelete = document.querySelectorAll('.button-delete');

  buttonDelete.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      if (confirm('Are you sure you want to delete these item?')) {
        const catalogueId = event.target.id;
        console.log("hapus katalog id:" + catalogueId);
        removeCatalogue(catalogueId);
      }
    }, false);
  });
};

const showResponseMessage = (message = 'Check your internet connection') => {
  alert(message);
};

document.addEventListener('DOMContentLoaded', () => {
  const inputName = document.querySelector('#inputName');
  const inputType = document.querySelector('#inputType');
  const inputPrice = document.querySelector('#inputPrice');
  const inputUnit = document.querySelector('#inputUnit');
  const inputCatalogueCode = document.querySelector('#inputCatalogueCode');
  const inputImagePath = document.querySelector('#inputImagePath');

  const buttonSave = document.querySelector('#buttonSave');

  buttonSave.addEventListener('click', () => {
    const catalogue = {
      name: inputName.value,
      type: inputType.options[inputType.selectedIndex].value,
      description: "belum kepake",
      price: parseInt(inputPrice.value),
      satuan: inputUnit.options[inputUnit.selectedIndex].value,
      kode_katalog: inputCatalogueCode.value,
      image: inputImagePath.value
    };
    console.log(catalogue);
    insertCatalogue(catalogue);
  });

});

getCatalogue();
