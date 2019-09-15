// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI constructor
function UI() {}
// Add to book list
UI.prototype.addBookToList = function(book) {
  const list = document.querySelector('#book-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X</a></td>
  `;
  list.appendChild(row);
};
// Remove book
UI.prototype.removeBook = function(target) {
  if (target.classList.contains('delete')) {
    target.parentNode.parentNode.remove();
  }
};
// Clear input fields
UI.prototype.clearInputFields = function(book) {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
};
// Input validation
UI.prototype.showAlert = function(message, className) {
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  container.insertBefore(div, form);
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 2000);
};
// Event Listener for form
document.querySelector('#book-form').addEventListener('submit', function(e) {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  // Book constructor
  const book = new Book(title, author, isbn);
  // UI constructor
  const ui = new UI();
  // Input validation
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill all the input field', 'error');
    ui.clearInputFields();
  } else {
    ui.addBookToList(book);
    ui.clearInputFields();
    ui.showAlert('New book added successfully!', 'success');
  }
  console.log(ui);
  e.preventDefault();
});
// Remove book
document.querySelector('#book-list').addEventListener('click', function(e) {
  const ui = new UI();
  ui.removeBook(e.target);
  ui.showAlert('Book deleted!,', 'success');
  e.preventDefault();
});
