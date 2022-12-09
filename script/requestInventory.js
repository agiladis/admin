const baseUrl = 'https://hammerhead-app-zfi4g.ondigitalocean.app/inventory';

const getInventory = async () => {
  try {
    const response = await fetch(`${baseUrl}`);
    const responseJson = await response.json();
    if (responseJson.error) {
        showResponseMessage(responseJson.message);
    } else {
      renderListInventory(responseJson.data);
    }
  } catch (error) {
    showResponseMessage(error);
  }
};

// Create
const insertInventory = async (inventory) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inventory)
    };
    
    const response = await fetch(`${baseUrl}`, options)
    const responseJson = await response.json();
    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      // renderAllBooks(responseJson.books);
      window.location.href="./inventories.html";
    //   getInventory();
    }
  } catch (error) {
    showResponseMessage(error)
  }
};

// Delete
const removeInventory = (inventoryId) => {
  fetch(`${baseUrl}/${inventoryId}`, {
    method: 'DELETE',
  })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        // showResponseMessage(responseJson.message);
        getInventory();
      })
      .catch(error => {
        showResponseMessage(error);
      });
};

// Render
const renderListInventory = (inventories) => {
  const listInventoryElement = document.querySelector('#listInventory');
  listInventoryElement.innerHTML = '';

  let number = 1;
  inventories.forEach(inventory => {
    listInventoryElement.innerHTML += `
      <tr>
        <td class="text-center">${number++}</td>
        <td class="text-center">
            ${inventory.id_inventaris}
        </td>
        <td class="text-center">
            ${inventory.name}
        </td>
        <td>
            ${inventory.brand}
            <br>
            <small class="font-italic">Model year ${inventory.year_of_production}</small>
        </td>
        <td class="project_progress text-center">
            ${inventory.quantity}
        </td>
        <td class="project-state text-center">
            ${inventory.satuan}
        </td>
        <td class="project-state text-center">
            Rp${inventory.price.toLocaleString('en')}
        </td>
        <td class="text-center">
            <span class="badge badge-success">${inventory.status}</span>
        </td>
        <td class="project-actions text-center">
            <a class="btn btn-info btn-sm" href="/inventory-edit.html?inventory_id=${inventory.id_inventaris}">
                <i class="fas fa-pencil-alt"> </i>
                Edit
            </a>
            <button id="${inventory.id}" class="button-delete btn btn-danger btn-sm">
                <i class="fas fa-trash"> </i>
                Delete
            </button>
        </td>
    </tr>
    `;
  });

//   Delete
  const buttonUpdate = document.querySelector('#buttonUpdate');
  const buttonDelete = document.querySelectorAll('.button-delete');
 
  buttonDelete.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      if (confirm('Are you sure you want to delete these item?')) {
        const inventoryId = event.target.id;
        console.log("hapus katalog id:" + inventoryId);
        removeInventory(inventoryId);
      }
    }, false);
  });
};

const showResponseMessage = (message = 'Check your internet connection') => {
  alert(message);
};

document.addEventListener('DOMContentLoaded', () => {
  const inputCode = document.querySelector('#inputCode');
  const inputName = document.querySelector('#inputName');
  const inputStatus = document.querySelector('#inputStatus');
  const inputBrand = document.querySelector('#inputBrand');
  const inputYearOfProduction = document.querySelector('#inputYearOfProduction');
  const inputQuantity = document.querySelector('#inputQuantity');
  const inputUnit = document.querySelector('#inputUnit');
  const inputPrice = document.querySelector('#inputPrice');

  const buttonSave = document.querySelector('#buttonSave');

  buttonSave.addEventListener('click', () => {
    const inventory = {
      id_inventaris: inputCode.value,
      name: inputName.value,
      brand: inputBrand.value,
      year_of_production: inputYearOfProduction.value,
      status: inputStatus.options[inputStatus.selectedIndex].value,
      quantity: inputQuantity.value,
      satuan: inputUnit.value,
      price: parseInt(inputPrice.value)
    };
    console.log(inventory);
    insertInventory(inventory);
  });

});

// getInventory();
