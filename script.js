let gallery = document.getElementById("gallery");
let modalBackdrop = document.getElementById("modalBackdrop");
let modalCover = document.getElementById("modalCover");
let modalTitle = document.getElementById("modalTitle");
let modalAuthor = document.getElementById("modalAuthor");
let modalPrice = document.getElementById("modalPrice");
let modalGenre = document.getElementById("modalGenre");
let modalDate = document.getElementById("modalDate");
let commentsEl = document.getElementById("comments");
let newCommentEl = document.getElementById("newComment");
let COMMENT_NAMES = ["Anna", "Jonas", "Mila", "Simon", "Sophie", "Ben", "Lea", "Noah", "Liuba", "Marco"];
let currentBookId = null;

let books = [
    {
        id: 1,
        title: "Der kleine Prinz",
        author: "Antoine de Saint-Exupéry",
        cover: "img/book1.jpg",
        price: "€9.99",
        genre: "Fiction",
        date: "1943-04-06",
        liked: Math.random() < 0.5,
        likes: Math.floor(Math.random() * 2000) + 500,
        comments: ["Anna: Wunderschönes Buch!", "Jonas: Für alle Altersgruppen.", "Liuba: Die Geschichte mit dem Fuchs ist sehr dramatisch!"],

    },
    {
        id: 2,
        title: "Grimms Märchen",
        author: "Brüder Grimm",
        cover: "img/book2.jpg",
        price: "€12.50",
        genre: "Märchen",
        date: "1812-01-01",
        liked: Math.random() < 0.5,
        likes: Math.floor(Math.random() * 2000) + 500,
        comments: ["Mila: Die Klassiker meiner Kindheit."],

    },
    {
        id: 3,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        cover: "img/book3.jpg",
        price: "€18.00",
        genre: "History",
        date: "2011-02-04",
        liked: Math.random() < 0.5,
        likes: Math.floor(Math.random() * 2000) + 500,
        comments: ["Paul: Brillant geschrieben.", "Sophie: Eröffnet neue Perspektiven."],

    },
    {
        id: 4,
        title: "Der Mantel",
        author: "Nikolai Gogol",
        cover: "img/book4.jpg",
        price: "€7.90",
        genre: "Kurzgeschichte",
        date: "1842-01-01",
        liked: Math.random() < 0.5,
        likes: Math.floor(Math.random() * 2000) + 500,
        comments: ["Lea: Düster, aber faszinierend."],

    },
    {
        id: 5,
        title: "Der große Schlaf",
        author: "Raymond Chandler",
        cover: "img/book5.jpg",
        price: "€11.00",
        genre: "Krimi",
        date: "1939-01-01",
        liked: Math.random() < 0.5,
        likes: Math.floor(Math.random() * 2000) + 500,
        comments: ["Ben: Spannend bis zum Schluss!"],

    },
    {
        id: 6,
        title: "Der Spieler",
        author: "Fjodor M. Dostojewski",
        cover: "img/book6.jpg",
        price: "€10.50",
        genre: "Roman",
        date: "1866-01-01",
        liked: Math.random() < 0.5,
        likes: Math.floor(Math.random() * 2000) + 500,
        comments: ["Nina: Tiefgründig und traurig."],

    },
    {
        id: 7,
        title: "Der Besuch der alten Dame",
        author: "Friedrich Dürrenmatt",
        cover: "img/book7.jpg",
        price: "€9.50",
        genre: "Drama",
        date: "1956-01-01",
        liked: Math.random() < 0.5,
        likes: Math.floor(Math.random() * 2000) + 500,
        comments: ["Noah: Großartige Gesellschaftssatire."],

    },
    {
        id: 8,
        title: "Die Verwandlung",
        author: "Franz Kafka",
        cover: "img/book8.jpg",
        price: "€8.20",
        genre: "Erzählung",
        date: "1915-01-01",
        liked: Math.random() < 0.5,
        likes: Math.floor(Math.random() * 2000) + 500,
        comments: ["Anna: Unheimlich, aber genial."],

    },
    {
        id: 9,
        title: "Die Leiden des jungen Werther",
        author: "Johann W. von Goethe",
        cover: "img/book9.jpg",
        price: "€9.00",
        genre: "Roman",
        date: "1774-01-01",
        liked: Math.random() < 0.5,
        likes: Math.floor(Math.random() * 2000) + 500,
        comments: ["Lukas: Klassiker, der berührt."],

    },
    {
        id: 10,
        title: "Der Zauberberg",
        author: "Thomas Mann",
        cover: "img/book10.jpg",
        price: "€16.00",
        genre: "Roman",
        date: "1924-01-01",
        liked: Math.random() < 0.5,
        likes: Math.floor(Math.random() * 2000) + 500,
        comments: ["Sophie: Anspruchsvoll, aber lohnend."],

    }
];




function renderBooks() {
    let html = "";
    for (let b of books) {
        let heart = b.liked ? "❤️" : "🖤";

        html += `
        <div class="book-card" onclick="openModal(${b.id})">
            <div class="book-thumb" style="background-image:url('${b.cover}')"></div>
            <div class="book-meta">
                <div class="book-title">${b.title}</div>
                <div class="book-author">${b.author}</div>
                <div class="book-price">${b.price}</div>
            </div>
            <div class="like-container" id="like-container-${b.id}">
                <span class="like-heart" onclick="toggleLike(event, ${b.id})">${heart}</span>
                <span class="like-count" id="like-count-${b.id}">${b.likes}</span>
            </div>
        </div>`;
    }
    gallery.innerHTML = html;
}


function toggleLike(event, id) {
    event.stopPropagation();

    let book = books.find(b => b.id === id);
    if (!book) return;

    book.liked = !book.liked;
    book.likes = book.likes + (book.liked ? 1 : -1);

    let container = document.getElementById("like-container-" + id);
    let heartEl = container.getElementsByClassName("like-heart")[0];
    let countEl = document.getElementById("like-count-" + id);

    heartEl.innerText = book.liked ? "❤️" : "🖤";
    countEl.innerText = book.likes;
}


function openModal(id) {
    currentBookId = id;
    let book = books.find(b => b.id === id);
    if (!book) return;

    modalBackdrop.style.display = "flex";
    modalCover.style.backgroundImage = `url('${book.cover}')`;
    modalTitle.textContent = book.title;
    modalAuthor.textContent = book.author;
    modalPrice.textContent = book.price;
    modalGenre.textContent = book.genre;
    modalDate.textContent = book.date;

    renderComments();
}

function closeModal(e) {

    if (!e || e.target === modalBackdrop) {
        currentBookId = null;
        modalBackdrop.style.display = "none";
    }
}


function renderComments() {
    let book = books.find(b => b.id === currentBookId);
    if (!book) return;

    let html = "";
    for (let comment of book.comments) {
        html += "<div>" + comment + "</div>";
    }
    commentsEl.innerHTML = html;
}


function addComment() {
    let text = newCommentEl.value.trim();
    if (!text) return;

    let book = books.find(b => b.id === currentBookId);
    if (!book) return;

    let randomName = COMMENT_NAMES[Math.floor(Math.random() * COMMENT_NAMES.length)];
    book.comments.push(randomName + ": " + text);

    newCommentEl.value = "";
    renderComments();
}


renderBooks();