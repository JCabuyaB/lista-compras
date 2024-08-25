// form
const form = document.getElementById("form");

// list (ul)
const list = document.querySelector(".list");

// input
const inpItem = document.querySelector("[name='item']");

// btns
const formBtn = document.querySelector(".form__btn");
const deleteAll = document.querySelector(".main__control");

// mostrar elementos al cargar la página
window.addEventListener("DOMContentLoaded", listItems);

// retornar elementos del local storage
function returnItems() {
    return localStorage.getItem("items")
        ? JSON.parse(localStorage.getItem("items"))
        : [];
}

function createHtmlElement(id, value) {
    const listItem = `
        <li class="list-item">
            <span class="list-item__text">${value}</span>

            <div class="icons-container">
                <i class="bi bi-pencil-fill edit" data-edit="${id}"></i>
                <i class="bi bi-trash-fill delete" data-delete="${id}"></i>
            </div>
        </li>
        `;

    return listItem;
}

// listar de elementos
function listItems() {
    const items = returnItems();

    if (items.length > 0) {
        const allItems = items.map((element) => {
            return createHtmlElement(element.id, element.elementName);
        });

        list.innerHTML = allItems.join(" ");
    } else {
        list.innerHTML = "";
    }
}

// agregar elemento al local storage
function addListItem(id, elementName) {
    const items = returnItems();
    const newItem = { id, elementName };

    items.push(newItem);

    localStorage.setItem("items", JSON.stringify(items));
}

// eliminar un elemento
function removeItem(id) {
    const items = returnItems();

    const deletedList = items.filter((element) => {
        if (element.id !== id) {
            return element;
        }
    });

    localStorage.setItem("items", JSON.stringify(deletedList));
}

// editar un elemento
function addEditAttributes(id) {
    const items = returnItems();

    items.filter((item) => {
        if (item.id === id) {
            inpItem.value = item.elementName;
            inpItem.setAttribute('data-id', item.id);
        }
    });
    formBtn.classList.add("editing");
    formBtn.innerText = "Editar";
}

function removeEditAttributes(item) {
    formBtn.removeAttribute("data");
    formBtn.classList.remove("editing");
    formBtn.innerText = "Agregar";
    inpItem.removeAttribute('data-id');
    inpItem.value = "";
}

function editItem(id, itemName) {
    const items = returnItems();

    const editedList = items.map((item) => {
        if (item.id == id) {
            item.elementName = itemName;
        }
        return item;
    });

    localStorage.setItem("items", JSON.stringify(editedList));
    removeEditAttributes();
}

// event buttons (delete & edit)
list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        // remove items
        removeItem(e.target.dataset.delete);
        listItems();
    } else if (e.target.classList.contains("edit")) {
        // edit items
        addEditAttributes(e.target.dataset.edit);
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (formBtn.classList.contains("editing")) {
        editItem(inpItem.dataset.id, inpItem.value);
        listItems();
    } else {
        const id = new Date().getTime().toString();
        addListItem(id, inpItem.value);
        listItems();
    }

    inpItem.value = "";
});
