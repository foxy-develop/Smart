// 1. ANIMATION FOR PAGE TRANSITION

// 1.1 Timeline
/*const pageTimeline = new TimelineMax();

const layer = {
  main: ".layer.layer--main-color",
  grey: ".layer.layer--grey-color",
  dark: ".layer.layer--dark-color"
};

pageTimeline
  .fromTo(layer.dark, 2.7, { xPercent: -100 }, { xPercent: 100 }, 0)
  .fromTo(layer.main, 3.5, { xPercent: -100 }, { xPercent: 100 }, 0.75)
  .fromTo(layer.grey, 2.5, { xPercent: -100 }, { xPercent: 0 }, 1.25)
  .fromTo(layer.grey, .75, { yPercent: 0 }, { yPercent: -100 }, 4);
*/


// 2. ANIMATION Timeline sequence

// блок навигации
const headerTimeline = new TimelineMax();
const navbar = document.querySelector(".header__navbar");
const navbarOpen = new TimelineMax();
const header = {
  header: ".header",
  logo: ".header__logo",
  search: ".header__search",
  navBtn: ".nav-btn",
  navbar: ".header__navbar",
  navLinks: ".header__navbar .navbar__item"
};

headerTimeline
  .fromTo(header.header,1,{ scaleY: 0, top: 0, borderWidth: 0},{ ease: Power4.easeIn, scaleY: 1, borderWidth: 1})
  .fromTo(header.logo,0.75,{ opacity: 0, y: -20},{ ease: Power4.easeOut, opacity: 1, y: 0})
  .staggerFromTo(header.navLinks, 0.25, { opacity: 0, y: 10 }, { ease: Power2.easeIn, opacity: 1, y: 0 },0.15)
  .fromTo(header.navBtn,0.35,{ opcity: 0, width: 0 },{ ease: Power2.easeOut, opacity: 1, width: 30 })
  .fromTo(header.search, 0.35, { opacity: 0, x: 10 }, { ease: Power2.easeOut, opacity: 1, x: 0 });
 

// блок hero
if (document.querySelector(".hero")) {
  const heroBlock = new TimelineMax();
  const heroLayer = CSSRulePlugin.getRule(".hero__caption:before");
  const hero = {
    title: ".hero__caption >  .seo__h1",
    description: ".hero__caption > .seo__text",
    btn: ".hero__btn",
    caption: ".hero__caption"
  };

  heroBlock
    .delay(1.5)
    .fromTo(hero.caption,0.75,{ yPercent: 50, scaleY: 0},{ ease: Back.easeOut.config(1.5), yPercent: 7.5, scaleY: 1},0.25)
    .fromTo(hero.title,0.75,{opacity: 0,y: 180},{ease: Power4.easeOut,opacity: 1,y: 0})
    .fromTo(hero.description,0.75,{opacity: 0,y: 130},{ease: Power3.easeOut,opacity: 1,y: 0})
    .fromTo(hero.btn,0.25,{ease: Power2.easeOut,opacity: 0,y: 80},{opacity: 1,y: 0})
    .to(heroLayer, 0.75, {ease: Circ.easeIn,cssRule: {top: 750}});
}

// блок поиска и статей
if (document.querySelector(".search-article")) {
  let articlesController = new ScrollMagic.Controller();
  let articlesTl = new TimelineMax();
  let block = document.querySelector(".search-article");
  let search = block.querySelector(".search-article__form");

  articlesTl.delay(0.75).staggerFromTo(".search-article__title",0.5,{ opacity: 0, scaleY: 0 },{ ease: Power4.easeOut, opacity: 1, scaleY: 1 },0.75);
  articlesTl.fromTo( search, .75, { xPercent: -50, scaleX: 0, opacity: 0, scaleY: 1}, { ease: Back.easeOut.config(1.125), scaleX: 1, xPercent: 0, opacity: 1});
  articlesTl.staggerFromTo(".articles__item", 0.25, { opacity: 0,x: 140}, { ease: Power3.easeOut,opacity: 1,x: 0 }, 0.25);

  var articlesScene = new ScrollMagic.Scene({triggerElement: block,triggerHook: 1}).setTween(articlesTl).addTo(articlesController);
}

// блок услуг
if (document.querySelector('.service')) {
  let serviceController = new ScrollMagic.Controller();
  let serviceTl = new TimelineMax();
  let service = document.querySelector(".service");
  
  serviceTl
    .delay(0.5)
    .staggerFromTo(".service__item",0.25,{opacity: 0,y: 150},{ease: Power3.easeOut,opacity: 1,y: 0},0.25)
    .staggerFromTo(".service__title",0.25,{opacity: 0,y: 150},{ease: Power4.easeOut,opacity: 1,y: 0},0.15)
    .staggerFromTo(".service__desc",0.25,{opacity: 0,y: 125},{ease: Power3.easeOut,opacity: 1,y: 0},0.15)
    .staggerFromTo(".service__img",0.25,{opacity: 0,scaleX: 0},{ease: Power2.easeOut,opacity: 1,scaleX: 1},0.15)
    .staggerFromTo(".service__link > .articles__btn",0.25,{opacity: 0,y: 50},{ease: Power1.easeOut,opacity: 1,y: 0},0.15);

  let articlesScene = new ScrollMagic.Scene({triggerElement: service,triggerHook: 0.9,offset: 50}).setTween(serviceTl).addTo(serviceController);
}

// страница статьи
if (document.querySelector('.article')) {
  const articleTl = new TimelineMax();
  const ArticleHeader = {
    main: ".article",
    wrapper: ".article__header",
    tag: ".article__theme",
    date: ".article__date",
    tags: ".article__tag",
    title: ".article__title",
    content: ".article__content > *"
  };

  articleTl
    .delay(2)
    .fromTo(ArticleHeader.main,0.5,{opacity: 0,y: 100},{ease: Back.easeOut.config(1.5),opacity: 1,y: 0})
    .fromTo(ArticleHeader.wrapper,0.5,{yPercent: 50,scaleY: 0},{ease: Back.easeOut.config(1.5),yPercent: 7.5,scaleY: 1},0.25)
    .fromTo(ArticleHeader.tag,0.5,{opacity: 0,y: 180},{ease: Power4.easeOut,opacity: 1,y: 0})
    .fromTo(ArticleHeader.date,0.5,{opacity: 0,y: 130},{ease: Power3.easeOut,opacity: 1,y: 0})
    .staggerFromTo(ArticleHeader.tags,0.15,{opacity: 0,y: 10},{ease: Power2.easeIn,opacity: 1,y: 0},0.15)
    .fromTo(ArticleHeader.title,0.5,{opacity: 0,y: 100},{ease: Power1.easeOut,opacity: 1,y: 0})
    .staggerFromTo(ArticleHeader.content,0.25,{opacity: 0,y: 10},{ease: Power1.easeOut,opacity: 1,y: 0},0.15);
}

// страница контактов
if (document.querySelector('.contact')) {
  const contactTl = new TimelineMax();

  const contact = {
    title: ".contact__title",
    wrapper: ".contact__wrapper",
    form: ".contact__form",
    info: ".contact__info"
  };
  contactTl
    .delay(0.75)
    .fromTo(contact.title, 0.5, { opacity: 0, scaleY: 0 }, { ease: Power4.easeOut, opacity: 1, scaleY: 1 })
    .fromTo(contact.wrapper, 0.5, { opacity: 0, y: 50 }, { ease: Power1.easeOut, opacity: 1, y: 0 }, 0.25)
    .fromTo(contact.form, 0.5, { opacity: 0, x: 150 }, { ease: Power2.easeOut, opacity: 1, x: 0 }, 1.25)
    .fromTo(contact.info, 0.5, { opacity: 0, x: -150 }, { ease: Power2.easeOut, opacity: 1, x: 0 }, 1.25);
}
