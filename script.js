//Book class:Represents a BookListApp
class Book{
  constructor(title, author, isbn)
  {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
//UI class:Handles UI tasks
class UI
{
  static displayBook()
  {

    const books = Store.getBooks();
    books.forEach((book)=>UI.addBookToList(book));
  }
  static addBookToList(book)
  {
    const list = document.querySelector('#book-list');
    const row = document.createElement("tr");
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">delete</a></td>
    `;
    list.appendChild(row);
  }

  static clearFields()
  {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
  static deleteBook(el)
  {
    if(el.classList.contains('delete'))
    {
      el.parentElement.parentElement.remove();
    }

  }

  static showAlert(message, className)
  {
    const div =document.createElement('div');
    div.className= `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //remove in 3sec
    setTimeout(()=>
      document.querySelector(".alert").remove(),2000
    );

  }
}
//Store class:Handle Storage
class Store
{
static getBooks()
{
  let books;
  if(localStorage.getItem('books') === null)
  {
    books =[];
  }
  else{
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}
static addBook(book)
{
const books = Store.getBooks();
books.push(book);
localStorage.setItem('books',JSON.stringify(books));
}
static removeBook(isbn)
{
  const books=Store.getBooks();
  books.forEach((book,index)=>{
        if(book.isbn === isbn)
        {
          books.splice(index, 1);
        }

  });
  localStorage.setItem('books',JSON.stringify(books));

}

}








//Event:Display book
document.addEventListener('DOMContentLoaded', UI.displayBook());

//Event :Add a book
document.querySelector("#book-form").addEventListener("submit",(e)=>{
//Prevent actual submit
e.preventDefault();

  //Get form values
  const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
      const isbn = document.querySelector("#isbn").value;

      //verification of values
      if(title === '' || author === '' || isbn === '')
      UI.showAlert("please enter all the values", 'danger');
      else
//instantiate book
{
        const newBook = new Book(title, author, isbn);
        //console.log(newBook);
        UI.addBookToList(newBook);
        //Add book to local storage
        Store.addBook(newBook);
        UI.showAlert("Book Added","success");

//Clear fields
      UI.clearFields();
    }
});
//Event:Remove a book
document.querySelector('#book-list').addEventListener('click',(e)=>{
  UI.deleteBook(e.target);
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  UI.showAlert("Book removed","success");
});
