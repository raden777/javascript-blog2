'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  console.log('clickedElement: (with plus) ' + clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

//5.4 Generowanie listy tytułów
//zapisanie ustawień skryptu w stałych - łatwość zmiany naz klas w HTML
const optArticleSelector = '.post', //article
  optTitleSelector = '.post-title', //article>h3
  optTitleListSelector = '.titles', //ul>titles
  optArticleTagsSelector = '.post-tags .list', //<ul>
  optArticleAuthorSelector = '.post .post-author', //author's name in article
  optTagListSelector = '.list.tags';

function generateTitleLinks(customSelector = '') {
  /*remove contents of titleList*/
  const titleList = document.querySelector(optTitleListSelector);
  //czyszczenie zawartości elementu
  titleList.innerHTML = '';
  let html = '';
  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  ); // if tag "cat" is clicked, article will retrieve '[data-tags~="cat"]'
  console.log(articles);
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    console.log(article);
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    console.log('linkHTML');
    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
    titleList.insertAdjacentHTML('beforebegin', linkHTML);
    /* insert link into html variable */
    html = html + linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;
}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links);
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

//6.2 - Generate tags

function generateTags() {
  /*[NEW] create a new variable allTags with an empty array*/
  let allTags = [];
  /* find all articles */
  const allArticles = document.querySelectorAll(optArticleSelector);
  console.log(allArticles);
  /* START LOOP: for every article: */
  for (let article of allArticles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* make html variable with empty string */
    let html = ''; //pusty kontenerek
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagLinkHTML =
        '<li><a href="#tag-' +
        articleTagsArray +
        '">' +
        articleTagsArray +
        '</a></li>';
      /* add generated code to html variable */
      html /*garnek na marchewki*/ =
        html /*wcześniejsze elementy*/ + tagLinkHTML /*ostatni element*/;
      /*[NEW] check if this link is not already in allTags*/
      if (allTags.indexOf(tagLinkHTML) == -1) {
        /*[NEW] add generated code to allTags array*/
        allTags.push(tagLinkHTML);
      }
      /* END LOOP: for each tag */
      console.log(tag);
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML /*wstawianie do HTML*/ = html;
    /* END LOOP: for every article: */
  }
  /*[NEW] find list of tags in right column*/
  const tagList = document.querySelector(optTagListSelector);
  console.log(tagList);

  /*[NEW] add HTML from allTags to tagList*/
  tagList.innerHTML = allTags.join(' ');
}

generateTags();

//Akcja po kliknięciu w tag

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^"#tag-"]'); //active tags
  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {
    /* remove class active */
    tagLinks.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const linkHref = document.querySelector('a[href="' + href + '"]'); // can we use tagLink zamiast document?
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let allTagsLink of allTagsLinks) {
    /* add tagClickHandler as event listener for that link */
    allTagsLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

/*Zadanie:dodanie autora do artykułu*/
function generateAuthors() {
  /* find all articles */
  const allArticles = document.querySelectorAll(optArticleSelector);
  console.log(allArticles);
  /* START LOOP: for every article: */
  /*Dlaczego używamy autora który nie został nigdzie wcześniej zdefiniowany?*/
  for (let article of allArticles) {
    /* find authors wrapper */
    const authorWrapper = document.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);
    /* make html variable with empty string */
    let html = ''; //pusty kontenerek
    /* get authors from element */
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    /* generate HTML of the link */
    const authorHTML =
      '<li><a href="#author-' +
      articleAuthor +
      '">' +
      articleAuthor +
      '</a></li>';
    /* add generated code to html variable */
    html = html + authorHTML;
  }
  /* insert HTML of all the links into the post-author*/
  authorWrapper.innerHTML = html;
  /* END LOOP: for every article: */
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log(clickedElement);

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.add('active');
  }
  generateAuthors('[data-author=" ' + author + '"]');
}

function addClickListenerToAuthors() {
  const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let allAuthorLink of allAuthorLinks) {
    allAuthorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenerToAuthors();
