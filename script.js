let posts = [
  {
    profileImage: "./img/feed_imgs/20.jpg",
    author: "dev_memes",
    time: "1d",
    location: "Innsbruck, Austria",
    image: "./img/feed_imgs/1.jpg",
    isLiked: false,
    likes: 59,
    commentCount: 3,
    description: "This is one is too good! 😂😂",
    comments: [
      {
        user: "PurpleOwl123",
        comment: "I'm dying haha!",
      },
      {
        user: "QuietHarbor",
        comment: "LOL, this is gold!",
      },
      {
        user: "BreezyVista",
        comment: "I'm in tears, so funny!",
      },
    ],
  },
  {
    profileImage: "./img/feed_imgs/profile2.jpg",
    author: "claralove22",
    time: "3d",
    location: "Salzburg, Austria",
    image: "./img/feed_imgs/dog.jpg",
    isLiked: false,
    likes: 237,
    commentCount: 2,
    description: "Living her best life ❤️🐶",
    comments: [
      {
        user: "blissful32",
        comment: "She looks so happy",
      },
      {
        user: "sunnydaisy",
        comment: "Such a cutie",
      },
    ],
  },
  {
    profileImage: "./img/feed_imgs/profile3.jpg",
    author: "anuschei_360",
    time: "12h",
    location: "Kingston, Jamaica",
    image: "./img/feed_imgs/monye.jpg",
    isLiked: false,
    likes: 420,
    commentCount: 4,
    description: "Jah bless 🇯🇲",
    comments: [
      {
        user: "rasta4life",
        comment: "True brotha",
      },
      {
        user: "marcusgarvey_",
        comment: "One love",
      },
      {
        user: "cbd_tirol",
        comment: "such a legend",
      },
      {
        user: "fromthestash",
        comment: "Fyah bun",
      },
    ],
  },
  {
    profileImage: "./img/feed_imgs/profile5.jpg",
    author: "madisonrose92",
    time: "1w",
    location: "Berlin, Germany",
    image: "./img/feed_imgs/sky.jpg",
    isLiked: false,
    likes: 712,
    commentCount: 2,
    description: "Photoshop first try 🎨",
    comments: [
      {
        user: "jonah_hill",
        comment: "wow this is amazing",
      },
      {
        user: "jasonMomoa8",
        comment: "Love the colors",
      },
    ],
  },
  {
    profileImage: "./img/feed_imgs/11.jpg",
    author: "timetraveler_",
    time: "10d",
    location: "",
    image: "./img/feed_imgs/alien.jpg",
    isLiked: false,
    likes: 128,
    commentCount: 2,
    description: "👽👽",
    comments: [
      {
        user: "space_cowboy",
        comment: "Post-festival vibes 😂",
      },
      {
        user: "wizkajalifa",
        comment: "me on monday after the weekend 😂",
      },
    ],
  },
  {
    profileImage: "./img/feed_imgs/5.jpg",
    author: "BinaryBanter",
    time: "6h",
    location: "",
    image: "./img/feed_imgs/devjoke.jpg",
    isLiked: false,
    likes: 1361,
    commentCount: 5,
    description: "As long as it works 😂",
    comments: [
      {
        user: "Wanderlust",
        comment: "My coding process, summarized in one image 😂",
      },
      {
        user: "Turbosonic",
        comment: "When your code gets the job done but you have no idea how 🤓",
      },
      {
        user: "Neon63",
        comment: "Looks like my last project 😂😂",
      },
      {
        user: "calimaine",
        comment: "When your code is spaghetti but somehow runs 😎",
      },
      {
        user: "Quasar8",
        comment: "Story of my life. Debug later",
      },
    ],
  },
];

/**
 * Initializes the application by loading data from local storage and rendering the initial view.
 */
function init() {
  loadLocalStorage();
  render();
}

/**
 * Loads posts from local storage. If no posts are found in local storage,
 * it initializes the local storage with default posts by calling saveLocalStorage().
 */
function loadLocalStorage() {
  let storage = localStorage.getItem("posts");
  if (storage !== null) {
    posts = JSON.parse(storage);
  } else {
    saveLocalStorage();
  }
}

/**
 * Saves the current posts to local storage.
 * Converts the posts array to a JSON string and stores it under the key "posts".
 */
function saveLocalStorage() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

/**
 * Renders the content of the page by iterating through the posts array.
 * Clears the existing content and appends new HTML for each post.
 * Also renders comments and updates the like button for each post.
 */
function render() {
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    content.innerHTML += renderHtml(post, i);
    renderComments(post, i);
    changeLikeButton(post, i);
  }
}

/**
 * Renders the comments for a given post.
 *
 * @param {Object} post - The post object containing comments.
 * @param {number} i - The index of the post.
 */
function renderComments(post, i) {
  let allComments = document.getElementById(`allComments${i}`);
  allComments.innerHTML = "";

  for (let j = 0; j < post.comments.length; j++) {
    const comment = post.comments[j];

    allComments.innerHTML += /*html*/ `
        <div>
            <span class="feed-user">${comment.user}</span>
            <span>${comment.comment}</span>
        </div>
        `;
  }
}

/**
 * Adds a new comment to a post and updates the UI.
 *
 * @param {number} index - The index of the post to which the comment will be added.
 */
function postComment(index) {
  let textAreaInput = document.getElementById(`textArea${index}`).value;

  if (textAreaInput !== "") {
    let newComment = {
      user: "boris_only",
      comment: textAreaInput,
    };
    posts[index].comments.push(newComment);
    posts[index].commentCount++;
    saveLocalStorage();
    render();
    showHideComments(index);
  }
}

/**
 * Adjusts the height of a textarea element to fit its content.
 *
 * @param {number} index - The index used to identify the textarea element by its ID.
 */
function textAreaAdjust(index) {
  let textArea = document.getElementById(`textArea${index}`);
  textArea.style.height = "auto";
  textArea.style.height = textArea.scrollHeight + "px";
}

/**
 * Toggles the display of the post button based on the content of the text area.
 *
 * @param {number} index - The index used to identify the specific text area and post button elements.
 */
function togglePostButton(index) {
  const textArea = document.getElementById(`textArea${index}`);
  const postButton = document.getElementById(`postButton${index}`);

  if (textArea.value.trim() !== "") {
    postButton.style.display = "inline-block";
  } else {
    postButton.style.display = "none";
  }
}

/**
 * Toggles the visibility of comments for a specific post and updates the comments toggle text.
 *
 * @param {number} index - The index of the post for which to show or hide comments.
 */
function showHideComments(index) {
  let allComments = document.getElementById(`allComments${index}`);
  let commentsNumber = document.getElementById(`commentsNumber${index}`);

  allComments.classList.toggle("d-flex");

  if (allComments.classList.contains("d-flex")) {
    commentsNumber.textContent = `Hide all ${posts[index].commentCount} comments`;
  } else {
    commentsNumber.textContent = `View all ${posts[index].commentCount} comments`;
  }
}

/**
 * Toggles the like status of a post at the given index.
 * If the post is liked, it increments the like count.
 * If the post is unliked, it decrements the like count.
 * Updates the local storage, animates the like button, and updates the like count display.
 *
 * @param {number} index - The index of the post to toggle the like status for.
 */
function toggleLike(index) {
  posts[index].isLiked = !posts[index].isLiked;

  if (posts[index].isLiked) {
    posts[index].likes++;
  } else {
    posts[index].likes--;
  }

  saveLocalStorage();
  animateLikeButton(index);
  updateLikeCount(index);
}

/**
 * Updates the like count displayed for a specific post.
 *
 * @param {number} index - The index of the post in the posts array.
 */
function updateLikeCount(index) {
  const likeCount = document.getElementById(`likeCount${index}`);
  likeCount.textContent = `${posts[index].likes} likes`;
}

/**
 * Animates the like button based on the like status of a post.
 *
 * @param {number} index - The index of the post in the posts array.
 */
function animateLikeButton(index) {
  const likeButton = document.getElementById(`likeButton${index}`);

  if (posts[index].isLiked) {
    likeButton.classList.add("like-button-red");
    likeButton.classList.remove("like-button");
    likeButton.classList.add("animate-like");
    setTimeout(() => {
      likeButton.classList.remove("animate-like");
    }, 300);
  } else {
    likeButton.classList.add("like-button");
    likeButton.classList.remove("like-button-red");
  }
}

/**
 * Updates the like button's appearance based on the post's like status.
 *
 * @param {Object} post - The post object containing the like status.
 * @param {boolean} post.isLiked - Indicates whether the post is liked.
 * @param {number} index - The index of the post, used to identify the like button element.
 */
function changeLikeButton(post, index) {
  const likeButton = document.getElementById(`likeButton${index}`);
  if (post.isLiked) {
    likeButton.classList.add("like-button-red");
    likeButton.classList.remove("like-button");
  } else {
    likeButton.classList.add("like-button");
    likeButton.classList.remove("like-button-red");
  }
}

/**
 * Renders the HTML for a single post.
 *
 * @param {Object} post - The post object containing details to render.
 * @param {string} post.profileImage - URL of the profile image.
 * @param {string} post.author - Name of the author.
 * @param {string} post.time - Time when the post was made.
 * @param {string} post.location - Location of the post.
 * @param {string} post.image - URL of the post image.
 * @param {number} post.likes - Number of likes on the post.
 * @param {string} post.description - Description of the post.
 * @param {number} post.commentCount - Number of comments on the post.
 * @param {number} i - Index of the post in the feed.
 * @returns {string} The HTML string for the post.
 */
function renderHtml(post, i) {
  return /*html*/ `
      <div class="feed-content">
        <div class="feed-header">
          <img class="feed-profile" src="${post.profileImage}" alt="">
          <div class="user-location">
            <a href="#">${post.author}<span>${post.time}</span></a>
            <a href="#">${post.location}</a>
          </div>
          <img class="feed-icons" src="./img/icons/dots.png" alt="">
        </div>
        <div class="feed-img">
          <img src="${post.image}" alt="">
        </div>
        <div class="feed-buttons">
          <button onclick="toggleLike(${i})" class="like-button" id="likeButton${i}"></button>
          <button class="comment-button"></button>
          <button class="send-button"></button>
          <button class="bookmark-button"></button>
        </div>
        <div class="feed-comment-section">
          <div class="feed-likes">
            <span id="likeCount${i}">${post.likes} likes</span>
          </div>
          <div class="feed-user-comment">
            <span>${post.author}</span>
            <span>${post.description}</span>
          </div>
          <div class="feed-comments" id="allComments${i}"></div>
          <button class="show-hide-button" onclick="showHideComments(${i})">
            <span id="commentsNumber${i}">View all ${post.commentCount} comments</span>
          </button>
          <div class="add-comment">
            <textarea class="comment-textarea" name="comment" id="textArea${i}" autocomplete="off"
              autocorrect="off" oninput="textAreaAdjust(${i}); togglePostButton(${i})" placeholder="Add a comment..."></textarea>
            <button id="postButton${i}" onclick="postComment(${i})" class="post-button">Post</button>
          </div>
        </div>
      </div>
    `;
}
