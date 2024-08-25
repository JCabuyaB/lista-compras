// array
let listItems = ["Zanahoria"];

// form
const form = document.getElementById("form");

// list (ul)
const list = document.querySelector(".list");

// input
const inpItem = document.getElementById("item");

// btn
const formBtn = document.querySelector(".form__btn");
const deleteAll = document.querySelector('.main__control');
deleteAll.addEventListener('click', () => {
    listItems = [];
    list.innerHTML = '';
})

// show list
function showItems(lista) {
    if(lista.length >=1 ){
        const htmlList = lista
        .map((itemList) => {
            return `
                <li class="list-item">
                    <span class="list-item__text">${itemList}</span>

                    <div class="icons-container">
                        <i class="bi bi-pencil-fill edit" data-edit="${itemList}"></i>
                        <i class="bi bi-trash-fill delete" data-delete="${itemList}"></i>
                    </div>
                </li>
            `;
        }).join(" ");

        list.innerHTML = htmlList;
    }
}
showItems(listItems);

// eliminar un elemento
function removeItem(item) {
    const itemIndex = listItems.indexOf(item);

    listItems.splice(itemIndex, 1);
    showItems(listItems);
}

// editar un elemento
function editItem(oldItem, newItem) {
    const itemIndex = listItems.indexOf(oldItem);

    if (itemIndex > -1) {
        listItems[itemIndex] = newItem;
    }
}

// event buttons (delete & edit)
list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        removeItem(e.target.dataset.delete);
    } else if (e.target.classList.contains("edit")) {
        inpItem.setAttribute("data-editing", e.target.dataset.edit);
        formBtn.classList.add("editing");
        formBtn.innerText = "Editar";
        inpItem.value = e.target.dataset.edit;
    }
});

function addListItem(element) {
    return listItems.push(element);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inpItem.value !== "") {
        if (formBtn.classList.contains("editing")) {
            editItem(inpItem.dataset.editing, inpItem.value);
            inpItem.removeAttribute("data-editing");
            formBtn.classList.remove("editing");
            formBtn.innerText = "Agregar";
        } else {
            addListItem(inpItem.value);
        }
        // listar elementos en el dom
        showItems(listItems);
        inpItem.value = "";
    }
});
