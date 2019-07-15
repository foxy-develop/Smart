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
        duration: 5000,
        delay: 0
      })
    : siiimpleToast.setOptions({
        container: "body",
        class: "siiimpleToast",
        position: "top-right",
        margin: 10,
        delay: 0,
        duration: 5000,
        delay: 0
      }));

if (document.querySelectorAll('.form').length) {

  //form validate
  const formValidate = form => {
    const email = form.querySelector('input[name="mail"]');
    const subject = form.querySelector('input[name="subject"]');
    const msg = form.querySelector("textarea");

    const error = elem => 
      elem.closest(".form__group").classList.add("form__group--error");
    const success = elem => 
      elem.closest(".form__group").classList.add("form__group--success");

    //validate
    validateEmail(email.value) ? success(email) : error(email);
    subject.value.length > 5 ? success(subject) : error(subject);
    msg.value.length > 60 ? success(msg) : error(msg);

    return !form.querySelectorAll(".form__group--error").length;
  };

  const submit = document.querySelector(".form__btn");

  submit.addEventListener('click', function() {
    event.preventDefault();
    const form = this.closest('.form');
    if (formValidate(form)) {
      form.submit();
      notification.success(
        `Ваше сообщение успешно отправлено! В ближайшее время с Вами свяжется наш сотрудник. Благодарим за доверие.`
      );
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


  document.querySelector('input[name="subject"]').addEventListener("change", function() {
    this.value.length > 5 && this.closest(".form__group").classList.add("form__group--success");
  });

  document.querySelector('input[name="mail"]').addEventListener("change", function() {
    validateEmail(this.value) && this.closest(".form__group").classList.add("form__group--success");
  });

  document
    .querySelector(".form")
    .querySelector("textarea")
    .addEventListener("focus", function() {
      this.closest(".form__group").classList.remove("form__group--error");
    });

  document
    .querySelector(".form")
    .querySelector("textarea")
    .addEventListener("chnage", function() {
      this.value.length > 60 && this.closest(".form__group").classList.add("form__group--success");
    });

  const inputs = document.querySelectorAll(".form__field");

  const leaveInput = el =>
      el.value.length
        ? !el.classList.contains("active") && el.classList.add("active")
        : el.classList.contains("active") && el.classList.remove("active");

    inputs.length && inputs.forEach(el => el.addEventListener("blur", () => leaveInput(el)));
}

document.querySelector(".nav-btn").addEventListener("click", function() {
  this.classList.toggle("nav-btn--active");
  document.querySelector(".navbar").classList.toggle("navbar--active");
});






const sw = navigator.serviceWorker;
sw.controller || sw.register("sw.js", { scope: "./" });