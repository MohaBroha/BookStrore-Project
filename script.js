
let img = [
    "img/book1.jpg",
    "img/book2.jpg",
    "img/book3.jpg",
    "img/book4.jpg",
    "img/book5.jpg",
    "img/book6.jpg",
    "img/book7.jpg",
    "img/book8.jpg",
    "img/book9.jpg",
    "img/book10.jpg"
];

let books = [
    { id: 1, title: "Der kleine Prinz", author: "Antoine de Saint-Exupéry", cover: img[0], price: "€9.99", genre: "Fiction", date: "1943-04-06", comments: ["Anna: Wunderschönes Buch!", "Jonas: Für alle Altersgruppen.", "Liuba:Die Geschichte mit dem Fuchs ist sehr Dramatisch!"] },
    { id: 2, title: "Grimms Märchen", author: "Brüder Grimm", cover: img[1], price: "€12.50", genre: "Märchen", date: "1812-01-01", comments: ["Mila: Die Klassiker meiner Kindheit."] },
    { id: 3, title: "Sapiens", author: "Yuval Noah Harari", cover: img[2], price: "€18.00", genre: "History", date: "2011-02-04", comments: ["Paul: Brillant geschrieben.", "Sophie: Eröffnet neue Perspektiven."] },
    { id: 4, title: "Der Mantel", author: "Nikolai Gogol", cover: img[3], price: "€7.90", genre: "Kurzgeschichte", date: "1842-01-01", comments: ["Lea: Düster, aber faszinierend."] },
    { id: 5, title: "Der große Schlaf", author: "Raymond Chandler", cover: img[4], price: "€11.00", genre: "Krimi", date: "1939-01-01", comments: ["Ben: Spannend bis zum Schluss!"] },
    { id: 6, title: "Der Spieler", author: "Fjodor M. Dostojewski", cover: img[5], price: "€10.50", genre: "Roman", date: "1866-01-01", comments: ["Nina: Tiefgründig und traurig."] },
    { id: 7, title: "Der Besuch der alten Dame", author: "Friedrich Dürrenmatt", cover: img[6], price: "€9.50", genre: "Drama", date: "1956-01-01", comments: ["Noah: Großartige Gesellschaftssatire."] },
    { id: 8, title: "Die Verwandlung", author: "Franz Kafka", cover: img[7], price: "€8.20", genre: "Erzählung", date: "1915-01-01", comments: ["Anna: Unheimlich, aber genial."] },
    { id: 9, title: "Die Leiden des jungen Werther", author: "Johann W. von Goethe", cover: img[8], price: "€9.00", genre: "Roman", date: "1774-01-01", comments: ["Lukas: Klassiker, der berührt."] },
    { id: 10, title: "Der Zauberberg", author: "Thomas Mann", cover: img[9], price: "€16.00", genre: "Roman", date: "1924-01-01", comments: ["Sophie: Anspruchsvoll, aber lohnend."] }
];


let gallery = document.getElementById("gallery");
function renderBooks() {
    let html = "";
    for (let i = 0; i < books.length; i++) {
        let b = books[i];
        html += '<div class="book-card" onclick="openModal(' + b.id + ')">' +
            '<div class="book-thumb" style="background-image:url(\'' + b.cover + '\')"></div>' +
            '<div class="book-meta">' +
            '<div class="book-title">' + b.title + '</div>' +
            '<div class="book-author">' + b.author + '</div>' +
            '<div class="book-price">' + b.price + '</div>' +
            '</div></div>';
    }
    gallery.innerHTML = html;
}
renderBooks();



let modalBackdrop = document.getElementById("modalBackdrop");
let modalCover = document.getElementById("modalCover");
let modalTitle = document.getElementById("modalTitle");
let modalAuthor = document.getElementById("modalAuthor");
let modalPrice = document.getElementById("modalPrice");
let modalGenre = document.getElementById("modalGenre");
let modalDate = document.getElementById("modalDate");

function openModal(id) {
    currentBookId = id;
    let book = null;
    for (let i = 0; i < books.length; i++) { if (books[i].id === id) { book = books[i]; break; } }
    if (!book) return;
    modalBackdrop.style.display = "flex";
    modalCover.style.backgroundImage = 'url("' + book.cover + '")';
    modalTitle.textContent = book.title;
    modalAuthor.textContent = book.author;
    modalPrice.textContent = book.price;
    modalGenre.textContent = book.genre;
    modalDate.textContent = book.date;
    renderComments();
}



let liked = false;
let likeCount = 1253;
document.getElementById("like-container").innerHTML = `
    <span id="like-heart" onclick="
        if(!liked){
            liked=true;
            this.innerHTML='❤️';
            likeCount++;
        } else {
            liked=false;
            this.innerHTML='🖤';
            likeCount--;
        }
        document.getElementById('like-count').innerHTML=likeCount;
    ">🖤</span>
    <span id='like-count'>${likeCount}</span>
`;


function closeModal(e) {
    if (e.target === modalBackdrop) modalBackdrop.style.display = "none";
}


let commentsEl = document.getElementById("comments");
function renderComments() {
    let book = null;
    for (let i = 0; i < books.length; i++) { if (books[i].id === currentBookId) { book = books[i]; break; } }
    if (!book) return;
    let html = "";
    for (let i = 0; i < book.comments.length; i++) { html += '<div>' + book.comments[i] + '</div>'; }
    commentsEl.innerHTML = html;

}



let COMMENT_NAMES = ["Anna", "Jonas", "Mila", "Simon", "Sophie", "Ben", "Lea", "Noah", "Liuba", "Marco"];
let newCommentEl = document.getElementById("newComment");
function addComment() {
    let text = newCommentEl.value.trim();
    if (text === "") return;
    let book = null;
    for (let i = 0; i < books.length; i++) { if (books[i].id === currentBookId) { book = books[i]; break; } }
    if (!book) return;
    let randomName = COMMENT_NAMES[Math.floor(Math.random() * COMMENT_NAMES.length)];
    book.comments.push(randomName + ": " + text);
    newCommentEl.value = "";
    renderComments();
}



