const baseUrl = 'https://hammerhead-app-zfi4g.ondigitalocean.app/user';

const getUsers = async () => {
  try {
    const response = await fetch(`${baseUrl}`);
    const responseJson = await response.json();
    if (responseJson.error) {
      console.log(responseJson.message);
      showResponseMessage(responseJson.message);
    } else {
        renderListUser(responseJson.data);
    }
  } catch (error) {
    showResponseMessage(error);
  }
};

// Create


// Render
const renderListUser = (listsUser) => {
    const listUserlement = document.querySelector('#listUser');
    listUserlement.innerHTML = '';

    let number = 1;
    listsUser.forEach(user => {
    // parse dateTime
    const currentDate = new Date(user.updatedAt);
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();

    const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
    listUserlement.innerHTML += `
        <tr>
            <td>${number++}</td>
            <td>${user.name}</td>
            <td>${user.address}</td>
            <td>${user.phone}</td>
        </tr>
    `;
  });
};

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



getUsers();
