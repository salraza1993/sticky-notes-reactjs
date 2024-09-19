export const uniqueIdGenerator = (range = 6) => {
  let result = '';
  const letters = '0123456789~!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < range; i++) result += letters.charAt(Math.floor(Math.random() * letters.length));
  return result;
};
export const removeInlineStyles = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('*').forEach(el => el.removeAttribute('style'));
  
  const images = doc.querySelectorAll('img');
  images.forEach((img) => {
    const div = document.createElement('div');
    div.classList.add('img-container');
    const span = document.createElement('span');
    span.classList.add('image-remover');
    // span.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    div.appendChild(span);
    div.appendChild(img.cloneNode(true));
    img.replaceWith(div);
  });

  return doc.body.innerHTML;
}

export const stickyColors = [
  {
    light: { headerBg: "#F5E58B", bodyBg: "#FFF7D1", bodyColor: "#333333" },
    dark: { headerBg: "#E6B905", bodyBg: "#333333", bodyColor: "#f2f2f2" },
  },
  {
    light: { headerBg: "#C0ECB8", bodyBg: "#E4F9E0", bodyColor: "#333333" },
    dark: { headerBg: "#6FD262", bodyBg: "#333333", bodyColor: "#f2f2f2" },
  },
  {
    light: { headerBg: "#F5BFD9", bodyBg: "#FFE4F1", bodyColor: "#333333" },
    dark: { headerBg: "#EA86C2", bodyBg: "#333333", bodyColor: "#f2f2f2" },
  },
  {
    light: { headerBg: "#D9BFF3", bodyBg: "#F2E6FF", bodyColor: "#333333" },
    dark: { headerBg: "#C78EFF", bodyBg: "#333333", bodyColor: "#f2f2f2" },
  },
  {
    light: { headerBg: "#BFDFF8", bodyBg: "#E2F1FF", bodyColor: "#333333" },
    dark: { headerBg: "#5AC0E7", bodyBg: "#333333", bodyColor: "#f2f2f2" },
  },
  {
    light: { headerBg: "#D4D4D4", bodyBg: "#F3F2F1", bodyColor: "#333333" },
    dark: { headerBg: "#AAAAAA", bodyBg: "#333333", bodyColor: "#f2f2f2" },
  },
  {
    light: { headerBg: "#474645", bodyBg: "#696969", bodyColor: "#f2f2f2" },
    dark: { headerBg: "#454545", bodyBg: "#333333", bodyColor: "#f2f2f2" },
  },
];
