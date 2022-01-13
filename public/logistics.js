const tableBody = document.getElementById("productBody");
window.onload = function () {
  getUser();
};

async function getUser() {
  console.log("heyy");
  try {
    const response = await axios.get("http://localhost:5000/api/v1/product");
    console.log(response.data);
    response.data.Products.map((product) => {
      var row = document.createElement("tr");
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      var td3 = document.createElement("td");
      var td4 = document.createElement("td");
      var td5 = document.createElement("td");
      var td6 = document.createElement("td");
      var td7 = document.createElement("td");
      var td8 = document.createElement("td");
      var td9 = document.createElement("td");
      td1.appendChild(document.createTextNode(product.product_id));
      td2.appendChild(document.createTextNode(product.product_name));
      td3.appendChild(document.createTextNode(product.description));
      td4.appendChild(document.createTextNode(product.sku));
      td5.appendChild(document.createTextNode(product.price));
      td6.appendChild(document.createTextNode(product.category_name));
      td7.appendChild(document.createTextNode(product.stock));
      td8.appendChild(document.createTextNode(product.warehouse_name));
      td9.appendChild(document.createTextNode(product.supplier_name));
      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      row.appendChild(td4);
      row.appendChild(td5);
      row.appendChild(td6);
      row.appendChild(td7);
      row.appendChild(td8);
      row.appendChild(td9);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

const closeForm = function () {
  document.getElementById("myForm").style.display = "none";
};

document.getElementById("CreateProdBtn").addEventListener("click", function () {
  document.getElementById("myForm").style.display = "block";
});

//Forms Selector update Section---------------------------------------------------------//

//Fill Category Selector----------------//
//create form
const categories = document.getElementById("category_name1");
document
  .getElementById("CreateProdBtn")
  .addEventListener("click", async function () {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/category");
      response.data.Products.map((product) => {
        categories.options[categories.options.length] = new Option(
          product.category_name,
          product.category_id
        );
      });
    } catch (error) {
      console.log(error);
    }
  });
//update form
const categories2 = document.getElementById("category_name");
document.getElementById("updtBtn").addEventListener("click", async function () {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/category");
    response.data.Products.map((product) => {
      categories2.options[categories2.options.length] = new Option(
        product.category_name,
        product.category_id
      );
    });
  } catch (error) {
    console.log(error);
  }
});
//Fill warehouse Selector---------------------------//
//create form
const warehouse = document.getElementById("warehouse_name1");
document
  .getElementById("CreateProdBtn")
  .addEventListener("click", async function () {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/warehouse"
      );
      response.data.Products.map((product) => {
        warehouse.options[warehouse.options.length] = new Option(
          product.warehouse_name,
          product.warehouse_id
        );
      });
    } catch (error) {
      console.log(error);
    }
  });
//update form
const warehouse2 = document.getElementById("warehouse_name");
document.getElementById("updtBtn").addEventListener("click", async function () {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/warehouse");
    response.data.Products.map((product) => {
      warehouse2.options[warehouse2.options.length] = new Option(
        product.warehouse_name,
        product.warehouse_id
      );
    });
  } catch (error) {
    console.log(error);
  }
});
//Fill supplier Selector-------------------------------//
//create form
const supplier = document.getElementById("supplier_name1");
document
  .getElementById("CreateProdBtn")
  .addEventListener("click", async function () {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/supplier");
      response.data.Products.map((product) => {
        supplier.options[supplier.options.length] = new Option(
          product.supplier_name,
          product.supplier_id
        );
      });
    } catch (error) {
      console.log(error);
    }
  });
//update form
const supplier2 = document.getElementById("supplier_name");
document.getElementById("updtBtn").addEventListener("click", async function () {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/supplier");
    response.data.Products.map((product) => {
      supplier2.options[supplier2.options.length] = new Option(
        product.supplier_name,
        product.supplier_id
      );
    });
  } catch (error) {
    console.log(error);
  }
});
// Forms Section & Routes-------------------------------------------------------------------//

//Create Product in backend------------------------------//
function ConvertFormToJson(formData) {
  let obj = {};
  for (let key of formData.keys()) {
    obj[key] = formData.get(key);
  }
  return JSON.stringify(obj);
}
//var Form = document.getElementById("myForm");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myForm").addEventListener("submit", handleForm);
});
async function handleForm(ev) {
  ev.preventDefault(); //stop the page reloading
  //console.dir(ev.target);
  let myForm = ev.target;
  let fd = new FormData(myForm);
  for (let key of fd.keys()) {
    // console.log(key, fd.get(key));
  }
  let json = ConvertFormToJson(fd);
  let objJson = JSON.parse(json);
  let prodID = objJson(product_id2);
  console.log(JSON.parse(json));
  console.log(prodID);
  //console.log(json);
  try {
    await axios.post("http://localhost:5000/api/v1/product", json, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

//reset form after create button is clicked
document
  .getElementById("CreateBtn")
  .addEventListener("click", async function () {
    document.getElementById("createForm").reset();
    getUser();
  });

//update Product in backend-------------------------------//
/*
document.getElementById("updtBtn").addEventListener("click", function () {
  document.getElementById("myForm2").style.display = "block";
});
*/
const getUpdate = function () {
  document.getElementById("updateProdForms").style.display = "block";
};
const closeForm2 = function () {
  document.getElementById("updateProdForms").style.display = "none";
};

async function handleForm23(ev) {
  //ev.preventDefault(); //stop the page reloading
  //console.dir(ev.target);
  console.log("im herre");
  let myForm = document.getElementById("createForm2");
  let fd = new FormData(myForm);

  let json = ConvertFormToJson(fd);
  let urlID = fd.get("product_id2");
  let updateId = parseInt(urlID);
  // console.log(fd.get("product_id2"));

  try {
    await axios.put("http://localhost:5000/api/v1/product", json, {
      params: { product_id: updateId },
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
//reset form after update button is clicked
document
  .getElementById("CreateBtn2")
  .addEventListener("click", async function () {
    document.getElementById("createForm2").reset();
    getUser();
  });

//delete Product in backend--------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("deleteprodForm")
    .addEventListener("submit", handleForm3);
});
async function handleForm3(ev) {
  ev.preventDefault();
  let urlID;
  let myForm = ev.target;
  let fd = new FormData(myForm);
  for (let key of fd.keys()) {
    urlID = fd.get(key);
  }
  let axiosURL = `http://localhost:5000/api/v1/product`;
  let deleteId = parseInt(urlID);
  try {
    const res = await axios.delete(axiosURL, {
      params: { product_id: deleteId },
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

//create warehouse in backend-----------------------------//
const createWarehouse = function () {
  document.getElementById("myForm3").style.display = "block";
};
const closeForm3 = function () {
  document.getElementById("myForm3").style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myForm3").addEventListener("submit", handleForm4);
});
async function handleForm4(ev) {
  ev.preventDefault(); //stop the page reloading
  //console.dir(ev.target);
  let myForm = ev.target;
  let fd = new FormData(myForm);
  for (let key of fd.keys()) {
    //console.log(key, fd.get(key));
  }
  let json = ConvertFormToJson(fd);
  //console.log(json);
  try {
    await axios.post("http://localhost:5000/api/v1/warehouse", json, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
