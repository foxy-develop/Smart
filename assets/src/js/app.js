//email validator
const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};


const notification = ( siiimpleToast =
  window.innerWidth < 480
    ? siiimpleToast.setOptions({
        container: "body",
        class: "siiimpleToast",
        position: "top-center",
        margin: 10,
        delay: 0,
        duration: 3000,
        delay: 0
      })
    : siiimpleToast.setOptions({
        container: "body",
        class: "siiimpleToast",
        position: "top-right",
        margin: 10,
        delay: 0,
        duration: 3000,
        delay: 0
      }));

if (document.querySelectorAll('.form').length) {
  //form validate
  const formValidate = form => {
    const email = form.querySelector('input[name="mail"]');
    const subject = form.querySelector('input[name="subject"]');
    const msg = form.querySelector("textarea");
    const scc = "form__group--success";
    const err = "form__group--error";
    const group = ".form__group";

    const error = elem => elem.closest(group).classList.add(err);
    const success = elem => elem.closest(group).classList.add(scc);

    //validate
    validateEmail(email.value) ? success(email) : error(email);
    subject.value.length > 5 ? success(subject) : error(subject);
    msg.value.length >= 60 ? success(msg) : error(msg);

    return !form.querySelectorAll(`.${err}`).length;
  };

  document.querySelector('form').addEventListener('submit', function() {
    event.preventDefault();
    const form = this.closest('.form');
    if (formValidate(form)) {
      notification.success(
        `Ваше сообщение успешно отправлено! В ближайшее время с Вами свяжется наш сотрудник. Благодарим за доверие.`
      );
      form.submit();
    } else {
        notification.alert(`При заполнении формы были допущены ошибки. Пожалуйста перепроверьте введенные данные`);
    }
  })

  /* Динамическое отслеживание изменения */
  document.querySelector('.form').querySelectorAll('input').forEach(el => {
      let container = el.closest(".form__group").classList;
      el.addEventListener('focus', () => 
        container.remove("form__group--error"))
    })


  document.querySelector('input[name="subject"]').addEventListener("input", function() {
    this.value.length > 5
      ? this.closest(".form__group").classList.add("form__group--success")
      : this.closest(".form__group").classList.remove("form__group--success");
  });

  document.querySelector('input[name="mail"]').addEventListener("input", function() {
    validateEmail(this.value)
      ? this.closest(".form__group").classList.add("form__group--success")
      : this.closest(".form__group").classList.remove("form__group--success");
  });


  //counter 
  const counter = el => {
    const wrapper = el.closest('.form__group').querySelector('.counter');
    const edge = wrapper.querySelector(".counter__edge").innerText * 1;
    let current = wrapper.querySelector(".counter__current");
    let length = el.value.length;

    current.innerText = (length <= edge) ? length : edge;
    wrapper.classList.add('active');

    return length >= edge
  }
  document
    .querySelector(".form")
    .querySelector("textarea")
    .addEventListener("focus", function() {
      this.closest(".form__group").classList.remove("form__group--error");
    });

  document.querySelector(".form").querySelector("textarea")
    .addEventListener("input", function() {
      let container = this.closest('.form__group');
      counter(this)
        ? container.classList.add("form__group--success")
        : container.classList.remove("form__group--success");
    });

  const inputs = document.querySelectorAll(".form__field");

  const leaveInput = el =>
      el.value.length
        ? !el.classList.contains("active") && el.classList.add("active")
        : el.classList.contains("active") && el.classList.remove("active");

    inputs.length && inputs.forEach(el => el.addEventListener("blur", () => leaveInput(el)));
}

const navBtn = document.querySelector(".nav-btn")

navBtn.addEventListener("click", () => {
  navBtn.classList.toggle("nav-btn--active");
  navbar.classList.toggle("navbar--active");
  document.body.classList.toggle("no-scroll");

  if (navbar.classList.contains("navbar--active")) 
    navbarOpen
      .to(header.header, 0.25, { width: window.innerWidth }, 0.25)
      .staggerFromTo(header.navLinks, 0.3, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1 }, 0.25);
});

const sw = navigator.serviceWorker;
sw.controller || sw.register('sw.js', {scope: './'});
