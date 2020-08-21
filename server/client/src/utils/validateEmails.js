export default (emails) => {
  //Separar emails primero por coma
  //Luego quitandole espcacios a cada uno
  //Al final devolver los emails que fallen el re.test() y sean igual a false osea que fallaron el test

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const invalidEmails = emails
    .split(',')
    .map((email) => email.trim())
    .filter((email) => re.test(email) === false);

  if (invalidEmails.length) {
    return `Favor revisar los siguientes emails: ${invalidEmails}`;
  }

  return null;
};
